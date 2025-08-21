import React from "react";
import { Box, Container, Toolbar } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      {/* Header fijo */}
      <Header />
      {/* Empuje para que el contenido no quede debajo del AppBar fijo */}
      <Toolbar />
      {/* Contenido */}
      <Container component="main" sx={{ flex: 1, py: 3}} >
        {children}
      </Container>
      {/* Footer */}
      <Footer />
    </Box>
  );
}
