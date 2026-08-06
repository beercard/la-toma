import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withPublicBaseUrl } from "../lib/publicBaseUrl";
import styles from "./Home.module.css";

export default function Home() {
  const [mobileHeroScale, setMobileHeroScale] = useState(1);
  const [desktopHeroScale, setDesktopHeroScale] = useState(1);

  useEffect(() => {
    const updateHeroScales = () => {
      // clientWidth excluye la barra de scroll: así el canvas de 1920px encaja
      // exacto con el ancho visible y no se recorta por los costados.
      const width = document.documentElement.clientWidth || window.innerWidth;
      // El corte desktop/mobile se decide con matchMedia y no con `width`, para
      // que coincida siempre con el breakpoint de CSS (que ignora la scrollbar).
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (isDesktop) {
        setMobileHeroScale(1);
        // Piso de 0.6 para que en notebooks de ~1024px el hero no quede
        // demasiado bajo. El canvas se recorta parejo por ambos lados y el
        // contenido conserva ~100px de aire, así que no se pierde nada.
        const scale = Math.min(Math.max(width / 1920, 0.6), 1);
        setDesktopHeroScale(Number(scale.toFixed(3)));
        return;
      }

      setDesktopHeroScale(1);
      setMobileHeroScale(Math.min(width / 390, 1.18));
    };

    updateHeroScales();
    window.addEventListener("resize", updateHeroScales);

    return () => window.removeEventListener("resize", updateHeroScales);
  }, []);

  return (
    <>
      <h1 className={styles.visuallyHidden}>La Toma Multiespacio, restobar en la Costanera de Corrientes Capital</h1>
      <p className="sr-only">
        La Toma es un restobar en la Costanera de Corrientes Capital con café bar, reservas, eventos y una
        experiencia gastronómica frente al río.
      </p>

      <div className={styles.desktopHome}>
        <section
          className={styles.desktopHero}
          style={{ "--desktop-hero-scale": desktopHeroScale } as CSSProperties}
        >
          <img
            src={withPublicBaseUrl("images/home-hero-desktop.webp")}
            alt="Atardecer en La Toma sobre la Costanera de Corrientes Capital"
            className={styles.desktopHeroImage}
            decoding="async"
          />
          <div className={styles.desktopHeroCanvas}>
            <div className={styles.desktopHeroBackground} />
            <div className={styles.desktopHeroOverlay}>
              <img
                src={withPublicBaseUrl("images/home-logo-desktop.webp")}
                alt="La Toma"
                className={styles.desktopHeroWordmark}
              />
              <div className={styles.desktopHeroSubbrand}>multiespacio</div>
              <p className={styles.desktopHeroText}>
                El ritual del atardecer correntino, en el lugar donde nació la ciudad
              </p>
            </div>
          </div>
        </section>

        <section className={styles.desktopIntro}>
          <p className={styles.desktopIntroText}>
            Un restobar en la Costanera correntina
            <br />
            que fusiona gastronomía, diseño y río.
          </p>
          <Link to="/reservas" className={styles.desktopButton}>
            <span className={styles.desktopButtonLabel}>Reservá tu mesa</span>
          </Link>
        </section>
      </div>

      <div className={styles.mobileHome}>
        <section
          className={styles.mobileHero}
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <img
            src={withPublicBaseUrl("images/home-hero-mobile.webp")}
            alt="Atardecer en La Toma sobre la Costanera de Corrientes Capital"
            className={styles.mobileHeroImage}
            decoding="async"
          />
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroOverlay}>
              <img
                src={withPublicBaseUrl("images/home-logo-mobile.webp")}
                alt="La Toma"
                className={styles.mobileHeroWordmark}
              />
              <div className={styles.mobileHeroSubbrand}>multiespacio</div>
              <p className={styles.mobileHeroText}>El ritual del atardecer correntino, en el lugar donde nació la ciudad.</p>
            </div>
          </div>
        </section>

        <section className={styles.mobileIntro}>
          <p className={styles.mobileIntroText}>
            Un restobar en la Costanera
            <br />
            correntina que fusiona
            <br />
            gastronomía, diseño y río.
          </p>
          <Link to="/reservas" className={styles.mobileButton}>
            <span className={styles.mobileButtonLabel}>Reservá tu mesa</span>
          </Link>
        </section>
      </div>
    </>
  );
}
