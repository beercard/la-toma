import { CSSProperties, useEffect, useState } from "react";
import {
  SITE_ADDRESS_FULL,
  SITE_EMAIL,
  SITE_LOCATION_TITLE,
  SITE_MAP_EMBED_LINK,
  SITE_MAP_LINK,
  SITE_WHATSAPP_DISPLAY,
  SITE_WHATSAPP_LINK,
  SITE_WHATSAPP_NUMBER,
} from "../lib/siteConfig";
import styles from "./Contact.module.css";

export default function Contact() {
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
        Contacto y ubicación de La Toma, restobar en la Costanera de Corrientes Capital con mapa interactivo,
        WhatsApp, correo electrónico y acceso directo frente al río.
      </p>

      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="contact-desktop-title">
          <div className={styles.desktopHeroFrame}>
            <div className={styles.desktopHeroBackground} />
            <img
              src="/images/contacto-hero-desktop.png"
              alt="Exterior de La Toma en la Costanera de Corrientes Capital"
              className={styles.desktopHeroImage}
            />
            <h1 id="contact-desktop-title" className={styles.desktopHeroTitle}>
              CONTACTO
            </h1>
          </div>
        </section>

        <section className={styles.desktopContentSection} aria-labelledby="contact-desktop-info-title">
          <h2 id="contact-desktop-info-title" className={styles.visuallyHidden}>
            Información de contacto
          </h2>

          <div className={styles.desktopInfoGrid}>
            <div className={styles.desktopPrimaryColumn}>
              <p className={styles.desktopLabel}>WHATSAPP</p>
              <a href={`tel:+${SITE_WHATSAPP_NUMBER}`} className={styles.desktopValueLink}>
                {SITE_WHATSAPP_DISPLAY}
              </a>
              <a
                href={SITE_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className={styles.desktopActionLink}
              >
                Iniciar chat
              </a>

              <p className={[styles.desktopLabel, styles.desktopEmailLabel].join(" ")}>CORREO ELECTRÓNICO</p>
              <a href={`mailto:${SITE_EMAIL}`} className={[styles.desktopValueLink, styles.desktopEmailValue].join(" ")}>
                {SITE_EMAIL}
              </a>
            </div>

            <div className={styles.desktopSecondaryColumn}>
              <p className={styles.desktopLabel}>UBICACIÓN</p>
              <p className={styles.desktopLocationTitle}>{SITE_LOCATION_TITLE}</p>

              <div className={styles.desktopMap}>
                <iframe
                  src={SITE_MAP_EMBED_LINK}
                  title="Mapa interactivo de La Toma"
                  className={styles.mapFrame}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className={styles.desktopAddress}>
                <a href={SITE_MAP_LINK} target="_blank" rel="noreferrer" className={styles.locationLink}>
                  {SITE_ADDRESS_FULL}
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="contact-mobile-title"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroBackground} />
            <img
              src="/images/contacto-hero-mobile.png"
              alt="Exterior de La Toma en la Costanera de Corrientes Capital"
              className={styles.mobileHeroImage}
            />
            <h1 id="contact-mobile-title" className={styles.mobileHeroTitle}>
              CONTACTO
            </h1>
          </div>
        </section>

        <section className={styles.mobileContentSection} aria-labelledby="contact-mobile-info-title">
          <h2 id="contact-mobile-info-title" className={styles.visuallyHidden}>
            Información de contacto
          </h2>

          <div className={styles.mobileInfoColumn}>
            <p className={styles.mobileLabel}>WHATSAPP</p>
            <a href={`tel:+${SITE_WHATSAPP_NUMBER}`} className={styles.mobileValueLink}>
              {SITE_WHATSAPP_DISPLAY}
            </a>
            <a
              href={SITE_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className={styles.mobileActionLink}
            >
              Iniciar chat
            </a>

            <p className={[styles.mobileLabel, styles.mobileEmailLabel].join(" ")}>CORREO ELECTRÓNICO</p>
            <a href={`mailto:${SITE_EMAIL}`} className={styles.mobileValueLink}>
              {SITE_EMAIL}
            </a>
          </div>

          <div className={styles.mobileLocationColumn}>
            <p className={styles.mobileLabel}>UBICACIÓN</p>
            <p className={styles.mobileLocationTitle}>{SITE_LOCATION_TITLE}</p>

            <div className={styles.mobileMap}>
              <iframe
                src={SITE_MAP_EMBED_LINK}
                title="Mapa interactivo de La Toma"
                className={styles.mapFrame}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className={styles.mobileAddress}>
              <a href={SITE_MAP_LINK} target="_blank" rel="noreferrer" className={styles.locationLink}>
                {SITE_ADDRESS_FULL}
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
