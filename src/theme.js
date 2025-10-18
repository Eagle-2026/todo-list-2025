import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode:"light", // or "dark"
    primary: {
      main: "#ff5722", // blue
    },
    secondary: {
      main: "#ff9800", // orange
    },
    success: {
      main: "#4caf50", // green
    },
    error: {
      main: "#f44336", // red
    },
    
  },
});

export default theme;
