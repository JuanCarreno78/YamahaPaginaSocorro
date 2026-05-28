import AppRoutes from "./routes/AppRoutes";

/**
 * App.jsx — Raíz de la aplicación.
 *
 * Responsabilidad única: montar el sistema de rutas.
 * No contiene lógica de negocio ni estado global.
 * Todo el enrutamiento vive en routes/AppRoutes.jsx.
 */
function App() {
  return <AppRoutes />;
}

export default App;
