import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const sellerToken = localStorage.getItem("sellerToken");

  if (!sellerToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}