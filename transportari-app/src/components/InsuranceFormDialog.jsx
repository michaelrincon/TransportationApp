import React from "react";
import dayjs from "dayjs";
import {
  Dialog, Typography, DialogTitle, DialogContent, DialogActions,
  Button, Stack, TextField, MenuItem, InputAdornment, IconButton, Tooltip
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* Opciones de ejemplo: reemplázalas por tus datos o props si quieres hacerlo dinámico */
const PLACAS = ["UTZ252", "SON975", "THL551", "TFW749", "TSR859"];
const TIPOS_SEGURO = ["SOAT", "Todo Riesgo", "Responsabilidad Civil"];
const ESTADOS = ["Activo", "Vencido", "Por Vencer"];

/* Validación */
const schema = yup.object({
  placa: yup.string().required("Obligatorio"),
  tipo: yup.string().required("Obligatorio"),
  fechaCompra: yup.date().typeError("Fecha inválida").required("Obligatorio"),
  fechaVencimiento: yup
    .date()
    .typeError("Fecha inválida")
    .required("Obligatorio")
    .min(yup.ref("fechaCompra"), "No puede ser anterior a la compra"),
  anio: yup.number().typeError("Número").min(1900).max(2100).required("Obligatorio"),
  valor: yup.number().typeError("Número").min(0).required("Obligatorio"),
  estado: yup.string().required("Obligatorio"),
});

const currencyFmt = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export default function InsuranceFormDialog({
  open,
  onClose,
  initialData,          // {id, placa, tipo, fechaCompra, fechaVencimiento, anio, valor, estado}
  onSubmit,             // (data) => void  (haz PUT/POST en tu API)
  title = "Editar seguro",
}) {
  const { control, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      placa: "",
      tipo: "",
      fechaCompra: null,
      fechaVencimiento: null,
      anio: new Date().getFullYear(),
      valor: 0,
      estado: "",
    },
    values: initialData ? {
      ...initialData,
      // si te llegan fechas como string ISO, déjalas tal cual; RHF + DatePicker las manejan
    } : undefined,
  });

  React.useEffect(() => { reset(initialData || undefined); }, [initialData, reset]);

  const anio = watch("anio");
  const valor = watch("valor");

  const plusYear  = (d) => setValue("anio",  Number(anio || 0)  + d);
  const plusValor = (d) => setValue("valor", Math.max(0, Number(valor || 0) + d));

  const submit = (data) => { onSubmit?.(data); };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {/* PLACA */}
          <Controller name="placa" control={control} render={({ field }) => (
            <TextField select label="PLACA" fullWidth {...field}
              error={!!errors.placa} helperText={errors.placa?.message}>
              {PLACAS.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          )} />

          {/* TIPO */}
          <Controller name="tipo" control={control} render={({ field }) => (
            <TextField select label="TIPO DE SEGURO" fullWidth {...field}
              error={!!errors.tipo} helperText={errors.tipo?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Agregar tipo">
                      <IconButton edge="end"><AddIcon /></IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}>
              {TIPOS_SEGURO.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          )} />

          {/* FECHAS */}
          <Controller name="fechaCompra" control={control} render={({ field }) => (
            <DatePicker label="FECHA DE COMPRA"
              value={field.value ? dayjs(field.value) : null}
              onChange={(d)=>field.onChange(d? d.toDate(): null)}
              slots={{ openPickerIcon: CalendarMonthIcon }}
              slotProps={{ textField:{ fullWidth:true, error:!!errors.fechaCompra, helperText:errors.fechaCompra?.message } }}
            />
          )} />

          <Controller name="fechaVencimiento" control={control} render={({ field }) => (
            <DatePicker label="FECHA DE VENCIMIENTO"
              value={field.value ? dayjs(field.value) : null}
              onChange={(d)=>field.onChange(d? d.toDate(): null)}
              slots={{ openPickerIcon: CalendarMonthIcon }}
              slotProps={{ textField:{ fullWidth:true, error:!!errors.fechaVencimiento, helperText:errors.fechaVencimiento?.message } }}
            />
          )} />

          {/* AÑO */}
          <Controller name="anio" control={control} render={({ field }) => (
            <TextField label="AÑO" type="number" fullWidth {...field}
              error={!!errors.anio} helperText={errors.anio?.message}
              InputProps={{
                inputProps:{ step:1 },
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={()=>plusYear(-1)}><RemoveIcon/></IconButton>
                    <IconButton size="small" onClick={()=>plusYear(1)}><AddIcon/></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )} />

          {/* VALOR */}
          <Controller name="valor" control={control} render={({ field }) => (
            <TextField label="VALOR SEGURO" type="number" fullWidth {...field}
              error={!!errors.valor} helperText={errors.valor?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  {currencyFmt.formatToParts(0).find(p=>p.type==="currency")?.value || "$"}
                </InputAdornment>,
                inputProps:{ step:10000, min:0 },
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={()=>plusValor(-10000)}><RemoveIcon/></IconButton>
                    <IconButton size="small" onClick={()=>plusValor(10000)}><AddIcon/></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )} />
          <Typography variant="caption" color="text.secondary">
            {currencyFmt.format(Number(valor || 0))}
          </Typography>

          {/* ESTADO */}
          <Controller name="estado" control={control} render={({ field }) => (
            <TextField select label="ESTADO" fullWidth {...field}
              error={!!errors.estado} helperText={errors.estado?.message}
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <Tooltip title="Agregar estado">
                      <IconButton edge="end"><AddIcon/></IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}>
              {ESTADOS.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </TextField>
          )} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={console.log("guardo")/*handleSubmit(submit)*/}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
