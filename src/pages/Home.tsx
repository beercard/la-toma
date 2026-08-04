import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withPublicBaseUrl } from "../lib/publicBaseUrl";
import styles from "./Home.module.css";

export default function Home() {
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
      <h1 className={styles.visuallyHidden}>La Toma Multiespacio, restobar en la Costanera de Corrientes Capital</h1>
      <p className="sr-only">
        La Toma es un restobar en la Costanera de Corrientes Capital con café bar, reservas, eventos y una
        experiencia gastronómica frente al río.
      </p>

      <div className={styles.desktopHome}>
        <section className={styles.desktopHero}>
          <img
            src={withPublicBaseUrl("images/home-hero-desktop.webp")}
            alt="Atardecer en La Toma sobre la Costanera de Corrientes Capital"
            className={styles.desktopHeroImage}
            decoding="async"
          />

          <div className={styles.desktopHeroOverlay}>
            <img
              src={withPublicBaseUrl("images/home-logo-desktop.webp")}
              alt="La Toma"
              className={styles.desktopHeroWordmark}
            />
            <div className={styles.desktopHeroSubbrand}>multiespacio</div>
            <p className={styles.desktopHeroText}>
              El ritual del atardecer
              <br />
              correntino, en el lugar
              <br />
              donde nació la ciudad
            </p>
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
          <div className={styles.mobileHeroCanvas}>
            <img
              src={withPublicBaseUrl("images/home-hero-mobile.webp")}
              alt="Atardecer en La Toma sobre la Costanera de Corrientes Capital"
              className={styles.mobileHeroImage}
              decoding="async"
            />

            <div className={styles.mobileHeroOverlay}>
              <img
                src={withPublicBaseUrl("images/home-logo-mobile.webp")}
                alt="La Toma"
                className={styles.mobileHeroWordmark}
              />
              <div className={styles.mobileHeroSubbrand}>multiespacio</div>
              <p className={styles.mobileHeroText}>
                El ritual del atardecer
                <br />
                correntino,
                <br />
                en el lugar
                <br />
                donde nació
                <br />
                la ciudad.
              </p>
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
