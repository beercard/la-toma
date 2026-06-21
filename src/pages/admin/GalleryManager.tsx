import { ChangeEvent, useEffect, useState } from "react";
import {
  adminCreateGalleryImage,
  adminDeleteGalleryImage,
  adminListGallery,
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

export default function GalleryManager() {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      setRows((await adminListGallery()) as GalleryRow[]);
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

  const saveField = async (id: string, patch: Record<string, unknown>) => {
    try {
      await adminUpdateGalleryImage(id, patch);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!window.confirm("¿Eliminar esta imagen?")) return;
    try {
      // Borra primero el archivo del Storage (best-effort), luego la fila.
      await removeMediaByUrl(imageUrl).catch(() => undefined);
      await adminDeleteGalleryImage(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar.");
    }
  };

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
        Subí fotos (se guardan en Supabase Storage). Agregá un texto alternativo descriptivo para SEO y
        accesibilidad. El orden controla cómo aparecen en la galería pública.
      </p>

      {error ? <div className={`${styles.notice} ${styles.noticeError}`}>{error}</div> : null}

      {rows.length === 0 ? (
        <p className={styles.empty}>Todavía no hay imágenes cargadas.</p>
      ) : (
        <div className={styles.galleryGrid}>
          {rows.map((row) => (
            <div className={styles.thumb} key={row.id}>
              <img src={row.image_url} alt={row.alt} className={styles.thumbImg} loading="lazy" />
              <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                <input
                  className={styles.input}
                  defaultValue={row.alt}
                  placeholder="Texto alternativo"
                  onBlur={(e) => e.target.value !== row.alt && saveField(row.id, { alt: e.target.value })}
                />
                <input
                  className={styles.input}
                  defaultValue={row.tag ?? ""}
                  placeholder="Etiqueta (ej. APERTURA 11.07)"
                  onBlur={(e) => e.target.value !== (row.tag ?? "") && saveField(row.id, { tag: e.target.value || null })}
                />
                <div className={styles.thumbBar}>
                  <label className={styles.thumbTag}>
                    <input
                      type="checkbox"
                      checked={row.is_published}
                      onChange={(e) => saveField(row.id, { is_published: e.target.checked })}
                    />{" "}
                    Visible
                  </label>
                  <button
                    className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                    onClick={() => handleDelete(row.id, row.image_url)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
