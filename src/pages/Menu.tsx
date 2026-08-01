import { CSSProperties, useEffect, useState } from "react";
import { SITE_INSTAGRAM_LINK } from "../lib/siteConfig";
import styles from "./Menu.module.css";

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
              src="/images/cafe-hero-desktop.png"
              alt=""
              className={styles.desktopHeroImage}
            />
            <img
              src="/images/cafe-logo-desktop.png"
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
              src="/images/cafe-hero-mobile.png"
              alt=""
              className={styles.mobileHeroImage}
            />
            <img
              src="/images/cafe-logo-mobile.png"
              alt="La Toma"
              className={styles.mobileHeroLogo}
            />
            <h1 id="cafe-bar-mobile-title" className={styles.mobileHeroTitle}>
              CAFÉ BAR
            </h1>
          </div>
        </section>
      </div>

      <section className={styles.updatesSection} aria-label="Novedades de Café Bar">
        <p className={styles.updatesText}>
          Próximamente...
          <br />
          Más novedades desde nuestro{" "}
          <a
            href={SITE_INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
            className={styles.instagramLink}
          >
            Instagram
          </a>
        </p>
      </section>
    </>
  );
}
