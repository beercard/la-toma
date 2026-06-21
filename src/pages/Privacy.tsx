import { SITE_EMAIL, SITE_INSTAGRAM_LINK } from "../lib/siteConfig";
import styles from "./Legal.module.css";

export default function Privacy() {
  return (
    <div className={styles.page}>
      <article className={styles.inner}>
        <p className={styles.eyebrow}>La Toma Multiespacio</p>
        <h1 className={styles.title}>Políticas de privacidad</h1>
        <p className={styles.updated}>Última actualización: enero de 2026</p>

        <section className={styles.section}>
          <p className={styles.paragraph}>
            En La Toma Multiespacio respetamos tu privacidad y nos comprometemos a proteger los datos
            personales que compartís con nosotros a través de este sitio web. Esta política explica qué
            información recopilamos, con qué fin y cómo la resguardamos.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Datos que recopilamos</h2>
          <ul className={styles.list}>
            <li>Datos de contacto que ingresás en los formularios de reservas y eventos (nombre, correo, teléfono).</li>
            <li>Detalles de tu solicitud (fecha, horario, cantidad de personas, tipo de evento y comentarios).</li>
            <li>Datos técnicos básicos de navegación recopilados de forma anónima para mejorar el sitio.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Uso de la información</h2>
          <p className={styles.paragraph}>
            Utilizamos tus datos únicamente para gestionar reservas, coordinar eventos y responder tus
            consultas. No vendemos ni cedemos tu información a terceros con fines comerciales.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Conservación y seguridad</h2>
          <p className={styles.paragraph}>
            Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad por la que
            fueron recopilados y aplicamos medidas razonables para protegerlos frente a accesos no
            autorizados.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tus derechos</h2>
          <p className={styles.paragraph}>
            Podés solicitar el acceso, la rectificación o la eliminación de tus datos personales en
            cualquier momento escribiéndonos a{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>. También podés contactarnos a través de
            nuestro <a href={SITE_INSTAGRAM_LINK} target="_blank" rel="noreferrer">Instagram</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
