import { FormEvent, useState } from "react";
import styles from "./Admin.module.css";

interface LoginProps {
  onSignIn: (email: string, password: string) => Promise<void>;
}

export default function Login({ onSignIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSignIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <h1 className={styles.loginTitle}>La Toma · Panel</h1>
        <p className={styles.loginSub}>Ingresá para gestionar la galería, los eventos y la carta.</p>

        {error ? <div className={`${styles.notice} ${styles.noticeError}`}>{error}</div> : null}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="admin-email">Correo</label>
          <input
            id="admin-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="admin-password">Contraseña</label>
          <input
            id="admin-password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading} style={{ width: "100%" }}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
