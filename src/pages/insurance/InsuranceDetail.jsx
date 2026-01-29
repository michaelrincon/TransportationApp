import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Box, Tooltip, Fab, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import InsuranceFormDialog from "../../components/InsuranceFormDialog";
import InsuranceDeleteDialog from "../../components/InsuranceDeleteDialog";

// Datos de ejemplo — en un caso real los cargarías desde tu API
const demoData = [
  { id: 1, placa: "UTZ252", tipo: "SOAT", fechaCompra: "2024-10-19", fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO" },
  { id: 2, placa: "SON975", tipo: "SOAT", fechaCompra: "2024-01-06" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO"},
  { id: 3, placa: "THL551", tipo: "SOAT", fechaCompra: "2023-10-07" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO"},
];

export default function InsuranceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seguro, setSeguro] = React.useState(() => demoData.find(r => String(r.id) === String(id)));
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);


  if (!seguro) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Seguro no encontrado</Typography>
      </Container>
    );
  }

  const handleOpen  = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelete  = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleUpdate = async (data) => {
    // Aquí harías tu PUT a la API con { id, ...data }
    // await api.updateInsurance(id, data);
    setSeguro(prev => ({ ...prev, ...data }));  // demo: actualiza vista local
    handleClose();
  };

  const handleDelete = async () => {
    // 👉 Aquí va tu lógica de API: await api.deleteSeguro(seguro.id)
    console.log("Eliminado seguro", seguro.id);

    // Demo: simplemente navega de vuelta a la lista
    navigate("/seguros");
  };

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
      <Tooltip title="Editar Seguro">
        <Fab
          color="primary"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            right: { xs: 26, sm: 34, md: 42 },
            bottom: { xs: 146, sm: 154, md: 162 },
            boxShadow: 8,
          }}
          aria-label="editar"
        >
          <EditIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Eliminar Seguro">
        <Fab
          color="primary"
          onClick={handleOpenDelete}
          sx={{
            position: "fixed",
            right: { xs: 26, sm: 34, md: 42 },
            bottom: { xs: 46, sm: 54, md: 62 },
            boxShadow: 8,
          }}
          aria-label="eliminar"
        >
          <DeleteIcon />
        </Fab>
      </Tooltip>
      {/* Modal de edición */}
      <InsuranceFormDialog
        open={open}
        onClose={handleClose}
        initialData={seguro}
        onSubmit={handleUpdate}
        title="Editar seguro"
      />
      {/* Modal eliminar */}
      <InsuranceDeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        title="Eliminar seguro"
        message={`¿Seguro que deseas eliminar el seguro de la placa ${seguro.placa}?`}
      />
    </Container>
  );
}
