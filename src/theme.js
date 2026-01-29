import { createTheme } from "@mui/material/styles";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";

const theme = createTheme({
  palette: {
    primary: { main: "#0B1F3B" }, // azul serio
    background: { default: "#f7f8fa" },
    text: { primary: "#0B1F3B" },
  },
  typography: {
    fontFamily: "Oswald, Arial, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#0B1F3B",
        },
      },
    },
  },
});

export default theme;
