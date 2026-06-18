import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <p className={styles.eScalamobilePantalla}>
      ESCALA MOBILE (Pantalla 390px)
      <br />
      Menú Hamburguesa (Links): 20px (Mundial Medium).
      <br />
      H1 (Títulos Hero): 28px (Mundial Medium/Bold). Interlineado 115%.
      <br />
      H2 (Títulos de Sección): 24px (Mundial Medium). Interlineado 120%.
      <br />
      H3 (Títulos Tarjetas/Eventos): 18px (Mundial Medium).
      <br />P (Párrafos): 14px (Roboto Serif Regular). Interlineado 150%. Alerta de
      legibilidad: estás en el límite absoluto.
      <br />
      Botones y Etiquetas: 10px (Mundial Bold). Todo en mayúsculas, letter-spacing
      +1px.
      <br />
      Footer (Logos/Títulos): 16px (Mundial Bold).
      <br />
      Footer (Textos Legales/Dirección): 12px (Roboto Serif Regular).
    </p>
  );
}

export default Component;
