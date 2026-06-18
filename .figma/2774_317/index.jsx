import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.rectangle6}>
      <div className={styles.autoWrapper}>
        <img src="../image/mqiw30lw-y7bu4mh.png" className={styles.image7} />
        <p className={styles.polTicasDePrivacidad}>Políticas de privacidad</p>
        <p className={styles.tRminosYCondiciones}>Términos y Condiciones</p>
        <p className={styles.a2026LaTomaMultiespa}>
          ©2026 La Toma Multiespacio. Corrientes, ARG.
        </p>
      </div>
      <div className={styles.autoWrapper2}>
        <p className={styles.contacto}>Contacto</p>
        <p className={styles.puntaSanSebastiNAvCo3}>
          <span className={styles.puntaSanSebastiNAvCo}>
            Punta San Sebastián
            <br />
            <br />
            Av. Costanera Gral. San Martín Corrientes Capital, ARG.
            <br />
          </span>
          <span className={styles.puntaSanSebastiNAvCo2}>
            <br />
            Ver en el mapa
          </span>
        </p>
      </div>
      <div className={styles.autoWrapper3}>
        <p className={styles.reserasYHorarios}>Reseras y horarios</p>
        <p className={styles.juevesYViernes180002}>
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
        </p>
      </div>
      <div className={styles.autoWrapper4}>
        <p className={styles.comunidad}>Comunidad</p>
        <p className={styles.instagramWhatsAppCor}>
          Instagram
          <br />
          <br />
          WhatsApp
          <br />
          <br />
          Correo electrónico
        </p>
      </div>
    </div>
  );
}

export default Component;
