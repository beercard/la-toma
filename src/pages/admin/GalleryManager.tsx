import { ChangeEvent, useEffect, useState } from "react";
import {
  adminCreateGalleryImage,
  adminGetGalleryComingSoonEnabled,
  adminDeleteGalleryImage,
  adminListGallery,
  adminSetGalleryComingSoonEnabled,
  adminUpdateGalleryImage,
  removeMediaByUrl,
  uploadMedia,
} from "../../lib/content/api";
import styles from "./Admin.module.css";

interface GalleryRow {
  id: string;
  image_url: string;
  alt: string;
  tag: string | null;
  sort_order: number;
  is_published: boolean;
}

function GalleryItemEditor({
  row,
  onSavedMeta,
  onToggleVisible,
  onDelete,
}: {
  row: GalleryRow;
  onSavedMeta: (id: string, patch: { alt: string; tag: string | null }) => void;
  onToggleVisible: (id: string, value: boolean) => void;
  onDelete: (id: string, imageUrl: string) => void;
}) {
  const [alt, setAlt] = useState(row.alt);
  const [tag, setTag] = useState(row.tag ?? "");
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setAlt(row.alt);
    setTag(row.tag ?? "");
  }, [row.id, row.alt, row.tag]);

  const dirty = alt !== row.alt || tag !== (row.tag ?? "");

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    try {
      const patch = { alt, tag: tag || null };
      await adminUpdateGalleryImage(row.id, patch);
      onSavedMeta(row.id, patch);
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 1800);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setAlt(row.alt);
    setTag(row.tag ?? "");
  };

  return (
    <div className={styles.thumb}>
      <img src={row.image_url} alt={row.alt} className={styles.thumbImg} loading="lazy" />
      <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          className={styles.input}
          value={alt}
          placeholder="Texto alternativo"
          onChange={(e) => setAlt(e.target.value)}
        />
        <input
          className={styles.input}
          value={tag}
          placeholder="Etiqueta (ej. APERTURA 11.07)"
          onChange={(e) => setTag(e.target.value)}
        />

        {dirty ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
              onClick={save}
              disabled={saving}
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
              onClick={reset}
              disabled={saving}
            >
              Deshacer
            </button>
          </div>
        ) : justSaved ? (
          <span className={styles.savedTag}>✓ Guardado</span>
        ) : null}

        <div className={styles.thumbBar}>
          <label className={styles.thumbTag}>
            <input
              type="checkbox"
              checked={row.is_published}
              onChange={(e) => onToggleVisible(row.id, e.target.checked)}
            />{" "}
            Visible
          </label>
          <button
            className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
            onClick={() => onDelete(row.id, row.image_url)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryManager() {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [galleryComingSoon, setGalleryComingSoon] = useState(true);
  const [galleryComingSoonDraft, setGalleryComingSoonDraft] = useState(true);
  const [savingComingSoon, setSavingComingSoon] = useState(false);
  const [galleryComingSoonJustSaved, setGalleryComingSoonJustSaved] = useState(false);

  const load = async () => {
    try {
      setError(null);
      const galleryRows = (await adminListGallery()) as GalleryRow[];
      setRows(galleryRows);
      try {
        const galleryComingSoonEnabled = await adminGetGalleryComingSoonEnabled();
        setGalleryComingSoon(galleryComingSoonEnabled);
        setGalleryComingSoonDraft(galleryComingSoonEnabled);
      } catch {
        setGalleryComingSoon(true);
        setGalleryComingSoonDraft(true);
        setError(
          "Para controlar el modo “Próximamente” de la galería, aplicá la actualización de supabase/schema.sql en Supabase.",
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar la galería.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      let order = rows.length;
      for (const file of Array.from(files)) {
        const url = await uploadMedia(file, "gallery");
        await adminCreateGalleryImage({ image_url: url, alt: "", sort_order: order });
        order += 1;
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSavedMeta = (id: string, patch: { alt: string; tag: string | null }) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const handleToggleVisible = async (id: string, value: boolean) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, is_published: value } : r)));
    try {
      await adminUpdateGalleryImage(id, { is_published: value });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar la visibilidad.");
      await load();
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!window.confirm("¿Eliminar esta imagen?")) return;
    try {
      await removeMediaByUrl(imageUrl).catch(() => undefined);
      await adminDeleteGalleryImage(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar.");
    }
  };

  const handleGalleryComingSoonChange = async (value: boolean) => {
    setError(null);
    setGalleryComingSoonDraft(value);
  };

  const saveGalleryComingSoon = async () => {
    if (galleryComingSoonDraft === galleryComingSoon) return;

    setSavingComingSoon(true);
    try {
      await adminSetGalleryComingSoonEnabled(galleryComingSoonDraft);
      setGalleryComingSoon(galleryComingSoonDraft);
      setGalleryComingSoonJustSaved(true);
      window.setTimeout(() => setGalleryComingSoonJustSaved(false), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el modo de galería.");
    } finally {
      setSavingComingSoon(false);
    }
  };

  const resetGalleryComingSoon = () => {
    setError(null);
    setGalleryComingSoonDraft(galleryComingSoon);
  };

  const galleryComingSoonDirty = galleryComingSoonDraft !== galleryComingSoon;

  return (
    <div>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Galería</h2>
        <label className={`${styles.btn} ${styles.btnPrimary}`} style={{ cursor: "pointer" }}>
          {uploading ? "Subiendo..." : "+ Subir imágenes"}
          <input type="file" accept="image/*" multiple hidden onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <p className={styles.hint}>
        Subí fotos (se optimizan a WebP automáticamente). Agregá un texto alternativo descriptivo para SEO y
        accesibilidad; al modificar alguno aparece el botón <strong>Guardar</strong> para confirmar. El
        orden controla cómo aparecen en la galería pública.
      </p>

      {error ? <div className={`${styles.notice} ${styles.noticeError}`}>{error}</div> : null}

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <h3 className={styles.cardTitle}>Estado público</h3>
        </div>
        <label className={styles.toggleRow}>
          <input
            type="checkbox"
            checked={galleryComingSoonDraft}
            onChange={(event) => handleGalleryComingSoonChange(event.target.checked)}
            disabled={savingComingSoon}
          />
          <span>
            Mostrar el mensaje <strong>&quot;Próximamente... Más novedades desde nuestro Instagram&quot;</strong> y
            ocultar las imágenes en la web pública.
          </span>
        </label>
        {galleryComingSoonDirty ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
              onClick={saveGalleryComingSoon}
              disabled={savingComingSoon}
            >
              {savingComingSoon ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
              onClick={resetGalleryComingSoon}
              disabled={savingComingSoon}
            >
              Deshacer
            </button>
          </div>
        ) : galleryComingSoonJustSaved ? (
          <span className={styles.savedTag}>✓ Guardado</span>
        ) : null}
        <p className={styles.toggleHint}>
          {galleryComingSoonDraft
            ? "Ahora la página pública de Galería muestra el bloque de “Próximamente”."
            : "Ahora la página pública de Galería muestra las imágenes publicadas. Si no hay imágenes, seguirá apareciendo el mensaje de “Próximamente”."}
        </p>
      </div>

      {rows.length === 0 ? (
        <p className={styles.empty}>Todavía no hay imágenes cargadas.</p>
      ) : (
        <div className={styles.galleryGrid}>
          {rows.map((row) => (
            <GalleryItemEditor
              key={row.id}
              row={row}
              onSavedMeta={handleSavedMeta}
              onToggleVisible={handleToggleVisible}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
