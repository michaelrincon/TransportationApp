// src/pages/Insurance.jsx
import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Fab,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

const initialRows = [
  { id: 1, placa: "UTZ252", tipo: "SOAT", fechaCompra: "2024-10-19" },
  { id: 2, placa: "SON975", tipo: "SOAT", fechaCompra: "2024-01-06" },
  { id: 3, placa: "THL551", tipo: "SOAT", fechaCompra: "2023-10-07" },
  { id: 4, placa: "TFW749", tipo: "SOAT", fechaCompra: "2024-04-18" },
  { id: 5, placa: "TSR859", tipo: "SOAT", fechaCompra: "2024-01-26" },
];

const columns = [
  { field: "placa", headerName: "PLACA", flex: 1, minWidth: 140 },
  { field: "tipo", headerName: "TIPO DE SEGURO", flex: 1, minWidth: 160 },
  {
    field: "fechaCompra",
    headerName: "FECHA DE COMPRA",
    flex: 1,
    minWidth: 180,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format("MM/DD/YYYY") : "",
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        px: 1.5,
        py: 1,
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <GridToolbarQuickFilter debounceMs={300} />
      <GridToolbarExport csvOptions={{ utf8WithBom: true, fileName: "seguros" }} />
    </GridToolbarContainer>
  );
}

export default function Insurance() {
  const [rows] = React.useState(initialRows);

  const onFabClick = () => {
    console.log("Crear nuevo seguro");
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Seguros
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gestión de pólizas y compras de seguros por vehículo.
        </Typography>
      </Box>

      <Card elevation={3} sx={{ borderRadius: 3, mx: "auto" }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ height: 460, px: 2, pb: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
                sorting: { sortModel: [{ field: "fechaCompra", sort: "desc" }] },
              }}
              disableRowSelectionOnClick
              slots={{ toolbar: CustomToolbar }}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  fontWeight: 700,
                  letterSpacing: 0.4,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

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
