import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Estilos globales — Tailwind + fuentes + utilidades base
import "./index.css";

/**
 * Punto de entrada principal de la aplicación.
 * StrictMode está habilitado para detectar problemas potenciales en desarrollo.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
