import React from "react";
import { Outlet } from "react-router-dom"; // Outlet renderiza o conteúdo da rota filha
import Navbar from "./Navbar.jsx"; // Importa o Navbar que acabamos de criar

function ProtectedLayout() {
  return (
    // Estrutura flexível para garantir que o conteúdo principal cresça
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Renderiza o Navbar no topo */}
      {/* A tag <main> é semanticamente apropriada para o conteúdo principal */}
      {/* flex-grow garante que o main ocupe o espaço restante */}
      <main className="flex-grow">
        <Outlet />{" "}
        {/* O conteúdo da página (ex: HomePage) será renderizado aqui */}
      </main>
      {/* Poderíamos adicionar um Footer aqui se quiséssemos */}
    </div>
  );
}

export default ProtectedLayout;
