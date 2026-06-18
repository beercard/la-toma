import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <p className={styles.eScaladesktopPantall}>
      ESCALA DESKTOP (Pantalla 1440px)
      <br />
      Menú Navegación Superior: 16px (Mundial Medium).
      <br />
      H1 (Títulos Hero): 48px (Mundial Medium/Bold).
      <br />
      H2 (Títulos de Sección): 36px (Mundial Medium).
      <br />
      H3 (Títulos Tarjetas/Eventos): 24px (Mundial Medium).
      <br />P (Párrafos): 16px (Roboto Serif Regular). Interlineado 150%.
      <br />
      Botones y Etiquetas: 12px (Mundial Bold). Todo en mayúsculas, letter-spacing
      +1px.
      <br />
      Footer (Logos/Títulos): 20px (Mundial Bold).
      <br />
      Footer (Textos Legales/Dirección): 14px (Roboto Serif Regular).
    </p>
  );
}

export default Component;
