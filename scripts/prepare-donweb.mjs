import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const distDir = resolve(rootDir, "dist");
const deployDir = resolve(rootDir, "deploy");
const targetDir = resolve(deployDir, "donweb-public_html");
const notesPath = resolve(deployDir, "DONWEB-README.txt");

if (!existsSync(distDir)) {
  throw new Error("No existe la carpeta dist. Ejecuta primero el build.");
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(distDir, targetDir, { recursive: true });

writeFileSync(
  notesPath,
  [
    "LA TOMA - Paquete listo para DonWeb / Ferozo",
    "",
    "1. Sube TODO el contenido de la carpeta donweb-public_html al directorio public_html del hosting.",
    "2. Si Ferozo te deja subir un .zip, comprime el contenido de donweb-public_html y extraelo dentro de public_html.",
    "3. No subas src, node_modules ni el resto del proyecto. Solo el contenido compilado.",
    "4. El archivo .htaccess ya viene incluido para rutas SPA + SEO por ruta.",
    "",
    "Generado automaticamente desde dist.",
  ].join("\n"),
  "utf8",
);

console.log(`Paquete DonWeb preparado en: ${targetDir}`);
console.log(`Instrucciones rápidas en: ${notesPath}`);
