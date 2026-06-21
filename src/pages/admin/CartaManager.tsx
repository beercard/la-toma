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

  const saveItem = async (id: string, patch: Record<string, unknown>) => {
    try {
      await adminUpdateItem(id, patch);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el ítem.");
    }
  };

  const removeItem = async (id: string) => {
    try {
      await adminDeleteItem(id);
      await load();
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
        Organizá la carta por categorías. Editá nombre, descripción y precio de cada ítem; los cambios se
        guardan al salir del campo.
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
                <div className={styles.row} key={item.id}>
                  <input
                    className={styles.input}
                    defaultValue={item.name}
                    placeholder="Nombre"
                    onBlur={(e) => e.target.value !== item.name && saveItem(item.id, { name: e.target.value })}
                  />
                  <input
                    className={styles.input}
                    defaultValue={item.description ?? ""}
                    placeholder="Descripción"
                    onBlur={(e) => e.target.value !== (item.description ?? "") && saveItem(item.id, { description: e.target.value || null })}
                  />
                  <input
                    className={styles.input}
                    style={{ maxWidth: 110 }}
                    defaultValue={item.price ?? ""}
                    placeholder="$"
                    onBlur={(e) => e.target.value !== (item.price ?? "") && saveItem(item.id, { price: e.target.value || null })}
                  />
                  <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => removeItem(item.id)}>
                    ✕
                  </button>
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
}
