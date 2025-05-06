import React from "react";
import { Navigate } from "react-router-dom"; // Remove Outlet daqui
import { useAuth } from "../context/AuthContext.jsx";
import ProtectedLayout from "./ProtectedLayout.jsx"; // Importa o layout

function ProtectedRoute() {
  const { userInfo } = useAuth();

  // Se não estiver logado, redireciona para login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o Layout Protegido.
  // O Outlet DENTRO do ProtectedLayout renderizará a rota filha (ex: HomePage)
  return <ProtectedLayout />;
}

export default ProtectedRoute;
