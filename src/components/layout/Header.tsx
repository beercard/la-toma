import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE_NAV_LINKS } from "../../lib/siteConfig";
import { withPublicBaseUrl } from "../../lib/publicBaseUrl";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const desktopNavItems = [
    { label: "Café bar", path: SITE_NAV_LINKS[0].path, itemClass: styles.desktopCafe },
    { label: "RESERVAS", path: SITE_NAV_LINKS[1].path, itemClass: styles.desktopReservas },
    { label: "EL PROYECTO", path: SITE_NAV_LINKS[2].path, itemClass: styles.desktopProyecto },
    { label: "galería", path: SITE_NAV_LINKS[3].path, itemClass: styles.desktopGaleria },
    { label: "eventos", path: SITE_NAV_LINKS[4].path, itemClass: styles.desktopEventos },
    { label: "CONTACTO", path: SITE_NAV_LINKS[5].path, itemClass: styles.desktopContacto },
  ];

  return (
    <>
      <header className={styles.desktopHeader}>
        <div className={styles.desktopInner}>
          <nav className={styles.desktopNav} aria-label="Navegación principal desktop">
            {desktopNavItems.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) =>
                  [styles.desktopTextItem, link.itemClass, isActive ? styles.desktopTextItemActive : ""].join(" ")
                }
              >
                <span className={styles.desktopNavLabel}>{link.label}</span>
                <span className={styles.desktopNavUnderline} />
              </NavLink>
            ))}

            <Link to="/" aria-label="Ir al inicio" className={styles.desktopLogoLink}>
              <img
                src={withPublicBaseUrl("images/header-logo-desktop.webp")}
                alt="La Toma"
                className={styles.desktopLogo}
              />
              <img src={withPublicBaseUrl("images/header-logo-hover.svg")} alt="" className={styles.desktopLogoHover} />
            </Link>
          </nav>
        </div>
      </header>

      <header className={[styles.mobileHeader, isMobileMenuOpen ? styles.mobileHeaderOpen : ""].join(" ")}>
        <div className={styles.mobileInner}>
          <Link to="/" aria-label="Ir al inicio" className={styles.mobileLogoLink}>
            <img
              src={
                isMobileMenuOpen
                  ? withPublicBaseUrl("images/header-logo-mobile-open.svg")
                  : withPublicBaseUrl("images/header-logo-mobile.svg")
              }
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
        <div
          className={styles.mobileMenu}
          role="dialog"
          aria-label="Menú"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className={styles.mobileMenuHeader}>
            <Link to="/" aria-label="Ir al inicio" className={styles.mobileLogoLink}>
              <img
                src={withPublicBaseUrl("images/header-logo-mobile-open.svg")}
                alt="La Toma"
                className={styles.mobileLogo}
              />
            </Link>
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

          {SITE_NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                [styles.mobileMenuItem, isActive ? styles.mobileMenuItemActive : ""].join(" ")
              }
            >
              <div className={styles.mobileMenuItemLabel}>{link.name}</div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
