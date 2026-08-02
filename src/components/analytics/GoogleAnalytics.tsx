import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID ?? "G-LE25KKP5WC";

  useEffect(() => {
    if (!measurementId) return;
    if (location.pathname.startsWith("/admin")) return;

    const existing = document.querySelector(`script[data-ga-measurement-id="${measurementId}"]`);
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.gaMeasurementId = measurementId;
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.dataset.gaMeasurementId = measurementId;
    inlineScript.text = [
      "window.dataLayer = window.dataLayer || [];",
      "function gtag(){dataLayer.push(arguments);}",
      "window.gtag = gtag;",
      "gtag('js', new Date());",
      `gtag('config', '${measurementId}', { anonymize_ip: true, page_path: window.location.pathname + window.location.search + window.location.hash });`,
    ].join("\n");
    document.head.appendChild(inlineScript);
  }, [measurementId, location.pathname]);

  useEffect(() => {
    if (!measurementId) return;
    if (location.pathname.startsWith("/admin")) return;
    if (typeof window.gtag !== "function") return;

    window.gtag("config", measurementId, {
      page_path: location.pathname + location.search + location.hash,
    });
  }, [measurementId, location.pathname, location.search, location.hash]);

  return null;
}
