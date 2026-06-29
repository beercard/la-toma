import { CSSProperties, useEffect, useState } from "react";
import styles from "./Menu.module.css";

// URL del menú digital de FUDO para incrustar.
// Pegá acá el enlace que te da FUDO (ej. https://menu.fu.do/la-toma) y el iframe
// se muestra automáticamente. Mientras esté vacío se ve un aviso de "próximamente".
const FUDO_MENU_URL = "";

export default function Menu() {
  const [mobileHeroScale, setMobileHeroScale] = useState(1);

  useEffect(() => {
    const updateMobileHeroScale = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setMobileHeroScale(1);
        return;
      }

      setMobileHeroScale(Math.min(width / 390, 1.18));
    };

    updateMobileHeroScale();
    window.addEventListener("resize", updateMobileHeroScale);

    return () => window.removeEventListener("resize", updateMobileHeroScale);
  }, []);

  return (
    <>
      <p className="sr-only">
        Café Bar La Toma en la Costanera de Corrientes Capital, un espacio frente al río para desayunos,
        meriendas, encuentros y experiencias gastronómicas.
      </p>

      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="cafe-bar-desktop-title">
          <div className={styles.desktopHeroFrame}>
            <div className={styles.desktopHeroBackground} />
            <img
              src="/figma/mqmruuq4-02y5vq5.png"
              alt=""
              className={styles.desktopHeroImage}
            />
            <img
              src="/figma/mqmruuq4-a2xv23f.png"
              alt="La Toma"
              className={styles.desktopHeroLogo}
            />
            <h1 id="cafe-bar-desktop-title" className={styles.desktopHeroTitle}>
              CAFÉ BAR
            </h1>
          </div>
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="cafe-bar-mobile-title"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroBackground} />
            <img
              src="/figma/mqmrvea4-vn3fpu8.png"
              alt=""
              className={styles.mobileHeroImage}
            />
            <img
              src="/figma/mqmrvea4-vrqjny0.png"
              alt="La Toma"
              className={styles.mobileHeroLogo}
            />
            <h1 id="cafe-bar-mobile-title" className={styles.mobileHeroTitle}>
              CAFÉ BAR
            </h1>
          </div>
        </section>
      </div>

      <section className={styles.menuSection} aria-labelledby="menu-title">
        <div className={styles.menuInner}>
          <p className={styles.menuEyebrow}>Café Bar · Costanera de Corrientes</p>
          <h2 id="menu-title" className={styles.menuTitle}>
            Nuestra Carta
          </h2>

          {FUDO_MENU_URL ? (
            <div className={styles.menuFrameWrap}>
              <iframe
                src={FUDO_MENU_URL}
                title="Menú de La Toma"
                className={styles.menuFrame}
                loading="lazy"
              />
            </div>
          ) : (
            <div className={styles.menuPlaceholder} role="status">
              <p className={styles.menuPlaceholderText}>Estamos preparando nuestra carta digital.</p>
              <p className={styles.menuPlaceholderHint}>Muy pronto vas a poder verla acá.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
