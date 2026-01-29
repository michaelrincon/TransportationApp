import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Box, Tooltip, Fab, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import ServicesFormDialog from "../components/ServicesFormDialog";
import ServicesDeleteDialog from "../components/ServicesDeleteDialog";

// Datos de ejemplo — en un caso real los cargarías desde tu API
const demoData = [
  { id: 1, placa: "UTZ252", fechaServicio: "2024-10-19", cliente: "Boris Rojas Gaviria", descripcion: "Villavicencio-Bogotá", valorServicio: 900000, estado: "COTIZADO" },
  { id: 2, placa: "UTZ252", fechaServicio: "2024-10-19", cliente: "Boris Rojas Gaviria", descripcion: "Villavicencio-Bogotá", valorServicio: 900000, estado: "AGENDADO" },
  { id: 3, placa: "UTZ252", fechaServicio: "2024-10-19", cliente: "Boris Rojas Gaviria", descripcion: "Villavicencio-Bogotá", valorServicio: 900000, estado: "REALIZADO" },
];

export default function ServicesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = React.useState(() => demoData.find(r => String(r.id) === String(id)));
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);


  if (!servicio) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Servicio no encontrado</Typography>
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
    setServicio(prev => ({ ...prev, ...data }));  // demo: actualiza vista local
    handleClose();
  };

  const handleDelete = async () => {
    // 👉 Aquí va tu lógica de API: await api.deleteSeguro(seguro.id)
    console.log("Eliminado servicio", servicio.id);

    // Demo: simplemente navega de vuelta a la lista
    navigate("/servicio");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Detalle del Servicio
          </Typography>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Placa:</Typography>
            <Typography variant="body1">{servicio.placa}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Fecha Servicio:</Typography>
            <Typography variant="body1">{servicio.fechaServicio}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Cliente:</Typography>
            <Typography variant="body1">{servicio.cliente}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Descripción:</Typography>
            <Typography variant="body1">{servicio.descripcion}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Valor Servicio:</Typography>
            <Typography variant="body1">{servicio.valorServicio}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Estado:</Typography>
            <Typography variant="body1">{servicio.estado}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Tooltip title="Editar Servicio">
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
      <Tooltip title="Eliminar Servicio">
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
      <ServicesFormDialog
        open={open}
        onClose={handleClose}
        initialData={servicio}
        onSubmit={handleUpdate}
        title="Editar servicio"
      />
      {/* Modal eliminar */}
      <ServicesDeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        title="Eliminar servicio"
        message={`¿Seguro que deseas eliminar el servicio del vehiculo con placa ${servicio.placa}?`}
      />
    </Container>
  );
}