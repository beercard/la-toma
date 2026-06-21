import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const AdminApp = lazy(() => import("@/pages/admin/AdminApp"));

function PublicSite() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/proyecto" element={<Project />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/reservas" element={<Reservations />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/terminos" element={<Terms />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
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
