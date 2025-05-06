import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Link para o logo/título
import { useAuth } from "../context/AuthContext.jsx"; // Para obter userInfo e logout

function Navbar() {
  const { userInfo, logout } = useAuth(); // Pega estado e função do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate("/login"); // Redireciona para login
  };

  // Renderiza o Navbar apenas se o usuário estiver logado
  // Se não estiver logado, retorna null para não renderizar nada
  if (!userInfo) {
    return null;
  }

  return (
    // Tag <nav> semântica para a barra de navegação
    // Estilização com Tailwind: fundo azul, texto branco, padding, sombra
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      {/* Container para limitar a largura e centralizar (opcional, mas bom para telas largas) */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Título - Usamos Link para voltar para a home ao clicar */}
        <Link
          to="/"
          className="text-xl font-bold hover:text-blue-200 transition-colors"
        >
          Simple To-Do
        </Link>

        {/* Grupo de itens à direita: Email e Botão Logout */}
        <div className="flex items-center space-x-4">
          {/* Exibe o email do usuário */}
          <span className="text-sm hidden sm:inline">
            {userInfo.email}
          </span>{" "}
          {/* Oculta em telas muito pequenas */}
          {/* Botão de Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
