import { CSSProperties, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { useGallery } from "../hooks/useContent";
import { SITE_INSTAGRAM_LINK } from "../lib/siteConfig";
import { getGalleryComingSoonEnabled } from "../lib/content/api";
import styles from "./Gallery.module.css";

const DESKTOP_PREVIEW_COUNT = 6;
const MOBILE_PREVIEW_COUNT = 4;

export default function Gallery() {
  const galleryImages = useGallery();
  const [mobileHeroScale, setMobileHeroScale] = useState(1);
  const [galleryComingSoon, setGalleryComingSoon] = useState(true);
  const [showMoreDesktopImages, setShowMoreDesktopImages] = useState(false);
  const [showMoreMobileImages, setShowMoreMobileImages] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxGallery, setLightboxGallery] = useState<"desktop" | "mobile" | null>(null);
  const shouldShowGalleryPlaceholder = galleryComingSoon || galleryImages.length === 0;
  const visibleGalleryImages = shouldShowGalleryPlaceholder ? [] : galleryImages;

  const allDesktopGalleryImages = useMemo(
    () =>
      showMoreDesktopImages
        ? visibleGalleryImages
        : visibleGalleryImages.slice(0, DESKTOP_PREVIEW_COUNT),
    [showMoreDesktopImages, visibleGalleryImages],
  );

  const allMobileGalleryImages = useMemo(
    () =>
      showMoreMobileImages
        ? visibleGalleryImages
        : visibleGalleryImages.slice(0, MOBILE_PREVIEW_COUNT),
    [showMoreMobileImages, visibleGalleryImages],
  );

  const hasMoreDesktop = visibleGalleryImages.length > DESKTOP_PREVIEW_COUNT;
  const hasMoreMobile = visibleGalleryImages.length > MOBILE_PREVIEW_COUNT;

  const activeLightboxImages = lightboxGallery === "mobile" ? allMobileGalleryImages : allDesktopGalleryImages;

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
    let active = true;

    getGalleryComingSoonEnabled()
      .then((value) => {
        if (active) setGalleryComingSoon(value);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((currentIndex) =>
          currentIndex === null ? 0 : (currentIndex + 1) % activeLightboxImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? 0
            : (currentIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLightboxImages.length, lightboxIndex]);

  const openLightbox = (gallery: "desktop" | "mobile", index: number) => {
    setLightboxGallery(gallery);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxGallery(null);
    setLightboxIndex(null);
  };

  const showPreviousLightboxImage = () => {
    setLightboxIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length,
    );
  };

  const showNextLightboxImage = () => {
    setLightboxIndex((currentIndex) =>
      currentIndex === null ? 0 : (currentIndex + 1) % activeLightboxImages.length,
    );
  };

  const handleLightboxControlKeyDown =
    (callback: () => void) => (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        callback();
      }
    };

  return (
    <>
      <p className="sr-only">
        Galería de La Toma, restobar en la Costanera de Corrientes Capital con fotos de noches, encuentros,
        gastronomía, eventos y experiencias frente al río.
      </p>

      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="gallery-desktop-title">
          <div className={styles.desktopHeroFrame}>
            <img
              src="/figma/mqlhuvgx-vc6gkez.png"
              alt="Fotografías de encuentros en La Toma, restobar en Corrientes Capital"
              className={styles.desktopHeroImage}
            />

            <h1 id="gallery-desktop-title" className={styles.desktopHeroTitle}>
              GALERÍA
            </h1>

            <div className={styles.desktopHeroBand}>
              <p className={styles.desktopHeroText}>
                El registro de lo que ocurre cuando el
                <br />
                espacio y la buena compañía coinciden.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.desktopContentSection}>
          <p className={styles.desktopIntro}>Repasá los momentos de nuestras últimas noches en Corrientes</p>

          <div className={styles.desktopTagStrip}>
            <p className={styles.desktopTag}>APERTURA</p>
          </div>

          {allDesktopGalleryImages.length > 0 ? (
            <>
              <div className={styles.desktopGrid}>
                {allDesktopGalleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={styles.desktopGridButton}
                    onClick={() => openLightbox("desktop", index)}
                    aria-label={`Abrir ${image.alt.toLowerCase()} en pantalla completa`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={styles.desktopGridImage}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>

              {hasMoreDesktop && !showMoreDesktopImages ? (
                <button
                  type="button"
                  className={styles.desktopMoreLink}
                  onClick={() => setShowMoreDesktopImages(true)}
                >
                  Ver más imagenes
                </button>
              ) : null}
            </>
          ) : (
            <div className={styles.desktopPlaceholder}>
              <p className={styles.desktopPlaceholderText}>
                Próximamente...
                <br />
                Más novedades desde nuestro{" "}
                <a
                  href={SITE_INSTAGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.placeholderInstagramLink}
                >
                  Instagram
                </a>
              </p>
            </div>
          )}
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="gallery-mobile-title"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroBackground}>
              <p className={styles.mobileHeroText}>
                El registro de lo que ocurre
                <br />
                cuando el espacio y la buena
                <br />
                compañía coinciden.
              </p>
            </div>

            <img
              src="/figma/mqli5ps1-f7cozb3.png"
              alt="Fotografías de encuentros en La Toma, restobar en Corrientes Capital"
              className={styles.mobileHeroImage}
            />

            <h1 id="gallery-mobile-title" className={styles.mobileHeroTitle}>
              GALERÍA
            </h1>
          </div>
        </section>

        <section className={styles.mobileContentSection}>
          <p className={styles.mobileIntro}>Repasá los momentos de nuestras últimas noches en Corrientes</p>

          <div className={styles.mobileTagStrip}>
            <p className={styles.mobileTag}>APERTURA</p>
          </div>

          {allMobileGalleryImages.length > 0 ? (
            <>
              <div className={styles.mobileGrid}>
                {allMobileGalleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={styles.mobileGridButton}
                    onClick={() => openLightbox("mobile", index)}
                    aria-label={`Abrir ${image.alt.toLowerCase()} en pantalla completa`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={styles.mobileGridImage}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>

              {hasMoreMobile && !showMoreMobileImages ? (
                <button
                  type="button"
                  className={styles.mobileMoreLink}
                  onClick={() => setShowMoreMobileImages(true)}
                >
                  Ver más imagenes
                </button>
              ) : null}
            </>
          ) : (
            <div className={styles.mobilePlaceholder}>
              <p className={styles.mobilePlaceholderText}>
                Próximamente...
                <br />
                Más novedades desde nuestro{" "}
                <a
                  href={SITE_INSTAGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.placeholderInstagramLink}
                >
                  Instagram
                </a>
              </p>
            </div>
          )}
        </section>
      </div>

      {lightboxIndex !== null ? (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Visor de imágenes">
          <button
            type="button"
            className={styles.lightboxBackdrop}
            aria-label="Cerrar visor"
            onClick={closeLightbox}
          />

          <div className={styles.lightboxContent}>
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={showPreviousLightboxImage}
              onKeyDown={handleLightboxControlKeyDown(showPreviousLightboxImage)}
              aria-label="Imagen anterior"
            >
              <span className={styles.lightboxArrowIcon} aria-hidden="true">
                &#8249;
              </span>
            </button>

            <div className={styles.lightboxFigure}>
              <img
                key={activeLightboxImages[lightboxIndex].src}
                src={activeLightboxImages[lightboxIndex].src}
                alt={activeLightboxImages[lightboxIndex].alt}
                className={styles.lightboxImage}
              />
            </div>

            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={showNextLightboxImage}
              onKeyDown={handleLightboxControlKeyDown(showNextLightboxImage)}
              aria-label="Imagen siguiente"
            >
              <span className={styles.lightboxArrowIcon} aria-hidden="true">
                &#8250;
              </span>
            </button>

            <button
              type="button"
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Cerrar visor"
            >
              &#10005;
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
