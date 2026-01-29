// src/pages/Home.jsx
import React from "react";
import { Typography, Paper, Box } from "@mui/material";

export default function Home() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Inicio
      </Typography>
      <Typography>
        Bienvenido a Transportari. Esta es la página de inicio.
      </Typography>
      <Box sx={{ mt: 2 }}>
        {/* aquí tu contenido */}
      </Box>
    </Paper>
  );
}
