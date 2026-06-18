import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <p className={styles.bOtonesdesktopWebDeC}>
      BOTONES DESKTOP (Web de computadora)
      <br />
      Alto total (Height): 40px. (Acá sí podés achicar la caja porque el cursor del
      mouse es preciso).
      <br />
      Padding Horizontal (Márgenes laterales internos): 24px.
      <br />
      Tipografía interna: Mundial Bold, 12px, todo en MAYÚSCULAS (+1px
      letter-spacing).
      <br />
      Esquinas (Border Radius): 0px o máximo 2px.
    </p>
  );
}

export default Component;
