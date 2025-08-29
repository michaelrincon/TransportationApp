import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* ===== Config ===== */
const FORM_MAX_WIDTH = 600; // ancho del formulario (ajústalo)

/* Opciones demo */
const PLACAS = ["UTZ252", "SON975", "THL551", "TFW749", "TSR859"];
const TIPOS_SEGURO = ["SOAT", "Todo Riesgo", "Responsabilidad Civil"];
const ESTADOS = ["Activo", "Vencido", "Por Vencer"];

/* Validación */
const schema = yup.object({
  placa: yup.string().required("Obligatorio"),
  tipo: yup.string().required("Obligatorio"),
  fechaCompra: yup.date().required("Obligatorio"),
  fechaVencimiento: yup
    .date()
    .required("Obligatorio")
    .min(yup.ref("fechaCompra"), "No puede ser anterior a la compra"),
  anio: yup.number().min(1900).max(2100).required("Obligatorio"),
  valor: yup.number().min(0).required("Obligatorio"),
  estado: yup.string().required("Obligatorio"),
});

const currencyFmt = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function InsuranceForm() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
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
  });

  const anio = watch("anio");
  const valor = watch("valor");

  const onSubmit = (data) => console.log("Guardar seguro:", data);
  const onCancel = () => reset();

  const addYear = (delta) => setValue("anio", Number(anio || 0) + delta);
  const addValor = (delta) => setValue("valor", Math.max(0, Number(valor || 0) + delta));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Título */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Nuevo Seguro
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Registra la compra y vigencia del seguro del vehículo.
        </Typography>
      </Box>

      {/* Formulario */}
      <Card elevation={3} sx={{ borderRadius: 3, mx: "auto", maxWidth: FORM_MAX_WIDTH }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              {/* PLACA */}
              <Controller
                name="placa"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="PLACA"
                    fullWidth
                    {...field}
                    error={!!errors.placa}
                    helperText={errors.placa?.message}
                  >
                    {PLACAS.map((p) => (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {/* TIPO DE SEGURO */}
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="TIPO DE SEGURO"
                    fullWidth
                    {...field}
                    error={!!errors.tipo}
                    helperText={errors.tipo?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Agregar tipo">
                            <IconButton edge="end">
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {TIPOS_SEGURO.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {/* FECHA DE COMPRA */}
              <Controller
                name="fechaCompra"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="FECHA DE COMPRA"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(d) => field.onChange(d ? d.toDate() : null)}
                    slots={{ openPickerIcon: CalendarMonthIcon }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.fechaCompra,
                        helperText: errors.fechaCompra?.message,
                      },
                    }}
                  />
                )}
              />

              {/* FECHA DE VENCIMIENTO */}
              <Controller
                name="fechaVencimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="FECHA DE VENCIMIENTO"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(d) => field.onChange(d ? d.toDate() : null)}
                    slots={{ openPickerIcon: CalendarMonthIcon }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.fechaVencimiento,
                        helperText: errors.fechaVencimiento?.message,
                      },
                    }}
                  />
                )}
              />

              {/* AÑO */}
              <Controller
                name="anio"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="AÑO"
                    type="number"
                    fullWidth
                    {...field}
                    error={!!errors.anio}
                    helperText={errors.anio?.message}
                    InputProps={{
                      inputProps: { step: 1 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => addYear(-1)} size="small">
                            <RemoveIcon />
                          </IconButton>
                          <IconButton onClick={() => addYear(1)} size="small">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* VALOR SEGURO */}
              <Controller
                name="valor"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="VALOR SEGURO"
                    type="number"
                    fullWidth
                    {...field}
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {currencyFmt
                            .formatToParts(0)
                            .find((p) => p.type === "currency")?.value || "$"}
                        </InputAdornment>
                      ),
                      inputProps: { step: 10000, min: 0 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => addValor(-10000)} size="small">
                            <RemoveIcon />
                          </IconButton>
                          <IconButton onClick={() => addValor(10000)} size="small">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Typography variant="caption" color="text.secondary">
                {currencyFmt.format(Number(valor || 0))}
              </Typography>

              {/* ESTADO */}
              <Controller
                name="estado"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="ESTADO"
                    fullWidth
                    {...field}
                    error={!!errors.estado}
                    helperText={errors.estado?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Agregar estado">
                            <IconButton edge="end">
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {ESTADOS.map((e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {/* Botonera */}
              <Stack direction="row" justifyContent="space-between">
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

