import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <p className={styles.bOtonesmobileAltoTot}>
      BOTONES MOBILE
      <br />
      Alto total (Height): 44px. (Mínimo absoluto de usabilidad táctil).
      <br />
      Padding Horizontal (Márgenes laterales internos): 20px.
      <br />
      Tipografía interna: Mundial Bold, 10px, todo en MAYÚSCULAS (+1px
      letter-spacing).
      <br />
      Esquinas (Border Radius): 0px o máximo 2px.
    </p>
  );
}

export default Component;
