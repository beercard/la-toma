import { useLocation } from "react-router-dom";
import { SITE_WHATSAPP_NUMBER } from "../../lib/siteConfig";
import { withPublicBaseUrl } from "../../lib/publicBaseUrl";
import styles from "./FloatingWhatsappButton.module.css";

export default function FloatingWhatsappButton() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const message = "Hola, quiero reservar una mesa.";
  const whatsappUrl = `https://wa.me/${SITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp La Toma: reservar una mesa"
      className={styles.button}
    >
      <img src={withPublicBaseUrl("images/icon-whatsapp.svg")} alt="" className={styles.icon} />
    </a>
  );
}
