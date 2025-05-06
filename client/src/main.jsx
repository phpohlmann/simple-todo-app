import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Importa o AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Envolve tudo com AuthProvider */}
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
