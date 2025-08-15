import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../assets/Logo.png"

const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function Header() {
  const navigate = useNavigate();

  // Estado del perfil (menú)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const handleOpenProfile = (e) => setAnchorEl(e.currentTarget);
  const handleCloseProfile = () => setAnchorEl(null);

  // Idioma
  const [lang, setLang] = React.useState("es");
  const handleChangeLang = (e) => {
    setLang(e.target.value);
    // aquí podrías integrar i18n (react-i18next) si lo usas
  };

  // Demo: nombre de usuario (podrás reemplazar por datos reales)
  const userName = "Steven Rincón";

  return (
    <AppBar position="fixed" color="primary" elevation={3}>
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo + nombre de app (click -> home) */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
            mr: 2,
          }}
        >
          <Avatar
            alt="Transportari"
            src={logo}
            sx={{ width: 80, height: 80, mr: 1, bgcolor: "transparent" }}
          />
        </Box>

        {/* Empuja los items hacia la derecha */}
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          {/* Idiomas (a la izquierda de los iconos, para que visualmente quede: [Idiomas] [Notifs] [Perfil] */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: "white" }}>Idioma</InputLabel>
            <Select
              native
              value={lang}
              onChange={handleChangeLang}
              label="Idioma"
              sx={{
                color: "white",
                borderColor: "white",
                "& .MuiSelect-icon": { color: "white" },
                "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              }}
            >
              {LANGUAGES.map((l) => (
                <option value={l.code} key={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Notificaciones */}
          <Tooltip title="Notificaciones">
            <IconButton size="large" sx={{ color: "white" }}>
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>

          {/* Perfil (a la derecha de todo) */}
          <Tooltip title="Perfil">
            <IconButton
              size="large"
              onClick={handleOpenProfile}
              sx={{ color: "white" }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={openProfile}
            onClose={handleCloseProfile}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Usuario
              </Typography>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => {
                handleCloseProfile();
                navigate("/profile");
              }}
            >
              Perfil
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseProfile();
                // aquí harías tu lógica real de logout
                navigate("/login");
              }}
            >
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
