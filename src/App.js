import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ControlCenter from "./pages/ControlCenter";
import ProtectedRoute from "./utils/protectedRoute/ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./utils/redux/actions/Auth";

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
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(checkAuthentication());
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<ControlCenter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
