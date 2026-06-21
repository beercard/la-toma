import { useEffect, useState } from "react";
import { getCarta, getEvents, getGallery } from "../lib/content/api";
import { fallbackCarta, fallbackEvents, fallbackGallery } from "../lib/content/fallback";
import type { CartaCategory, EventItem, GalleryItem } from "../lib/content/types";

export function useCarta() {
  const [carta, setCarta] = useState<CartaCategory[]>(fallbackCarta);

  useEffect(() => {
    let active = true;
    getCarta()
      .then((data) => {
        if (active && data.length > 0) setCarta(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return carta;
}

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);

  useEffect(() => {
    let active = true;
    getEvents()
      .then((data) => {
        if (active && data.length > 0) setEvents(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return events;
}

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);

  useEffect(() => {
    let active = true;
    getGallery()
      .then((data) => {
        if (active && data.length > 0) setGallery(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return gallery;
}
