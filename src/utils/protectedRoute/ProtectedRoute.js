import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
