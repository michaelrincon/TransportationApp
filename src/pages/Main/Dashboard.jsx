import React from "react";
import { Box, Container, Typography, Tooltip, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarCrashOutlined from "@mui/icons-material/CarCrashOutlined";            // Seguros
import CarRepairOutlined from "@mui/icons-material/CarRepairOutlined";    // Mantenimiento
import DepartureBoardOutlined from "@mui/icons-material/DepartureBoardOutlined"; // Servicios
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined"; // Clientes
import AirportShuttleOutlined from "@mui/icons-material/AirportShuttleOutlined"; // Vehículos
import ModuleCard from "../../components/ModuleCard";

const MODULES = [
  { key: "seguros",       title: "SEGUROS",       to: "/seguros",       Icon: CarCrashOutlined,               color: "success.main" },
  { key: "mantenimiento", title: "MANTENIMIENTOS", to: "/mantenimiento", Icon: CarRepairOutlined,           color: "warning.main" },
  { key: "servicio",     title: "SERVICIOS",     to: "/servicio",     Icon: DepartureBoardOutlined, color: "info.main" },
  { key: "cliente",      title: "CLIENTES",      to: "/cliente",      Icon: PersonPinCircleOutlinedIcon,       color: "secondary.main" },
  { key: "vehiculos",     title: "VEHICULOS",     to: "/vehiculos",     Icon: AirportShuttleOutlined,   color: "primary.main" },
];

export default function Dashboard() {
  const onFabClick = () => {
    console.log("FAB clicked");
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
      {/* Encabezado centrado */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Panel principal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Accesos rápidos a los módulos de la plataforma.
        </Typography>
      </Box>

      {/* CSS Grid centrado y con tarjetas del mismo tamaño */}
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          justifyContent: "center",                 // centra TODA la grilla
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 260px))",
          // Todas las tarjetas tendrán el mismo ALTO:
          "& > .dash-card": {
            width: "100%",
            height: 220,                             // <-- alto fijo (ajusta a tu gusto)
          },
        }}
      >
        {MODULES.map(({ key, title, to, Icon, color }) => (
          <Box key={key} className="dash-card">
            <ModuleCard title={title} to={to} Icon={Icon} color={color} />
          </Box>
        ))}
      </Box>

      {/* FAB flotante */}
      <Tooltip title="Agregar">
        <Fab
          color="primary"
          onClick={onFabClick}
          sx={{
            position: "fixed",
            right: { xs: 16, sm: 24, md: 32 },
            bottom: { xs: 16, sm: 24, md: 32 },
            boxShadow: 8,
          }}
          aria-label="agregar"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
}

