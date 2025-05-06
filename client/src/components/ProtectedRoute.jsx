import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Importa Navigate e Outlet
import { useAuth } from "../context/AuthContext.jsx"; // Importa nosso hook de autenticação

function ProtectedRoute() {
  const { userInfo } = useAuth(); // Obtém as informações do usuário do contexto

  // Se userInfo existe (usuário está logado), renderiza o conteúdo da rota aninhada (Outlet)
  // Se não, redireciona para a página de login usando o componente Navigate
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
  // 'replace' evita que a rota protegida entre no histórico do navegador se o usuário não estiver logado
}

/*
// Alternativa usando 'children' prop (funciona de forma similar com react-router-dom v6)
function ProtectedRoute({ children }) {
  const { userInfo } = useAuth();
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
*/

export default ProtectedRoute;
