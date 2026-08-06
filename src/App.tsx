import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import RouteSeo from "@/components/seo/RouteSeo";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import Project from "@/pages/Project";
import Gallery from "@/pages/Gallery";
import Reservations from "@/pages/Reservations";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

const AdminApp = lazy(() => import("@/pages/admin/AdminApp"));

function PublicSite() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafe-bar" element={<Menu />} />
        <Route path="/menu" element={<Navigate to="/cafe-bar" replace />} />
        <Route path="/proyecto" element={<Project />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/reservas" element={<Reservations />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/terminos" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  // El sitio se sirve desde la raiz del dominio (public_html/latoma es el
  // document root del hosting), asi que no hace falta basename.
  // Ver base: '/' en vite.config.ts.
  return (
    <Router>
      <RouteSeo />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </Router>
  );
}
