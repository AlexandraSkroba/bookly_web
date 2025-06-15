import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/signup" />;
};
