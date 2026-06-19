import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <div className={styles.desktopHome}>
        <section className={styles.desktopHero}>
          <img
            src="/figma/mqiuwd26-732cdi8.webp"
            alt="Atardecer en La Toma"
            className={styles.desktopHeroImage}
          />

          <div className={styles.desktopHeroOverlay}>
            <img
              src="/figma/mqiuwbfe-phnukur.webp"
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
            Un espacio recuperado que fusiona
            <br />
            gastronomía, diseño y la presencia del río.
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
              src="/figma/mqiuzhmp-lbbiz0u.webp"
              alt="Atardecer en La Toma"
              className={styles.mobileHeroImage}
            />

            <div className={styles.mobileHeroOverlay}>
              <img
                src="/figma/mqiuzhmo-uqbgbzi.webp"
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
            Un espacio recuperado que
            <br />
            fusiona gastronomía, diseño y la
            <br />
            presencia del río.
          </p>
          <Link to="/reservas" className={styles.mobileButton}>
            <span className={styles.mobileButtonLabel}>Reservá tu mesa</span>
          </Link>
        </section>
      </div>
    </>
  );
}
