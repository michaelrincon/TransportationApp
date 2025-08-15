// src/pages/Profile.jsx
import React from "react";
import { Typography, Paper } from "@mui/material";

export default function Profile() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Perfil
      </Typography>
      <Typography>Información del usuario y ajustes.</Typography>
    </Paper>
  );
}
