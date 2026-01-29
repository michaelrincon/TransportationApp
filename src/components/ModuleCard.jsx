import React from "react";
import {
  Card, CardActionArea, CardContent, Box, Typography, Stack
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * Todas las tarjetas: mismo ancho/alto => consistencia visual.
 * - width/height controlados por el contenedor (Dashboard)
 * - aquí solo centramos el contenido y mantenemos proporciones
 */
export default function ModuleCard({ title, to = "#", Icon, color = "primary.main" }) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",                 // ocupa todo el alto asignado por el grid
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform .15s ease, box-shadow .15s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 8 },
        display: "flex",                // asegura igual altura de contenido
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={to}
        sx={{ flex: 1, display: "flex" }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ flex: 1, p: 3 }}
        >
          {/* Icon badge */}
          <Box
            sx={{
              width: 84,
              height: 84,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
            }}
          >
            {Icon && <Icon sx={{ fontSize: 80, color }} />}
          </Box>

          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: 800, letterSpacing: 0.6 }}
            >
              {title}
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
