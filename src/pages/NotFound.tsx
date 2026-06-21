import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-labelledby="notfound-title">
      <p className={styles.eyebrow}>Error 404</p>
      <p className={styles.code} aria-hidden="true">404</p>
      <h1 id="notfound-title" className={styles.title}>
        Esta página se perdió frente al río
      </h1>
      <p className={styles.text}>
        La página que buscás no existe o cambió de lugar. Volvé al inicio y seguí recorriendo La Toma.
      </p>

      <Link to="/" className={styles.button}>
        <span className={styles.buttonLabel}>Volver al inicio</span>
      </Link>

      <nav className={styles.links} aria-label="Enlaces útiles">
        <Link to="/menu">Café Bar</Link>
        <Link to="/reservas">Reservas</Link>
        <Link to="/eventos">Eventos</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
    </section>
  );
}
