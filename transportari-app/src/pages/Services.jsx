
import React from "react";
import { useNavigate } from "react-router-dom"; 
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
  { id: 1, placa: "UTZ252", tipo: "SOAT", fechaCompra: "2024-10-19", fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO" },
  { id: 2, placa: "SON975", tipo: "SOAT", fechaCompra: "2024-01-06", fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO" },
  { id: 3, placa: "THL551", tipo: "SOAT", fechaCompra: "2023-10-07", fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 100000, estado: "PAGADO" },
  { id: 4, placa: "TFW749", tipo: "SOAT", fechaCompra: "2024-04-18" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO"},
  { id: 5, placa: "TSR859", tipo: "SOAT", fechaCompra: "2024-01-26" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO"},
    { id: 6, placa: "UTZ252", tipo: "SOAT", fechaCompra: "2024-10-19" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 300000, estado: "PAGADO"},
  { id: 7, placa: "SON975", tipo: "SOAT", fechaCompra: "2024-01-06" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 9000000, estado: "PAGADO"},
  { id: 8, placa: "THL551", tipo: "SOAT", fechaCompra: "2023-10-07" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 1200000, estado: "PAGADO"},
  { id: 9, placa: "TFW749", tipo: "SOAT", fechaCompra: "2024-04-18" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 9000000, estado: "PAGADO"},
  { id: 10, placa: "TSR859", tipo: "SOAT", fechaCompra: "2024-01-26" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO"},
    { id: 11, placa: "UTZ252", tipo: "SOAT", fechaCompra: "2024-10-19" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO"},
  { id: 12, placa: "SON975", tipo: "SOAT", fechaCompra: "2024-01-06" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 800000, estado: "PAGADO"},
  { id: 13, placa: "THL551", tipo: "SOAT", fechaCompra: "2023-10-07" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 500000, estado: "PAGADO"},
  { id: 14, placa: "TFW749", tipo: "SOAT", fechaCompra: "2024-04-18" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 900000, estado: "PAGADO"},
  { id: 15, placa: "TSR859", tipo: "SOAT", fechaCompra: "2024-01-26" , fechaVencimiento: "2025-10-19", anio: 2025, valorSeguro: 600000, estado: "PAGADO"},
];

const columns = [
  { field: "placa", headerName: "PLACA", flex: 1, minWidth: 140 },
  { field: "tipo", headerName: "TIPO DE SEGURO", flex: 1, minWidth: 160 },
  {
    field: "fechaCompra",
    headerName: "FECHA DE COMPRA",
    flex: 1,
    minWidth: 180,
  },
  { field: "fechaVencimiento", headerName: "FECHA DE VENCIMIENTO", flex: 1, minWidth: 180 },
  { field: "anio", headerName: "AÑO", flex: 1, minWidth: 160 },
  { field: "valorSeguro", headerName: "VALOR SEGURO", flex: 1, minWidth: 160 },
  { field: "estado", headerName: "ESTADO", flex: 1, minWidth: 160 },
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

  const navigate = useNavigate(); 
  const onFabClick = () => {
    navigate("/seguros/create");
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Servicios
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gestión de servicios que se han tomado.
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
              onRowClick={(params) => {
                // 👇 redirige a la ruta con el id de la fila
                navigate(`/seguros/${params.row.id}`);
              }}
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

      <Tooltip title="Agregar Seguro">
        <Fab
          color="primary"
          onClick={onFabClick}
          sx={{
            position: "fixed",
            right: { xs: 26, sm: 34, md: 42 },
            bottom: { xs: 46, sm: 54, md: 62 },
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
