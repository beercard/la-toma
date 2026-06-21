import { Link } from "react-router-dom";
import {
  SITE_ADDRESS_CITY,
  SITE_ADDRESS_LINE,
  SITE_EMAIL,
  SITE_INSTAGRAM_LINK,
  SITE_LOCATION_TITLE,
  SITE_MAP_LINK,
  SITE_WHATSAPP_DISPLAY,
  SITE_WHATSAPP_LINK,
} from "../../lib/siteConfig";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.desktopFooter}>
        <div className={styles.desktopInner}>
          <div className={styles.desktopBrandColumn}>
            <img
              src="/figma/mqiw30lw-y7bu4mh.webp"
              alt="La Toma"
              className={styles.logo}
              loading="lazy"
              decoding="async"
            />

            <div className={styles.stack104}>
              <Link to="/privacidad" className={styles.legalLink}>
                Políticas de privacidad
              </Link>
            </div>

            <div className={styles.stack20}>
              <Link to="/terminos" className={styles.legalLink}>
                Términos y Condiciones
              </Link>
            </div>

            <div className={styles.stack20}>
              <div className={styles.legalText}>©2026 La Toma Multiespacio. Corrientes, ARG.</div>
              <p className={styles.credit}>
                Diseñado por{" "}
                <a href="https://vektra.digital" target="_blank" rel="noreferrer" className={styles.creditLink}>
                  Vektra Digital
                </a>
              </p>
            </div>
          </div>

          <div className={styles.desktopColumn}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <a href={SITE_MAP_LINK} target="_blank" rel="noreferrer" className={styles.addressLinkBlock}>
              {SITE_LOCATION_TITLE}
              <br />
              <br />
              {SITE_ADDRESS_LINE}
              <br />
              {SITE_ADDRESS_CITY}
            </a>
            <div className={styles.stack18}>
              <a href={SITE_MAP_LINK} target="_blank" rel="noreferrer" className={styles.mapLink}>
                Ver en el mapa
              </a>
            </div>
          </div>

          <div className={styles.desktopColumn}>
            <h4 className={styles.colTitle}>Reservas y horarios</h4>
            <div className={styles.bodyText}>
              Jueves y Viernes
              <br />
              18:00 — 02:00
              <br />
              <br />
              Sábados
              <br />
              10:00 — 14:00
              <br />
              19:00 — 03:00
              <br />
              <br />
              Domingo a Miércoles
              <br />
              CERRADO
            </div>
          </div>

          <div className={styles.desktopColumn}>
            <h4 className={styles.colTitle}>Comunidad</h4>
            <div className={styles.bodyText}>
              <a href={SITE_INSTAGRAM_LINK} target="_blank" rel="noreferrer" className={styles.footerMenuLink}>
                Instagram
              </a>
              <br />
              <br />
              <a
                href={SITE_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                aria-label={`Escribir por WhatsApp al ${SITE_WHATSAPP_DISPLAY}`}
                className={styles.footerMenuLink}
              >
                WhatsApp
              </a>
              <br />
              <br />
              <a href={`mailto:${SITE_EMAIL}`} className={styles.footerMenuLink}>
                Correo electrónico
              </a>
            </div>
          </div>
        </div>
      </footer>

      <footer className={styles.mobileFooter}>
        <div className={styles.mobileInner}>
          <div className={styles.mobileTop}>
            <p className={styles.mobileAddress}>
              <span className={styles.mobileAddressStrong}>{SITE_LOCATION_TITLE}.</span>
              <br />
              <br />
              <a href={SITE_MAP_LINK} target="_blank" rel="noreferrer" className={styles.mobileAddressLink}>
                {SITE_ADDRESS_LINE},
                <br />
                {SITE_ADDRESS_CITY}
              </a>
            </p>

            <div className={styles.mobileContactCol}>
              <p className={styles.mobileTitle}>Contacto</p>
              <div className={styles.mobileIcons}>
                <a
                  href={SITE_WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp ${SITE_WHATSAPP_DISPLAY}`}
                  className={styles.mobileIconLink}
                >
                  <img src="/figma/mqiw4743-qw026m5.svg" alt="" className={styles.mobileIcon} />
                </a>
                <a
                  href={SITE_INSTAGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram La Toma Multiespacio"
                  className={styles.mobileIconLink}
                >
                  <img src="/figma/mqiw474t-eeiyuvu.svg" alt="" className={styles.mobileIcon} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.mobileDivider} />

          <div className={styles.mobileLegalLinks}>
            <Link to="/privacidad" className={styles.mobileLegalLink}>
              Políticas de privacidad
            </Link>
            <Link to="/terminos" className={styles.mobileLegalLink}>
              Términos y Condiciones
            </Link>
          </div>

          <p className={styles.mobileCopyright}>©2026 La Toma Multiespacio. Corrientes, ARG.</p>
          <p className={styles.mobileCredit}>
            Diseñado por{" "}
            <a href="https://vektra.digital" target="_blank" rel="noreferrer" className={styles.creditLink}>
              Vektra Digital
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
