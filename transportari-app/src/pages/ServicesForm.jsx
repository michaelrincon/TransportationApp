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
const ESTADOS = ["Cotizado", "Agendado", "Realizado"];

/* Validación */
const schema = yup.object({
  placa: yup.string().required("Obligatorio"),
  fechaServicio: yup.date().required("Obligatorio"),
  cliente: yup.string().required("Obligatorio"),
  descripcion: yup.string().required("Obligatorio"),
  valorServicio: yup.number().min(0).required("Obligatorio"),
  estado: yup.string().required("Obligatorio"),
});

const currencyFmt = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ServicesForm() {
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
      fechaServicio: null,
      cliente: "",
      descripcion: "",
      valorServicio: 0,
      estado: "",
    },
  });

  const valor = watch("valorServicio");

  const onSubmit = (data) => console.log("Guardar servicio:", data);
  const onCancel = () => reset();

  const addValor = (delta) => setValue("valorServicio", Math.max(0, Number(valor || 0) + delta));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Título */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Nuevo Servicio
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Registra el servicio de un vehiculo.
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

               {/* FECHA DE COMPRA */}
              <Controller
                name="fechaServicio"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="FECHA SERVICIO"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(d) => field.onChange(d ? d.toDate() : null)}
                    slots={{ openPickerIcon: CalendarMonthIcon }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.fechaServicio,
                        helperText: errors.fechaServicio?.message,
                      },
                    }}
                  />
                )}
              />

              {/* TIPO DE SEGURO */}
              <Controller
                name="cliente"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="CLIENTE"
                    fullWidth
                    {...field}
                    error={!!errors.cliente}
                    helperText={errors.cliente?.message}
                  >
                  </TextField>
                )}
              />

              {/* TIPO DE SEGURO */}
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="DESCRIPCION"
                    fullWidth
                    {...field}
                    error={!!errors.descripcion}
                    helperText={errors.descripcion?.message}
                  >
                  </TextField>
                )}
              />

              {/* VALOR SEGURO */}
              <Controller
                name="valorServicio"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="VALOR SERVICIO"
                    type="number"
                    fullWidth
                    {...field}
                    error={!!errors.valorServicio}
                    helperText={errors.valorServicio?.message}
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
                <Button onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="contained">
                  Guardar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

