import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Páginas
import Home        from "../pages/Home";
import Catalogo    from "../pages/Catalogo";
import MotoDetalle from "../pages/MotoDetalle";
import Contacto    from "../pages/Contacto";

/**
 * AppRoutes.jsx — Definición centralizada de rutas.
 *
 * Patrón: Layout como ruta padre (element={<MainLayout />})
 * con páginas como hijos anidados.
 * Esto garantiza que Navbar y Footer rodeen todas las páginas
 * sin repetir código en cada una.
 *
 * Estructura de URLs:
 *   /              → Home
 *   /catalogo      → Catálogo de motos
 *   /catalogo/:id  → Detalle de moto específica
 *   /contacto      → Página de contacto
 */
function AppRoutes() {
  return (
    <BrowserRouter basename="/YamahaPaginaSocorro">
      <Routes>
        {/* Ruta padre: aplica MainLayout a todas las páginas hijas */}
        <Route element={<MainLayout />}>
          <Route index           element={<Home />}        />
          <Route path="catalogo" element={<Catalogo />}    />
          <Route path="catalogo/:id" element={<MotoDetalle />} />
          <Route path="contacto" element={<Contacto />}    />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
