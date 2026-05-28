import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────────────────────────
   MainLayout — Envuelve TODAS las páginas del sitio.

   Responsabilidades:
   · Montar Navbar (fixed) y Footer
   · Compensar el Navbar fixed con padding-top en <main>
   · Hacer scroll al top en cada cambio de ruta (UX estándar)
   · El <Outlet /> es donde React Router inyecta la página activa
───────────────────────────────────────────────────────────── */
export default function MainLayout() {
  const { pathname } = useLocation();

  /* Scroll al top en cada navegación — comportamiento esperado */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-dvh bg-yamaha-black">

      {/* Navbar fixed — no ocupa flujo de documento */}
      <Navbar />

      {/*
        pt-navbar compensa exactamente la altura del header fixed (64px).
        Si la altura del navbar cambia, solo se edita en tailwind.config.js
        y este padding se actualiza automáticamente.
      */}
      <main className="flex-1 pt-navbar" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
