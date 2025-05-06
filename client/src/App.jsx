import "./index.css";
import { Routes, Route } from "react-router-dom";

// Páginas
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";

// Componente de Rota Protegida
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas Privadas - Envolvidas por ProtectedRoute */}
        {/* ProtectedRoute agora renderiza o layout (Navbar + Outlet) */}
        <Route element={<ProtectedRoute />}>
          {/* O Outlet renderizará estes elementos */}
          <Route path="/" element={<HomePage />} />
          {/* Adicione outras rotas protegidas aqui */}
          {/* Ex: <Route path="/profile" element={<ProfilePage />} /> */}
        </Route>

        {/* Rota 404 (Opcional) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
