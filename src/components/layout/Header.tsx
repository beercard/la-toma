import { CSSProperties, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopScale, setDesktopScale] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateDesktopScale = () => {
      if (window.innerWidth < 1024) {
        setDesktopScale(1);
        return;
      }

      const availableWidth = window.innerWidth - 48;
      setDesktopScale(Math.min(1, availableWidth / 1554));
    };

    updateDesktopScale();
    window.addEventListener("resize", updateDesktopScale);

    return () => window.removeEventListener("resize", updateDesktopScale);
  }, []);

  const navLinks = [
    { name: "Café Bar", path: "/" },
    { name: "Reservas", path: "/reservas" },
    { name: "El Proyecto", path: "/proyecto" },
    { name: "Galería", path: "/galeria" },
    { name: "Eventos", path: "/eventos" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
      <header className={styles.desktopHeader}>
        <div className={styles.desktopInner}>
          <div
            className={styles.desktopScale}
            style={{ "--desktop-scale": desktopScale } as CSSProperties}
          >
            <nav className={styles.desktopRow} aria-label="Navegación principal desktop">
              <Link to="/" className={[styles.desktopTextItem, styles.desktopCafe].join(" ")}>
                <span className={[styles.desktopNavLabel, styles.desktopCafeLabel].join(" ")}>CAfé bar</span>
                <span className={[styles.desktopNavUnderline, styles.desktopUnderline30].join(" ")} />
              </Link>

              <Link to="/reservas" className={[styles.desktopTextItem, styles.desktopReservas].join(" ")}>
                <span className={[styles.desktopNavLabel, styles.desktopReservasLabel].join(" ")}>RESERVAS</span>
                <span className={[styles.desktopNavUnderline, styles.desktopUnderline30].join(" ")} />
              </Link>

              <Link to="/proyecto" className={[styles.desktopTextItem, styles.desktopProyecto].join(" ")}>
                <span className={[styles.desktopNavLabel, styles.desktopProyectoLabel].join(" ")}>EL PROYECTO</span>
                <span className={[styles.desktopNavUnderline, styles.desktopUnderline30].join(" ")} />
              </Link>

              <Link to="/" aria-label="Ir al inicio" className={styles.desktopLogoLink}>
                <img src="/figma/mqitymz6-fnopbgn.webp" alt="La Toma" className={styles.desktopLogo} />
                <img src="/figma/mqiu0p6w-csa514q.svg" alt="" className={styles.desktopLogoHover} />
              </Link>

              <Link to="/galeria" className={[styles.desktopTextItem, styles.desktopGaleria].join(" ")}>
                <span className={[styles.desktopNavLabel, styles.desktopGaleriaLabel].join(" ")}>galería</span>
                <span className={[styles.desktopNavUnderline, styles.desktopUnderline33].join(" ")} />
              </Link>

              <Link to="/eventos" className={[styles.desktopTextItem, styles.desktopEventos].join(" ")}>
                <span className={[styles.desktopNavLabel, styles.desktopEventosLabel].join(" ")}>eventos</span>
                <span className={[styles.desktopNavUnderline, styles.desktopUnderline33].join(" ")} />
              </Link>

              <Link to="/contacto" className={[styles.desktopTextItem, styles.desktopContacto].join(" ")}>
                <span className={[styles.desktopNavLabel, styles.desktopContactoLabel].join(" ")}>CONTACTO</span>
                <span className={[styles.desktopNavUnderline, styles.desktopUnderline30].join(" ")} />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <header className={[styles.mobileHeader, isMobileMenuOpen ? styles.mobileHeaderOpen : ""].join(" ")}>
        <div className={styles.mobileInner}>
          <Link to="/" aria-label="Ir al inicio">
            <img
              src={isMobileMenuOpen ? "/figma/mqiryjto-xkdx3i0.svg" : "/figma/mqit719o-e5u7cs4.svg"}
              alt="La Toma"
              className={styles.mobileLogo}
            />
          </Link>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className={[styles.burgerBar, isMobileMenuOpen ? styles.burgerBarOpen : ""].join(" ")} />
            <span className={[styles.burgerBar, isMobileMenuOpen ? styles.burgerBarOpen : ""].join(" ")} />
            <span className={[styles.burgerBar, isMobileMenuOpen ? styles.burgerBarOpen : ""].join(" ")} />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menú">
          <div className={styles.mobileMenuHeader}>
            <img src="/figma/mqiryjto-xkdx3i0.svg" alt="La Toma" className={styles.mobileLogo} />
            <button
              type="button"
              className={styles.burger}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <span className={[styles.burgerBar, styles.burgerBarOpen].join(" ")} />
              <span className={[styles.burgerBar, styles.burgerBarOpen].join(" ")} />
              <span className={[styles.burgerBar, styles.burgerBarOpen].join(" ")} />
            </button>
          </div>

          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={styles.mobileMenuItem}>
              <div className={styles.mobileMenuItemLabel}>{link.name}</div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
