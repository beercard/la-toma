import { FormEvent, useEffect, useState } from "react";
import {
  adminCreateCategory,
  adminCreateItem,
  adminDeleteCategory,
  adminDeleteItem,
  adminListCategories,
  adminListItems,
  adminUpdateItem,
} from "../../lib/content/api";
import styles from "./Admin.module.css";

interface CategoryRow {
  id: string;
  title: string;
  sort_order: number;
}
interface ItemRow {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string | null;
  sort_order: number;
}

function ItemEditor({
  item,
  onSaved,
  onDelete,
}: {
  item: ItemRow;
  onSaved: (id: string, patch: { name: string; description: string | null; price: string | null }) => void;
  onDelete: (id: string) => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description ?? "");
  const [price, setPrice] = useState(item.price ?? "");
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Si el ítem cambia desde afuera (recarga), sincronizamos el borrador.
  useEffect(() => {
    setName(item.name);
    setDescription(item.description ?? "");
    setPrice(item.price ?? "");
  }, [item.id, item.name, item.description, item.price]);

  const dirty =
    name !== item.name ||
    description !== (item.description ?? "") ||
    price !== (item.price ?? "");

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    try {
      const patch = { name, description: description || null, price: price || null };
      await adminUpdateItem(item.id, patch);
      onSaved(item.id, patch);
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 1800);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setName(item.name);
    setDescription(item.description ?? "");
    setPrice(item.price ?? "");
  };

  return (
    <div className={styles.itemRow}>
      <input
        className={styles.input}
        value={name}
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.input}
        value={description}
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className={styles.input}
        style={{ maxWidth: 110 }}
        value={price}
        placeholder="$"
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className={styles.itemActions}>
        {dirty ? (
          <>
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
          </>
        ) : justSaved ? (
          <span className={styles.savedTag}>✓ Guardado</span>
        ) : null}
        <button
          type="button"
          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
          onClick={() => onDelete(item.id)}
          aria-label={`Eliminar ${item.name}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function CartaManager() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const [cats, its] = await Promise.all([adminListCategories(), adminListItems()]);
      setCategories(cats as CategoryRow[]);
      setItems(its as ItemRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar la carta.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async (event: FormEvent) => {
    event.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await adminCreateCategory(newCategory.trim(), categories.length);
      setNewCategory("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la categoría.");
    }
  };

  const removeCategory = async (id: string) => {
    if (!window.confirm("¿Eliminar la categoría y todos sus ítems?")) return;
    try {
      await adminDeleteCategory(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar.");
    }
  };

  const addItem = async (categoryId: string) => {
    try {
      const count = items.filter((i) => i.category_id === categoryId).length;
      await adminCreateItem({ category_id: categoryId, name: "Nuevo ítem", sort_order: count });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo agregar el ítem.");
    }
  };

  const handleItemSaved = (
    id: string,
    patch: { name: string; description: string | null; price: string | null },
  ) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const removeItem = async (id: string) => {
    if (!window.confirm("¿Eliminar este ítem?")) return;
    try {
      await adminDeleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el ítem.");
    }
  };

  return (
    <div>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Carta</h2>
      </div>
      <p className={styles.hint}>
        Organizá la carta por categorías. Editá nombre, descripción y precio de cada ítem; cuando hagas un
        cambio aparece el botón <strong>Guardar</strong> para confirmarlo.
      </p>

      {error ? <div className={`${styles.notice} ${styles.noticeError}`}>{error}</div> : null}

      <form className={styles.card} onSubmit={addCategory}>
        <div className={styles.cardHead}>
          <h3 className={styles.cardTitle}>Nueva categoría</h3>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            className={styles.input}
            style={{ flex: "1 1 240px" }}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Ej. Café de especialidad"
          />
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            Agregar
          </button>
        </div>
      </form>

      {categories.length === 0 ? (
        <p className={styles.empty}>No hay categorías todavía.</p>
      ) : (
        categories.map((category) => (
          <div className={styles.card} key={category.id}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`} onClick={() => addItem(category.id)}>
                  + Ítem
                </button>
                <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => removeCategory(category.id)}>
                  Eliminar categoría
                </button>
              </div>
            </div>

            {items
              .filter((item) => item.category_id === category.id)
              .map((item) => (
                <ItemEditor key={item.id} item={item} onSaved={handleItemSaved} onDelete={removeItem} />
              ))}
          </div>
        ))
      )}
    </div>
  );
}
