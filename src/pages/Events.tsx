import { CSSProperties, ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { getAvailableTimeOptions } from "../lib/businessHours";
import { getEventsComingSoonEnabled } from "../lib/content/api";
import {
  buildEventsEmailHtml,
  buildEventsEmailSubject,
  buildEventsClientEmailHtml,
  buildEventsWhatsappMessage,
  type EventsEmailData,
} from "../lib/eventsEmailTemplate";
import { SITE_EVENTS_EMAIL, SITE_INSTAGRAM_LINK, SITE_WHATSAPP_NUMBER } from "../lib/siteConfig";
import { useEvents } from "../hooks/useContent";
import styles from "./Events.module.css";

type EventCard = {
  id: string;
  date: string;
  titleLines: string[];
  description: string;
  expandedDescription?: string;
  desktopClassName: string;
  mobileClassName: string;
};

interface EventFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  eventType: string;
  branch: string;
  date: string;
  time: string;
  guests: string;
  comments: string;
}

const EVENTS_EMAIL = SITE_EVENTS_EMAIL;

const initialFormData: EventFormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  eventType: "",
  branch: "",
  date: "",
  time: "",
  guests: "",
  comments: "",
};

const cardStyleClasses = [
  { desktop: styles.desktopCardVinilos, mobile: styles.mobileCardVinilos },
  { desktop: styles.desktopCardFiltrados, mobile: styles.mobileCardFiltrados },
  { desktop: styles.desktopCardAfterOffice, mobile: styles.mobileCardAfterOffice },
  { desktop: styles.desktopCardCeramica, mobile: styles.mobileCardCeramica },
];

const splitTitleLines = (title: string): string[] => {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

const getTodayDateValue = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (dateValue: string) => {
  if (!dateValue) return "";

  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return dateValue;
  return `${day}/${month}/${year}`;
};

const splitExpandedDescription = (text: string) => {
  const normalizedParagraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const firstParagraph = normalizedParagraphs[0] ?? text.trim();
  const leadMatch = firstParagraph.match(/^[^.?!]+[.?!]/);
  const lead = leadMatch?.[0]?.trim() ?? firstParagraph;
  const firstParagraphRemainder = firstParagraph.slice(lead.length).trim();
  const paragraphs = [firstParagraphRemainder, ...normalizedParagraphs.slice(1)].filter(Boolean);

  return {
    lead,
    paragraphs,
  };
};

const getCreatedAtValue = (createdAt?: string | null) => {
  if (!createdAt) return Number.NEGATIVE_INFINITY;
  const timestamp = Date.parse(createdAt);
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
};

export default function Events() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [mobileHeroScale, setMobileHeroScale] = useState(1);
  const [eventsComingSoon, setEventsComingSoon] = useState(true);
  const [activeDesktopCardId, setActiveDesktopCardId] = useState<string | null>(null);
  const [closingDesktopCardId, setClosingDesktopCardId] = useState<string | null>(null);
  const [activeMobileCardId, setActiveMobileCardId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const desktopCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desktopFormSectionRef = useRef<HTMLElement | null>(null);
  const mobileFormSectionRef = useRef<HTMLElement | null>(null);
  const availableTimeOptions = useMemo(() => getAvailableTimeOptions(formData.date), [formData.date]);

  const events = useEvents();
  const featuredEvents = useMemo(
    () =>
      events
        .map((event, index) => ({
          event,
          index,
          createdAtValue: getCreatedAtValue(event.createdAt),
        }))
        .sort((left, right) => {
          const createdAtDiff = right.createdAtValue - left.createdAtValue;
          if (createdAtDiff !== 0) return createdAtDiff;
          return left.index - right.index;
        })
        .slice(0, 4)
        .map(({ event }) => event),
    [events],
  );
  const eventCards = useMemo<EventCard[]>(
    () =>
      featuredEvents.map((event, index) => ({
        id: event.id,
        date: event.dateLabel ?? "",
        titleLines: splitTitleLines(event.title),
        description: event.description,
        expandedDescription: event.expandedDescription,
        desktopClassName: cardStyleClasses[index % cardStyleClasses.length].desktop,
        mobileClassName: cardStyleClasses[index % cardStyleClasses.length].mobile,
      })),
    [featuredEvents],
  );
  const eventTypeOptions = useMemo(() => eventCards.map((card) => card.titleLines.join(" ")), [eventCards]);
  const shouldShowEventsPlaceholder = eventsComingSoon || eventCards.length === 0;

  useEffect(() => {
    return () => {
      if (desktopCloseTimeoutRef.current) {
        clearTimeout(desktopCloseTimeoutRef.current);
      }
    };
  }, []);

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

    getEventsComingSoonEnabled()
      .then((value) => {
        if (active) setEventsComingSoon(value);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (formData.time && !availableTimeOptions.includes(formData.time)) {
      setFormData((current) => ({ ...current, time: "" }));
    }
  }, [availableTimeOptions, formData.time]);

  const updateField =
    (field: keyof EventFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const nextValue = event.target.value;

      setFormData((current) => ({
        ...current,
        [field]: nextValue,
        ...(field === "date" ? { time: "" } : {}),
      }));
    };

  const buildEmailRequestPayload = (data: EventsEmailData) => ({
    full_name: data.fullName,
    company: data.company || "-",
    email: data.email,
    phone: data.phone,
    event_type: data.eventType,
    branch: data.branch || "-",
    date: data.date,
    time: data.time,
    guests: data.guests,
    comments: data.comments || "-",
    admin_subject: buildEventsEmailSubject(data),
    admin_html: buildEventsEmailHtml(data, `${window.location.origin}/images/footer-logo.webp`),
    client_subject: "Recibimos tu consulta de eventos | La Toma",
    client_html: buildEventsClientEmailHtml(data, `${window.location.origin}/images/footer-logo.webp`),
  });

  const openWhatsapp = (data: EventsEmailData) => {
    const whatsappUrl = `https://wa.me/${SITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildEventsWhatsappMessage(data))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormFeedback(null);

    const currentData: EventsEmailData = {
      ...formData,
      date: formatDateForDisplay(formData.date),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/enviar-evento.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildEmailRequestPayload(currentData)),
      });

      const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || "No pudimos enviar la solicitud.");
      }

      setFormData(initialFormData);
      setFormFeedback({
        type: "success",
        message: "Solicitud enviada al equipo de eventos. Ya podes continuar tambien por WhatsApp.",
      });

      const continueToWhatsapp = window.confirm(
        "La solicitud se envio correctamente a eventos@latoma.com.ar. ¿Queres continuar tambien por WhatsApp?",
      );

      if (continueToWhatsapp) {
        openWhatsapp(currentData);
      }
    } catch {
      setFormFeedback({
        type: "error",
        message: "No pudimos enviar la solicitud. Podes continuar por WhatsApp y nos comunicamos con vos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDesktopCard = (cardId: string) => {
    if (desktopCloseTimeoutRef.current) {
      clearTimeout(desktopCloseTimeoutRef.current);
      desktopCloseTimeoutRef.current = null;
    }
    setClosingDesktopCardId(null);
    setActiveDesktopCardId(cardId);
  };

  const closeDesktopCard = () => {
    if (!activeDesktopCardId) return;

    setClosingDesktopCardId(activeDesktopCardId);
    desktopCloseTimeoutRef.current = setTimeout(() => {
      setActiveDesktopCardId(null);
      setClosingDesktopCardId(null);
      desktopCloseTimeoutRef.current = null;
    }, 300);
  };

  const reserveDesktopCard = (card: EventCard) => {
    setFormData((current) => ({
      ...current,
      eventType: card.titleLines.join(" "),
    }));
    closeDesktopCard();
    desktopFormSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openMobileCard = (cardId: string) => {
    setActiveMobileCardId(cardId);
  };

  const closeMobileCard = () => {
    setActiveMobileCardId(null);
  };

  const reserveMobileCard = (card: EventCard) => {
    setFormData((current) => ({
      ...current,
      eventType: card.titleLines.join(" "),
    }));
    setActiveMobileCardId(null);
    mobileFormSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeMobileCard = activeMobileCardId
    ? eventCards.find((card) => card.id === activeMobileCardId) ?? null
    : null;
  const activeDesktopCard = activeDesktopCardId
    ? eventCards.find((card) => card.id === activeDesktopCardId) ?? null
    : null;
  const desktopExpandedCopy = activeDesktopCard
    ? splitExpandedDescription(activeDesktopCard.expandedDescription ?? activeDesktopCard.description)
    : null;

  return (
    <>
      <p className="sr-only">
        Eventos en La Toma, espacio en la Costanera de Corrientes Capital para after office, encuentros
        sociales, eventos corporativos y celebraciones frente al río.
      </p>

      <div className={styles.desktopPage}>
        <section className={styles.desktopHero} aria-labelledby="events-desktop-title">
          <div className={styles.desktopHeroFrame}>
            <img
              src="/images/eventos-hero-desktop.png"
              alt="Brindis durante un evento en La Toma, Corrientes Capital"
              className={styles.desktopHeroImage}
            />
            <h1 id="events-desktop-title" className={styles.desktopHeroTitle}>
              EVENTOS
            </h1>
          </div>
        </section>

        <section className={styles.desktopEventsSection} aria-labelledby="events-desktop-list-title">
          <h2 id="events-desktop-list-title" className={styles.desktopSectionTitle}>
            Viví La Toma
          </h2>

          {shouldShowEventsPlaceholder ? (
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
          ) : (
            <div className={styles.desktopCardsStage}>
              <div className={styles.desktopCardsGrid}>
                {eventCards.map((card) => {
                  const isOpen = activeDesktopCardId === card.id;

                  return (
                    <article
                      key={card.id}
                      className={[
                        styles.desktopCard,
                        card.desktopClassName,
                        isOpen ? styles.desktopCardOpen : "",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        className={styles.desktopCardTrigger}
                        onClick={() => openDesktopCard(card.id)}
                        aria-expanded={isOpen}
                        aria-controls={`desktop-event-card-${card.id}`}
                        aria-label={`Abrir información de ${card.titleLines.join(" ")}`}
                      />

                      <div className={styles.desktopCardFront} aria-hidden={isOpen}>
                        <span className={styles.desktopCardDate}>{card.date}</span>
                        <span className={styles.desktopCardTitle}>
                          {card.titleLines.map((line) => (
                            <span key={line} className={styles.desktopCardTitleLine}>
                              {line}
                            </span>
                          ))}
                        </span>
                        <span className={styles.desktopCardInfo}>+ info</span>
                      </div>
                    </article>
                  );
                })}
              </div>

              {activeDesktopCard && desktopExpandedCopy ? (
                <article
                  id={`desktop-event-card-${activeDesktopCard.id}`}
                  className={[
                    styles.desktopExpandedPanel,
                    closingDesktopCardId === activeDesktopCard.id ? styles.desktopExpandedPanelClosing : "",
                  ].join(" ")}
                  aria-label={`Información ampliada de ${activeDesktopCard.titleLines.join(" ")}`}
                >
                  <div
                    className={[
                      styles.desktopExpandedMedia,
                      activeDesktopCard.desktopClassName,
                    ].join(" ")}
                  >
                    <div className={styles.desktopExpandedMediaContent}>
                      <span className={styles.desktopExpandedDate}>{activeDesktopCard.date}</span>
                      <span className={styles.desktopExpandedTitle}>
                        {activeDesktopCard.titleLines.map((line) => (
                          <span key={line} className={styles.desktopExpandedTitleLine}>
                            {line}
                          </span>
                        ))}
                      </span>

                      <button type="button" className={styles.desktopExpandedCloseButton} onClick={closeDesktopCard}>
                        Cerrar
                      </button>
                    </div>
                  </div>

                  <div className={styles.desktopExpandedBody}>
                    <div className={styles.desktopExpandedCopy}>
                      <p className={styles.desktopExpandedLead}>{desktopExpandedCopy.lead}</p>
                      {desktopExpandedCopy.paragraphs.map((paragraph) => (
                        <p key={paragraph} className={styles.desktopExpandedParagraph}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <button
                      type="button"
                      className={styles.desktopExpandedReserveButton}
                      onClick={() => reserveDesktopCard(activeDesktopCard)}
                    >
                      Reservar
                    </button>
                  </div>
                </article>
              ) : null}
            </div>
          )}
        </section>

        <section className={styles.desktopExperienceSection} aria-labelledby="events-experience-title">
          <div className={styles.desktopDivider} />
          <h2 id="events-experience-title" className={styles.desktopExperienceTitle}>
            Tu evento a medida
          </h2>
          <p className={styles.desktopExperienceText}>
            Diseñamos la experiencia de cada evento social o corporativo en conjunto con vos.
            <br />
            Nuestro equipo de producción y gastronomía te acompaña en cada detalle para garantizar un
            encuentro de primer nivel en Corrientes Capital, adaptado a las necesidades de tu marca o
            celebración.
          </p>
          <div className={styles.desktopDivider} />
        </section>

        <section
          ref={desktopFormSectionRef}
          className={styles.desktopFormSection}
          aria-labelledby="events-form-title-desktop"
        >
          <h2 id="events-form-title-desktop" className={styles.desktopFormTitle}>
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
                  onChange={updateField("fullName")}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Empresa (Opcional)</span>
                <input
                  type="text"
                  value={formData.company}
                  onChange={updateField("company")}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Email</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={updateField("email")}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Celular</span>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={updateField("phone")}
                  className={styles.desktopInput}
                />
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Tipo de evento</span>
                <select
                  required
                  value={formData.eventType}
                  onChange={updateField("eventType")}
                  className={styles.desktopSelect}
                >
                  <option value="">Seleccionar</option>
                  {eventTypeOptions.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.desktopField}>
                <span className={styles.desktopLabel}>Sucursal</span>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={updateField("branch")}
                  className={styles.desktopInput}
                />
              </label>
            </div>

            <div className={styles.desktopFieldGridCompact}>
              <label className={[styles.desktopField, styles.desktopFieldDate].join(" ")}>
                <span className={styles.desktopLabel}>Fecha</span>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={updateField("date")}
                  className={styles.desktopInput}
                  min={getTodayDateValue()}
                />
              </label>

              <label className={[styles.desktopField, styles.desktopFieldTime].join(" ")}>
                <span className={styles.desktopLabel}>Hora</span>
                <select
                  required
                  disabled={availableTimeOptions.length === 0}
                  value={formData.time}
                  onChange={updateField("time")}
                  className={styles.desktopSelect}
                >
                  <option value="">
                    {formData.date
                      ? availableTimeOptions.length > 0
                        ? "Seleccionar"
                        : "Sin horarios disponibles"
                      : "Seleccionar fecha primero"}
                  </option>
                  {availableTimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>

              <label className={[styles.desktopField, styles.desktopFieldGuests].join(" ")}>
                <span className={styles.desktopLabel}>Cantidad de personas</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.guests}
                  onChange={updateField("guests")}
                  className={styles.desktopInput}
                />
              </label>
            </div>

            <label className={styles.desktopCommentsField}>
              <span className={styles.desktopLabel}>Comentarios</span>
              <textarea value={formData.comments} onChange={updateField("comments")} className={styles.desktopTextarea} />
            </label>

            <div className={styles.desktopButtonRow}>
              <button type="submit" className={styles.desktopButton} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar solicitud"}
              </button>
            </div>
            {formFeedback ? (
              <p
                className={[
                  styles.formFeedback,
                  formFeedback.type === "success" ? styles.formFeedbackSuccess : styles.formFeedbackError,
                ].join(" ")}
              >
                {formFeedback.message}
              </p>
            ) : null}
          </form>
        </section>
      </div>

      <div className={styles.mobilePage}>
        <section
          className={styles.mobileHero}
          aria-labelledby="events-mobile-title"
          style={{ "--mobile-hero-scale": mobileHeroScale } as CSSProperties}
        >
          <div className={styles.mobileHeroCanvas}>
            <div className={styles.mobileHeroBackground} />
            <img
              src="/images/eventos-hero-mobile.png"
              alt="Brindis durante un evento en La Toma, Corrientes Capital"
              className={styles.mobileHeroImage}
            />
            <h1 id="events-mobile-title" className={styles.mobileHeroTitle}>
              EVENTOS
            </h1>
          </div>
        </section>

        <section className={styles.mobileEventsSection} aria-labelledby="events-mobile-list-title">
          <h2 id="events-mobile-list-title" className={styles.mobileSectionTitle}>
            Viví la Toma
          </h2>

          {shouldShowEventsPlaceholder ? (
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
          ) : (
            <div className={styles.mobileCardsStage}>
              <div
                className={[
                  styles.mobileCardsGrid,
                  activeMobileCard ? styles.mobileCardsGridHidden : "",
                ].join(" ")}
              >
                {eventCards.map((card) => {
                  return (
                    <article
                      key={card.id}
                      className={[styles.mobileCard, card.mobileClassName].join(" ")}
                    >
                      <button
                        type="button"
                        className={styles.mobileCardTrigger}
                        onClick={() => openMobileCard(card.id)}
                        aria-expanded={activeMobileCardId === card.id}
                        aria-controls={`mobile-event-card-${card.id}`}
                        aria-label={`Abrir información de ${card.titleLines.join(" ")}`}
                      />

                      <div className={styles.mobileCardFront} aria-hidden={activeMobileCardId === card.id}>
                        <span className={styles.mobileCardDate}>{card.date}</span>
                        <span className={styles.mobileCardTitle}>
                          {card.titleLines.map((line) => (
                            <span key={line} className={styles.mobileCardTitleLine}>
                              {line}
                            </span>
                          ))}
                        </span>
                        <span className={styles.mobileCardInfo}>+ info</span>
                      </div>
                    </article>
                  );
                })}
              </div>
              {activeMobileCard ? (
                <div
                  id={`mobile-event-card-${activeMobileCard.id}`}
                  className={styles.mobileExpandedCard}
                  aria-live="polite"
                >
                  <p className={styles.mobileExpandedDescription}>
                    {activeMobileCard.expandedDescription ?? activeMobileCard.description}
                  </p>
                  <div className={styles.mobileExpandedActions}>
                    <button type="button" className={styles.mobileExpandedButton} onClick={closeMobileCard}>
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className={styles.mobileExpandedButton}
                      onClick={() => reserveMobileCard(activeMobileCard)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </section>

        <section className={styles.mobileExperienceSection} aria-labelledby="events-mobile-experience-title">
          <div className={styles.mobileDivider} />
          <h2 id="events-mobile-experience-title" className={styles.mobileExperienceTitle}>
            Tu evento a medida
          </h2>
          <p className={styles.mobileExperienceText}>
            Diseñamos la experiencia de cada evento social o corporativo en conjunto con vos.
            <br />
            <br />
            Nuestro equipo te acompaña en cada detalle para garantizar un encuentro de primer nivel en
            Corrientes Capital, adaptado a las necesidades de tu marca o celebración.
          </p>
          <div className={styles.mobileDivider} />
        </section>

        <section
          ref={mobileFormSectionRef}
          className={styles.mobileFormSection}
          aria-labelledby="events-form-title-mobile"
        >
          <h2 id="events-form-title-mobile" className={styles.mobileFormTitle}>
            DEJANOS TUS DATOS Y TE CONTACTAREMOS
          </h2>

          <form className={styles.mobileForm} onSubmit={handleSubmit}>
            <div className={styles.mobileFieldGrid}>
              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Nombre y Apellido</span>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={updateField("fullName")}
                  className={styles.mobileInput}
                />
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Empresa (Opcional)</span>
                <input
                  type="text"
                  value={formData.company}
                  onChange={updateField("company")}
                  className={styles.mobileInput}
                />
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Email</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={updateField("email")}
                  className={styles.mobileInput}
                />
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Celular</span>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={updateField("phone")}
                  className={styles.mobileInput}
                />
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Tipo de evento</span>
                <select
                  required
                  value={formData.eventType}
                  onChange={updateField("eventType")}
                  className={styles.mobileSelect}
                >
                  <option value="">Seleccionar</option>
                  {eventTypeOptions.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Fecha</span>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={updateField("date")}
                  className={styles.mobileInput}
                  min={getTodayDateValue()}
                />
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Hora</span>
                <select
                  required
                  disabled={availableTimeOptions.length === 0}
                  value={formData.time}
                  onChange={updateField("time")}
                  className={styles.mobileSelect}
                >
                  <option value="">
                    {formData.date
                      ? availableTimeOptions.length > 0
                        ? "Seleccionar"
                        : "Sin horarios disponibles"
                      : "Seleccionar fecha primero"}
                  </option>
                  {availableTimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.mobileField}>
                <span className={styles.mobileLabel}>Cantidad de personas</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.guests}
                  onChange={updateField("guests")}
                  className={styles.mobileInput}
                />
              </label>
            </div>

            <label className={styles.mobileCommentsField}>
              <span className={styles.mobileLabel}>Comentarios</span>
              <textarea value={formData.comments} onChange={updateField("comments")} className={styles.mobileTextarea} />
            </label>

            <div className={styles.mobileButtonRow}>
              <button type="submit" className={styles.mobileButton} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar solicitud"}
              </button>
            </div>
            {formFeedback ? (
              <p
                className={[
                  styles.formFeedback,
                  styles.mobileFormFeedback,
                  formFeedback.type === "success" ? styles.formFeedbackSuccess : styles.formFeedbackError,
                ].join(" ")}
              >
                {formFeedback.message}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </>
  );
}
