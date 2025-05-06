import React from "react";
import { useAuth } from "../context/AuthContext.jsx"; // Importa useAuth
import { useNavigate } from "react-router-dom"; // Para redirecionar após logout

function HomePage() {
  const { userInfo, logout } = useAuth(); // Obtém userInfo e logout do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função logout do contexto
    // Opcional: Redireciona para login após logout
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {/* Exibe uma saudação se o usuário estiver logado */}
        {userInfo && (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Bem-vindo, {userInfo.email}! {/* Mostra o email */}
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        )}

        <h2 className="text-2xl text-gray-700 mb-4">Suas Tarefas</h2>
        {/* A lista de tarefas virá aqui */}
        <p className="text-gray-500">Em breve...</p>
      </div>
    </div>
  );
}

export default HomePage;
