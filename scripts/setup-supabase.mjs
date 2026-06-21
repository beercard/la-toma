/**
 * Configura la base de Supabase: corre el esquema, siembra carta + galería
 * y crea el usuario admin. NO contiene secretos: lee todo de variables de entorno.
 *
 * Uso:
 *   PG_CONN="postgresql://..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." node scripts/setup-supabase.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "pg";

const { Client } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.PG_CONN;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!connectionString) {
  console.error("Falta PG_CONN");
  process.exit(1);
}

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

const seedItemsSql = `
insert into public.menu_items (category_id, name, description, price, sort_order)
select c.id, v.name, v.description, v.price, v.ord
from (values
  ('Café de especialidad','Espresso','Simple o doble, de tueste de la casa.','$2.500',1),
  ('Café de especialidad','Flat white','Espresso doble con leche texturada.','$3.800',2),
  ('Café de especialidad','Cappuccino','Con espuma cremosa y cacao.','$3.600',3),
  ('Café de especialidad','Filtrado V60','Método de filtrado, grano de estación.','$4.200',4),
  ('Para acompañar','Medialunas (x2)','De manteca, recién horneadas.','$2.400',1),
  ('Para acompañar','Tostado de campo','Jamón, queso y tomate en pan de masa madre.','$5.200',2),
  ('Para acompañar','Avocado toast','Palta, huevo pochado y semillas.','$6.800',3),
  ('Para acompañar','Budín del día','Consultá la variedad de hoy.','$3.200',4),
  ('Meriendas frente al río','Merienda La Toma','Café, jugo, tostado y pastelería.','$9.500',1),
  ('Meriendas frente al río','Cheesecake de estación','Con coulis de frutos rojos.','$5.400',2),
  ('Meriendas frente al río','Carrot cake','Con frosting de queso crema.','$5.200',3),
  ('Coctelería al atardecer','Spritz La Toma','Aperitivo cítrico con espumante.','$7.500',1),
  ('Coctelería al atardecer','Gin tonic de autor','Con botánicos de la casa.','$8.200',2),
  ('Coctelería al atardecer','Negroni','Gin, vermouth rosso y bitter.','$8.000',3),
  ('Coctelería al atardecer','Vino por copa','Tinto, blanco o rosado de bodega seleccionada.','$5.500',4)
) as v(cat, name, description, price, ord)
join public.menu_categories c on c.title = v.cat
where not exists (select 1 from public.menu_items mi where mi.name = v.name and mi.category_id = c.id);
`;

const galleryImages = [
  ["/figma/mqlhuvgt-3xn5tnq.png", "Invitados compartiendo una apertura en La Toma"],
  ["/figma/mqlhuvgt-zqt1bq4.png", "Escena social durante una noche en La Toma"],
  ["/figma/mqlhuvgt-clulxvl.png", "Vista superior de la pista y el público en La Toma"],
  ["/figma/mqlhuvgt-9dlduqh.png", "Grupo de amigos posando en una noche de apertura"],
  ["/figma/mqlhuvgt-pggchf9.png", "Cabina y público durante una jornada de música en vivo"],
  ["/figma/mqlhuvgt-wxum5ld.png", "Asistentes registrando el momento con una cámara analógica"],
  ["/figma/mqli5prz-vm64pk2.png", "Retrato de asistentes celebrando en La Toma"],
  ["/figma/mqli5pry-dg04of5.png", "Encuentro entre invitados en uno de los espacios de La Toma"],
  ["/figma/mqli5prz-xn3sjlt.png", "Momento íntimo de la galería capturado durante la apertura"],
];

async function main() {
  await client.connect();
  console.log("Conectado a la base.");

  if (!process.env.SKIP_SCHEMA) {
    const schema = readFileSync(resolve(__dirname, "../supabase/schema.sql"), "utf8");
    await client.query(schema);
    console.log("✓ Esquema ejecutado (tablas, RLS, bucket, seed base).");
  } else {
    console.log("• Esquema omitido (SKIP_SCHEMA).");
  }

  await client.query(seedItemsSql);
  console.log("✓ Ítems de la carta verificados.");

  const { rows: galleryCount } = await client.query("select count(*)::int as n from public.gallery_images");
  if (galleryCount[0].n === 0) {
    for (let i = 0; i < galleryImages.length; i += 1) {
      await client.query(
        "insert into public.gallery_images (image_url, alt, sort_order) values ($1,$2,$3)",
        [galleryImages[i][0], galleryImages[i][1], i],
      );
    }
    console.log(`✓ Galería sembrada (${galleryImages.length} imágenes).`);
  } else {
    console.log(`• Galería ya tenía ${galleryCount[0].n} imágenes, no se sembró.`);
  }

  // Usuario admin (idempotente)
  if (adminEmail && adminPassword) {
    try {
      // Limpieza de cualquier estado parcial previo para este email.
      await client.query(
        "delete from auth.identities where user_id in (select id from auth.users where email = $1)",
        [adminEmail],
      );
      await client.query("delete from auth.users where email = $1", [adminEmail]);

      const insertUser = await client.query(
        `insert into auth.users
           (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
            created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin,
            confirmation_token, recovery_token, email_change_token_new, email_change,
            email_change_token_current, phone_change, phone_change_token, reauthentication_token)
         values
           ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated',
            $1, crypt($2, gen_salt('bf')), now(), now(), now(),
            '{"provider":"email","providers":["email"]}', '{}', false,
            '', '', '', '', '', '', '', '')
         returning id`,
        [adminEmail, adminPassword],
      );
      const userId = insertUser.rows[0].id;
      await client.query(
        `insert into auth.identities
           (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
         values ($1, $2::uuid, json_build_object('sub', $3::text, 'email', $4::text), 'email', now(), now(), now())`,
        [adminEmail, userId, userId, adminEmail],
      );
      console.log(`✓ Usuario admin creado: ${adminEmail}`);
    } catch (err) {
      console.log(`! No se pudo crear el usuario admin por SQL (${err.message}). Crealo desde el panel de Supabase → Authentication → Users.`);
    }
  }

  // Resumen
  const summary = await client.query(`
    select 'categorías' as t, count(*)::int n from public.menu_categories
    union all select 'ítems', count(*) from public.menu_items
    union all select 'eventos', count(*) from public.events
    union all select 'galería', count(*) from public.gallery_images
  `);
  console.log("Resumen:", summary.rows.map((r) => `${r.t}=${r.n}`).join("  "));

  await client.end();
  console.log("Listo.");
}

main().catch((err) => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
