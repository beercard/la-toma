import { CSSProperties, FormEvent, useEffect, useState } from "react";
import styles from "./Reservations.module.css";

interface ReservationFormData {
  fullName: string;
  guests: string;
  date: string;
  time: string;
}

const initialFormData: ReservationFormData = {
  fullName: "",
  guests: "",
  date: "",
  time: "",
};

const WHATSAPP_PHONE = "5493624101277";

export default function Reservations() {
  const [formData, setFormData] = useState<ReservationFormData>(initialFormData);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Hola La Toma, quiero solicitar una reserva.",
      "",
      `Nombre y Apellido: ${formData.fullName}`,
      `Cantidad de personas: ${formData.guests}`,
      `Fecha: ${formData.date}`,
      `Horario: ${formData.time}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="reservas-heading-desktop">
          <div className={styles.desktopHeroFrame}>
            <img
              src="/figma/mqjy0b1r-16uejlf.png"
              alt="Mesa servida en La Toma"
              className={styles.desktopHeroImage}
            />

            <h1 id="reservas-heading-desktop" className={styles.desktopHeroTitle}>
              RESERVAS
            </h1>

            <div className={styles.desktopHeroBand}>
              <p className={styles.desktopHeroText}>
                Estamos a disposición para gestionar tu
                <br />
                reserva de manera directa y personalizada.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.desktopFormSection} aria-labelledby="reservas-form-title-desktop">
          <h2 id="reservas-form-title-desktop" className={styles.desktopFormTitle}>
            Dejanos tus datos y te contactaremos
          </h2>

          <form className={styles.desktopForm} onSubmit={handleSubmit}>
            <div className={styles.desktopFieldGrid}>
              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Nombre y Apellido</span>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Cantidad de personas</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.guests}
                  onChange={(event) => setFormData((prev) => ({ ...prev, guests: event.target.value }))}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Fecha</span>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Horario</span>
                <input
                  type="text"
                  required
                  value={formData.time}
                  onChange={(event) => setFormData((prev) => ({ ...prev, time: event.target.value }))}
                  className={styles.desktopInput}
                />
              </label>
            </div>

            <div className={styles.desktopButtonRow}>
              <button type="submit" className={styles.desktopButton}>
                Enviar solicitud
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="reservas-heading-mobile"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <img
              src="/figma/mqjybg8o-4ennzii.png"
              alt="Mesa servida en La Toma"
              className={styles.mobileHeroImage}
            />

            <h1 id="reservas-heading-mobile" className={styles.mobileHeroTitle}>
              RESERVAS
            </h1>

            <p className={styles.mobileHeroEyebrow}>TE ESPERAMOS</p>
            <p className={styles.mobileHeroText}>
              Estamos a disposición
              <br />
              para gestionar tu reserva
              <br />
              de manera directa y
              <br />
              personalizada.
            </p>
          </div>
        </section>

        <section className={styles.mobileFormSection} aria-labelledby="reservas-form-title-mobile">
          <h2 id="reservas-form-title-mobile" className={styles.mobileFormTitle}>
            TU MESA EN LA TOMA
          </h2>

          <form className={styles.mobileForm} onSubmit={handleSubmit}>
            <div className={styles.mobileFieldLayer}>
              <label className={[styles.mobileField, styles.mobileFieldName].join(" ")}>
                <span className={styles.mobileLabel}>Nombre y Apellido</span>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                  className={styles.mobileInput}
                />
              </label>

              <label className={[styles.mobileField, styles.mobileFieldGuests].join(" ")}>
                <span className={styles.mobileLabel}>Cantidad de personas</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.guests}
                  onChange={(event) => setFormData((prev) => ({ ...prev, guests: event.target.value }))}
                  className={styles.mobileInput}
                />
              </label>

              <label className={[styles.mobileField, styles.mobileFieldDate].join(" ")}>
                <span className={styles.mobileLabel}>Fecha</span>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
                  className={styles.mobileInput}
                />
              </label>

              <label className={[styles.mobileField, styles.mobileFieldTime].join(" ")}>
                <span className={styles.mobileLabel}>Horario</span>
                <input
                  type="text"
                  required
                  value={formData.time}
                  onChange={(event) => setFormData((prev) => ({ ...prev, time: event.target.value }))}
                  className={styles.mobileInput}
                />
              </label>
            </div>

            <div className={styles.mobileButtonRow}>
              <button type="submit" className={styles.mobileButton}>
                Enviar solicitud
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
