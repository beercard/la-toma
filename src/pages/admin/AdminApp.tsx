import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import EventsManager from "./EventsManager";
import GalleryManager from "./GalleryManager";
import Login from "./Login";
import styles from "./Admin.module.css";

type Tab = "eventos" | "galeria";

export default function AdminApp() {
  const { session, loading, signIn, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("eventos");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Configuración pendiente</h1>
          <p className={styles.loginSub}>
            Falta conectar Supabase. Cargá <code>VITE_SUPABASE_URL</code> y{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> en el archivo <code>.env</code> y volvé a desplegar.
            Las instrucciones están en <code>docs/AUTOGESTION.md</code>.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <p className={styles.loginSub} style={{ margin: 0 }}>Cargando…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login onSignIn={signIn} />;
  }

  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.brand}>
          La Toma <span>· Autogestión</span>
        </div>
        <button className={styles.signOut} onClick={signOut}>
          Cerrar sesión
        </button>
      </div>

      <nav className={styles.tabs}>
        <button className={`${styles.tab} ${tab === "eventos" ? styles.tabActive : ""}`} onClick={() => setTab("eventos")}>
          Eventos
        </button>
        <button className={`${styles.tab} ${tab === "galeria" ? styles.tabActive : ""}`} onClick={() => setTab("galeria")}>
          Galería
        </button>
      </nav>

      <main className={styles.main}>
        {tab === "eventos" ? <EventsManager /> : null}
        {tab === "galeria" ? <GalleryManager /> : null}
      </main>
    </div>
  );
}
