import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Box, Tooltip, Fab, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import MaintenanceFormDialog from "../components/MaintenanceFormDialog";
import MaintenanceDeleteDialog from "../components/MaintenanceDeleteDialog";

// Datos de ejemplo — en un caso real los cargarías desde tu API
const demoData = [
  { id: 1, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 2, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 3, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 4, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 5, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 6, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 7, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 8, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 9, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
  { id: 10, placa: "UTZ252", fechaMantenimiento: "2024-10-19", parteReparada: "Bujes muelles delanteros y traseros", tecnico: "Julio muelles", valorReparacion: 360000 },
];

export default function MaintenanceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mantenimiento, setMantenimiento] = React.useState(() => demoData.find(r => String(r.id) === String(id)));
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);


  if (!mantenimiento) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Mantenimiento no encontrado</Typography>
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
    setMantenimiento(prev => ({ ...prev, ...data }));  // demo: actualiza vista local
    handleClose();
  };

  const handleDelete = async () => {
    // 👉 Aquí va tu lógica de API: await api.deleteSeguro(seguro.id)
    console.log("Eliminado mantenimiento", mantenimiento.id);

    // Demo: simplemente navega de vuelta a la lista
    navigate("/mantenimiento");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Detalle del Mantenimiento
          </Typography>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Placa:</Typography>
            <Typography variant="body1">{mantenimiento.placa}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Fecha de Mantenimiento:</Typography>
            <Typography variant="body1">{mantenimiento.fechaMantenimiento}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Parte Reparada:</Typography>
            <Typography variant="body1">{mantenimiento.parteReparada}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Técnico:</Typography>
            <Typography variant="body1">{mantenimiento.tecnico}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Valor Reparación:</Typography>
            <Typography variant="body1">{mantenimiento.valorReparacion}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Tooltip title="Editar Mantenimiento">
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
      <Tooltip title="Eliminar Mantenimiento">
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
      <MaintenanceFormDialog
        open={open}
        onClose={handleClose}
        initialData={mantenimiento}
        onSubmit={handleUpdate}
        title="Editar mantenimiento"
      />
      {/* Modal eliminar */}
      <MaintenanceDeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        title="Eliminar mantenimiento"
        message={`¿Seguro que deseas eliminar el mantenimiento del vehiculo con placa ${mantenimiento.placa}?`}
      />
    </Container>
  );
}
