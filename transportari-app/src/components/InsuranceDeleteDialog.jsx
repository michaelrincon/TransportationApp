import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

export default function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Eliminar seguro",
  message = "¿Estás seguro que deseas eliminar este seguro?",
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            Eliminar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
