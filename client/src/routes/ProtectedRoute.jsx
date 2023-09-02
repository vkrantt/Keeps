import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("keeps-token"));
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
