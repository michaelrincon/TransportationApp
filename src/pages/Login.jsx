// src/pages/Login.jsx
import React from "react";
import { Typography, Paper, Button } from "@mui/material";

export default function Login() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Iniciar sesión
      </Typography>
      <Button variant="contained">Login</Button>
    </Paper>
  );
}
