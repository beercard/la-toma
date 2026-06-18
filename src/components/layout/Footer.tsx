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
            />

            <div className={styles.stack104}>
              <a href="#" className={styles.legalLink}>
                Políticas de privacidad
              </a>
            </div>

            <div className={styles.stack20}>
              <a href="#" className={styles.legalLink}>
                Términos y Condiciones
              </a>
            </div>

            <div className={styles.stack20}>
              <div className={styles.legalText}>©2026 La Toma Multiespacio. Corrientes, ARG.</div>
            </div>
          </div>

          <div className={styles.desktopColumn}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <div className={styles.bodyText}>
              Punta San Sebastián
              <br />
              <br />
              Av. Costanera Gral. San Martín
              <br />
              Corrientes Capital, ARG.
            </div>
            <div className={styles.stack18}>
              <a href="#" className={styles.mapLink}>
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
              <a href="#" className={styles.footerMenuLink}>
                Instagram
              </a>
              <br />
              <br />
              <a href="#" className={styles.footerMenuLink}>
                WhatsApp
              </a>
              <br />
              <br />
              <a href="#" className={styles.footerMenuLink}>
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
              <span className={styles.mobileAddressStrong}>Punta San Sebastián.</span>
              <br />
              <br />
              <a href="#" className={styles.mobileAddressLink}>
                Av. Costanera Gral. San Martín,
                <br />
                Corrientes Capital.
              </a>
            </p>

            <div className={styles.mobileContactCol}>
              <p className={styles.mobileTitle}>Contacto</p>
              <div className={styles.mobileIcons}>
                <a href="#" aria-label="Instagram" className={styles.mobileIconLink}>
                  <img src="/figma/mqiw4743-qw026m5.svg" alt="" className={styles.mobileIcon} />
                </a>
                <a href="#" aria-label="WhatsApp" className={styles.mobileIconLink}>
                  <img src="/figma/mqiw474t-eeiyuvu.svg" alt="" className={styles.mobileIcon} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.mobileDivider} />

          <p className={styles.mobileCopyright}>©2026 La Toma Multiespacio. Corrientes, ARG.</p>
        </div>
      </footer>
    </>
  );
}
