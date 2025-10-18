import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MySnackBar from "./components/MySnackBar";
import { ToastContext } from "./Context/ToastContext";


function App() {
  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");
  function showHideToast(message){
    setOpen(true)
    setmessage(message)
    setTimeout(() => {
      setOpen(false)
    }, 3000);
  }
 const theme = useTheme();
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

   return (
    <ThemeProvider theme={createTheme({ palette: { mode } })}>
     <ToastContext.Provider value={{showHideToast}}>
      <div style={{
          minHeight: "100vh",
          backgroundColor: "#bbdefb",
          color: theme.palette.text.primary,
          transition: "background-color 0.3s ease",
        }}>
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>
      <TodoList />
      </div>
       <MySnackBar open={open} message={message} />
       </ToastContext.Provider>
    </ThemeProvider>
  );


}

export default App;
