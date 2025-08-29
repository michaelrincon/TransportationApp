import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

// Datos de ejemplo — en un caso real los cargarías desde tu API
const demoData = [
  { id: 1, placa: "UTZ252", tipo: "SOAT", fechaCompra: "2024-10-19", fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO" },
  { id: 2, placa: "SON975", tipo: "SOAT", fechaCompra: "2024-01-06" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO"},
  { id: 3, placa: "THL551", tipo: "SOAT", fechaCompra: "2023-10-07" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO"},
];

export default function InsuranceDetail() {
  const { id } = useParams();                 // 👈 obtiene el id de la URL
  const seguro = demoData.find((r) => r.id.toString() === id);

  if (!seguro) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Seguro no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Detalle del Seguro
          </Typography>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Placa:</Typography>
            <Typography variant="body1">{seguro.placa}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Tipo:</Typography>
            <Typography variant="body1">{seguro.tipo}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Fecha de compra:</Typography>
            <Typography variant="body1">{seguro.fechaCompra}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Fecha de Vencimiento:</Typography>
            <Typography variant="body1">{seguro.fechaVencimiento}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Año:</Typography>
            <Typography variant="body1">{seguro.anio}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Valor Seguro:</Typography>
            <Typography variant="body1">{seguro.valorSeguro}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Estado:</Typography>
            <Typography variant="body1">{seguro.estado}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
