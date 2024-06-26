import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { Menu, MT5Menu } from "./utils/constants/Constants";
import ControlCenter from "./pages/ControlCenter";
import ProtectedRoute from "./utils/protectedRoute/ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#020817",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#020817",
    },
    complementaryRed: {
      main: "#d9534f",
      contrastText: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<ControlCenter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
