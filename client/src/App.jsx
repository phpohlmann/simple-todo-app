import "./index.css";
import { Routes, Route } from "react-router-dom";

// Páginas
import LoginPage from "./pages/LoginPage.jsx"; // Verifique a extensão .jsx
import RegisterPage from "./pages/RegisterPage.jsx"; // Verifique a extensão .jsx
import HomePage from "./pages/HomePage.jsx"; // Verifique a extensão .jsx

// Componente de Rota Protegida
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Importa o ProtectedRoute

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas Privadas */}
        {/* Usamos uma rota pai com o ProtectedRoute como 'element' */}
        <Route element={<ProtectedRoute />}>
          {/* Rotas filhas que serão protegidas */}
          {/* O Outlet dentro de ProtectedRoute renderizará este elemento */}
          <Route path="/" element={<HomePage />} />
          {/* Você pode adicionar outras rotas protegidas aqui dentro */}
          {/* Ex: <Route path="/profile" element={<ProfilePage />} /> */}
        </Route>

        {/* Rota 404 (Opcional) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
