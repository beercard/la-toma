import { FormEvent, useEffect, useState } from "react";
import {
  adminCreateEvent,
  adminDeleteEvent,
  adminListEvents,
  adminUpdateEvent,
} from "../../lib/content/api";
import styles from "./Admin.module.css";

interface EventRow {
  id: string;
  slug: string;
  title: string;
  date_label: string | null;
  starts_at: string | null;
  description: string;
  expanded_description: string | null;
  sort_order: number;
  is_published: boolean;
}

const emptyForm = {
  id: "",
  slug: "",
  title: "",
  date_label: "",
  starts_at: "",
  description: "",
  expanded_description: "",
  sort_order: 0,
  is_published: true,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function EventsManager() {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const data = (await adminListEvents()) as EventRow[];
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar eventos.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: rows.length });
    setEditing(true);
  };

  const startEdit = (row: EventRow) => {
    setForm({
      id: row.id,
      slug: row.slug,
      title: row.title,
      date_label: row.date_label ?? "",
      starts_at: row.starts_at ? row.starts_at.slice(0, 16) : "",
      description: row.description,
      expanded_description: row.expanded_description ?? "",
      sort_order: row.sort_order,
      is_published: row.is_published,
    });
    setEditing(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const payload = {
      slug: form.slug || slugify(form.title),
      title: form.title,
      date_label: form.date_label || null,
      starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
      description: form.description,
      expanded_description: form.expanded_description || null,
      sort_order: Number(form.sort_order) || 0,
      is_published: form.is_published,
    };
    try {
      if (form.id) {
        await adminUpdateEvent(form.id, payload);
      } else {
        await adminCreateEvent(payload);
      }
      setEditing(false);
      setForm({ ...emptyForm });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Eliminar este evento?")) return;
    try {
      await adminDeleteEvent(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar.");
    }
  };

  return (
    <div>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Eventos</h2>
        {!editing ? (
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={startNew}>
            + Nuevo evento
          </button>
        ) : null}
      </div>

      {error ? <div className={`${styles.notice} ${styles.noticeError}`}>{error}</div> : null}

      {editing ? (
        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Título</label>
              <input
                className={styles.input}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Slug (URL, opcional)</label>
              <input
                className={styles.input}
                value={form.slug}
                placeholder={slugify(form.title)}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Fecha visible (ej. 11|07)</label>
              <input
                className={styles.input}
                value={form.date_label}
                onChange={(e) => setForm({ ...form, date_label: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Fecha y hora reales</label>
              <input
                type="datetime-local"
                className={styles.input}
                value={form.starts_at}
                onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Descripción (tarjeta)</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Descripción ampliada (al abrir, opcional)</label>
            <textarea
              className={styles.textarea}
              value={form.expanded_description}
              onChange={(e) => setForm({ ...form, expanded_description: e.target.value })}
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Orden</label>
              <input
                type="number"
                className={styles.input}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                />{" "}
                Publicado
              </label>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={busy}>
              {busy ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={() => {
                setEditing(false);
                setForm({ ...emptyForm });
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : null}

      {rows.length === 0 && !editing ? (
        <p className={styles.empty}>No hay eventos cargados todavía.</p>
      ) : (
        rows.map((row) => (
          <div className={styles.card} key={row.id}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>
                {row.title} {row.is_published ? "" : "· (oculto)"}
              </h3>
              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`} onClick={() => startEdit(row)}>
                  Editar
                </button>
                <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => handleDelete(row.id)}>
                  Eliminar
                </button>
              </div>
            </div>
            <p className={styles.hint} style={{ margin: 0 }}>
              {row.date_label ? `${row.date_label} · ` : ""}
              {row.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
