import React from "react";
import ReactDOM from "react-dom/client"; // *** IMPORTANTE: Importa createRoot de 'react-dom/client' ***
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Envolva App com BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
