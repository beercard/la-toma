import { CSSProperties, useEffect, useState } from "react";
import { useCarta } from "../hooks/useContent";
import styles from "./Menu.module.css";

export default function Menu() {
  const menuCategories = useCarta();
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

  return (
    <>
      <p className="sr-only">
        Café Bar La Toma en la Costanera de Corrientes Capital, un espacio frente al río para desayunos,
        meriendas, encuentros y experiencias gastronómicas.
      </p>

      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="cafe-bar-desktop-title">
          <div className={styles.desktopHeroFrame}>
            <div className={styles.desktopHeroBackground} />
            <img
              src="/figma/mqmruuq4-02y5vq5.png"
              alt=""
              className={styles.desktopHeroImage}
            />
            <img
              src="/figma/mqmruuq4-a2xv23f.png"
              alt="La Toma"
              className={styles.desktopHeroLogo}
            />
            <h1 id="cafe-bar-desktop-title" className={styles.desktopHeroTitle}>
              CAFÉ BAR
            </h1>
          </div>
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="cafe-bar-mobile-title"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroBackground} />
            <img
              src="/figma/mqmrvea4-vn3fpu8.png"
              alt=""
              className={styles.mobileHeroImage}
            />
            <img
              src="/figma/mqmrvea4-vrqjny0.png"
              alt="La Toma"
              className={styles.mobileHeroLogo}
            />
            <h1 id="cafe-bar-mobile-title" className={styles.mobileHeroTitle}>
              CAFÉ BAR
            </h1>
          </div>
        </section>
      </div>

      <section className={styles.carta} aria-labelledby="carta-title">
        <div className={styles.cartaInner}>
          <p className={styles.cartaEyebrow}>Café Bar · Costanera de Corrientes</p>
          <h2 id="carta-title" className={styles.cartaTitle}>
            Nuestra Carta
          </h2>
          <p className={styles.cartaIntro}>
            Una selección pensada para acompañar cada momento del día, del primer café al brindis del
            atardecer.
          </p>

          <div className={styles.cartaGrid}>
            {menuCategories.map((category) => (
              <div key={category.title} className={styles.cartaCategory}>
                <h3 className={styles.cartaCategoryTitle}>{category.title}</h3>
                <ul className={styles.cartaItems}>
                  {category.items.map((item) => (
                    <li key={item.name} className={styles.cartaItem}>
                      <div className={styles.cartaItemHead}>
                        <span className={styles.cartaItemName}>{item.name}</span>
                        {item.price ? <span className={styles.cartaItemPrice}>{item.price}</span> : null}
                      </div>
                      {item.description ? (
                        <p className={styles.cartaItemDescription}>{item.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className={styles.cartaNote}>
            * Carta sujeta a disponibilidad. Los precios pueden variar.
          </p>
        </div>
      </section>
    </>
  );
}
