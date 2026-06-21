import { SITE_EMAIL } from "../lib/siteConfig";
import styles from "./Legal.module.css";

export default function Terms() {
  return (
    <div className={styles.page}>
      <article className={styles.inner}>
        <p className={styles.eyebrow}>La Toma Multiespacio</p>
        <h1 className={styles.title}>Términos y Condiciones</h1>
        <p className={styles.updated}>Última actualización: enero de 2026</p>

        <section className={styles.section}>
          <p className={styles.paragraph}>
            El uso de este sitio web implica la aceptación de los presentes términos y condiciones. Te
            pedimos que los leas con atención antes de utilizar nuestros servicios de reservas y eventos.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Reservas</h2>
          <p className={styles.paragraph}>
            Las solicitudes realizadas a través del sitio constituyen un pedido de reserva y quedan
            sujetas a confirmación por parte de nuestro equipo. Una reserva se considera confirmada
            únicamente cuando recibís nuestra respuesta por WhatsApp o correo electrónico.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Eventos</h2>
          <p className={styles.paragraph}>
            Las consultas de eventos sociales y corporativos se coordinan de manera personalizada. Las
            condiciones particulares de cada evento (capacidad, gastronomía, horarios y políticas de
            cancelación) se acuerdan por escrito previo a su confirmación.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Propiedad intelectual</h2>
          <p className={styles.paragraph}>
            Los contenidos, marcas, imágenes y textos de este sitio pertenecen a La Toma Multiespacio y
            no pueden ser reproducidos sin autorización previa.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contacto</h2>
          <p className={styles.paragraph}>
            Ante cualquier duda sobre estos términos podés escribirnos a{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
