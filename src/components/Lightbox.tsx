import { useEffect } from "react";
import styles from "./Lightbox.module.css";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, images.length, onClose, onChange]);

  if (index === null || !images[index]) return null;

  const image = images[index];
  const showArrows = images.length > 1;

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Visor de imágenes">
      <button type="button" className={styles.backdrop} aria-label="Cerrar visor" onClick={onClose} />

      <div className={styles.content}>
        {showArrows ? (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => onChange((index - 1 + images.length) % images.length)}
            aria-label="Imagen anterior"
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
        ) : null}

        <div className={styles.figure}>
          <img key={image.src} src={image.src} alt={image.alt} className={styles.image} />
        </div>

        {showArrows ? (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => onChange((index + 1) % images.length)}
            aria-label="Imagen siguiente"
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        ) : null}

        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar visor">
          &#10005;
        </button>
      </div>
    </div>
  );
}
