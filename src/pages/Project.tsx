import { CSSProperties, useEffect, useState } from "react";
import { SITE_INSTAGRAM_LINK } from "../lib/siteConfig";
import styles from "./Project.module.css";

const desktopSlides = [
  "/figma/mqk7ns47-64iua53.png",
  "/figma/mqk7o90b-9w6vzsg.png",
  "/figma/mqk7o90b-ft3rc1l.png",
];

const mobileSlides = [
  "/figma/mqk7o90b-6n812il.png",
  "/figma/mqk7o90b-9w6vzsg.png",
  "/figma/mqk7o90b-ft3rc1l.png",
];

export default function Project() {
  const [mobileHeroScale, setMobileHeroScale] = useState(1);
  const [desktopSlideIndex, setDesktopSlideIndex] = useState(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(1);

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDesktopSlideIndex((current) => (current + 1) % desktopSlides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const previousDesktopSlide = () => {
    setDesktopSlideIndex((current) => (current - 1 + desktopSlides.length) % desktopSlides.length);
  };

  const nextDesktopSlide = () => {
    setDesktopSlideIndex((current) => (current + 1) % desktopSlides.length);
  };

  const previousMobileSlide = () => {
    setMobileSlideIndex((current) => (current - 1 + mobileSlides.length) % mobileSlides.length);
  };

  const nextMobileSlide = () => {
    setMobileSlideIndex((current) => (current + 1) % mobileSlides.length);
  };

  const mobilePreviousPreview = mobileSlides[(mobileSlideIndex - 1 + mobileSlides.length) % mobileSlides.length];
  const mobileCurrentSlide = mobileSlides[mobileSlideIndex];
  const mobileNextPreview = mobileSlides[(mobileSlideIndex + 1) % mobileSlides.length];

  return (
    <>
      <p className="sr-only">
        Conocé el proyecto de La Toma, restobar y multiespacio en la Costanera de Corrientes Capital con
        arquitectura industrial, historia, gastronomía y eventos frente al río.
      </p>

      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="project-desktop-title">
          <div className={styles.desktopHeroFrame}>
            <img
              src="/figma/mqk7ns4c-vgwje34.png"
              alt="Arquitectura de La Toma en la Costanera de Corrientes Capital"
              className={styles.desktopHeroImage}
            />

            <h1 id="project-desktop-title" className={styles.desktopHeroTitle}>
              EL PROYECTO
            </h1>

            <div className={styles.desktopHeroBand}>
              <p className={styles.desktopHeroText}>
                Arquitectura industrial, historia
                <br />
                y versatilidad frente al río.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.desktopContentSection}>
          <div className={styles.desktopContentInner}>
            <div className={styles.desktopCopy}>
              <h2 className={styles.desktopSectionTitle}>El punto de partida</h2>
              <p className={styles.desktopSectionBody}>
                Un nuevo ecosistema de gastronomía,
                <br />
                cultura y eventos está tomando forma.
                <br />
                <br />
                Se gesta una experiencia nueva en la
                <br />
                costanera Correntina.
              </p>
            </div>

            <div className={styles.desktopCarouselColumn}>
              <div className={styles.desktopGallery}>
                <button
                  type="button"
                  className={[styles.desktopArrowButton, styles.desktopArrowButtonLeft].join(" ")}
                  aria-label="Anterior"
                  onClick={previousDesktopSlide}
                >
                  <img
                    src="/figma/mqk7ns48-trbfd24.png"
                    alt=""
                    className={[styles.desktopArrow, styles.desktopArrowLeft].join(" ")}
                  />
                </button>

                <img
                  key={`desktop-slide-${desktopSlideIndex}`}
                  src={desktopSlides[desktopSlideIndex]}
                  alt="Vista del proyecto gastronómico de La Toma en Corrientes Capital"
                  className={[styles.desktopGalleryImage, styles.desktopGalleryImageAnimated].join(" ")}
                />

                <button
                  type="button"
                  className={[styles.desktopArrowButton, styles.desktopArrowButtonRight].join(" ")}
                  aria-label="Siguiente"
                  onClick={nextDesktopSlide}
                >
                  <img
                    src="/figma/mqk7ns48-p8snc42.png"
                    alt=""
                    className={[styles.desktopArrow, styles.desktopArrowRight].join(" ")}
                  />
                </button>
              </div>

              <div className={styles.desktopDots}>
                {desktopSlides.map((_, index) => (
                  <button
                    key={`desktop-dot-${index}`}
                    type="button"
                    className={[styles.dotButton, index === desktopSlideIndex ? styles.dotActive : ""].join(" ")}
                    aria-label={`Ir a la imagen ${index + 1}`}
                    onClick={() => setDesktopSlideIndex(index)}
                  >
                    <span className={styles.dot} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.desktopInstagramStrip}>
          <p className={styles.desktopInstagramText}>
            Próximamente más novedades
            <br />
            desde nuestro{" "}
            <a href={SITE_INSTAGRAM_LINK} target="_blank" rel="noreferrer" className={styles.instagramLink}>
              Instagram
            </a>
          </p>
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="project-mobile-title"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroBackground} />
            <img
              src="/figma/mqk7o90h-3iuvyqb.png"
              alt="Arquitectura de La Toma en la Costanera de Corrientes Capital"
              className={styles.mobileHeroImage}
            />

            <h1 id="project-mobile-title" className={styles.mobileHeroTitle}>
              EL PROYECTO
            </h1>

            <p className={styles.mobileHeroText}>
              Arquitectura industrial, historia
              <br />
              y versatilidad frente al río.
            </p>
          </div>
        </section>

        <section className={styles.mobileContentSection}>
          <h2 className={styles.mobileSectionTitle}>El punto de partida</h2>
          <p className={styles.mobileSectionBody}>
            Un nuevo ecosistema de gastronomía,
            <br />
            cultura y eventos está tomando forma.
            <br />
            <br />
            Se gesta una experiencia nueva en la
            <br />
            costanera Correntina.
          </p>

          <div className={styles.mobileGallery}>
            <button
              type="button"
              className={[styles.mobileArrowButton, styles.mobileArrowLeft].join(" ")}
              aria-label="Anterior"
              onClick={previousMobileSlide}
            >
              <span className={[styles.mobileChevron, styles.mobileChevronLeft].join(" ")} />
            </button>

            <img
              key={`mobile-left-${mobilePreviousPreview}`}
              src={mobilePreviousPreview}
              alt=""
              className={[
                styles.mobileGalleryImage,
                styles.mobileGallerySide,
                styles.mobileGalleryLeft,
                styles.mobileGalleryImageAnimated,
              ].join(" ")}
            />
            <img
              key={`mobile-center-${mobileCurrentSlide}`}
              src={mobileCurrentSlide}
              alt="Vista del proyecto gastronómico de La Toma en Corrientes Capital"
              className={[
                styles.mobileGalleryImage,
                styles.mobileGalleryCenter,
                styles.mobileGalleryCenterActive,
                styles.mobileGalleryImageAnimated,
              ].join(" ")}
            />
            <img
              key={`mobile-right-${mobileNextPreview}`}
              src={mobileNextPreview}
              alt=""
              className={[
                styles.mobileGalleryImage,
                styles.mobileGallerySide,
                styles.mobileGalleryRight,
                styles.mobileGalleryImageAnimated,
              ].join(" ")}
            />

            <button
              type="button"
              className={[styles.mobileArrowButton, styles.mobileArrowRight].join(" ")}
              aria-label="Siguiente"
              onClick={nextMobileSlide}
            >
              <span className={[styles.mobileChevron, styles.mobileChevronRight].join(" ")} />
            </button>
          </div>

          <p className={styles.mobileInstagramText}>
            Próximamente más novedades
            <br />
            desde nuestro{" "}
            <a href={SITE_INSTAGRAM_LINK} target="_blank" rel="noreferrer" className={styles.instagramLink}>
              Instagram
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
