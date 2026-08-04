import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const distDir = resolve(rootDir, "dist");
const deployDir = resolve(rootDir, "deploy");
const targetDir = resolve(deployDir, "donweb-public_html");
const zipPath = resolve(deployDir, "latoma-donweb-public_html.zip");
const notesPath = resolve(deployDir, "DONWEB-README.txt");

if (!existsSync(distDir)) {
  throw new Error("No existe la carpeta dist. Ejecuta primero el build.");
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(distDir, targetDir, { recursive: true });

const zipPayloadGlob = resolve(targetDir, "*");

if (process.platform === "win32") {
  const zip = spawnSync(
    "powershell",
    [
      "-NoProfile",
      "-Command",
      [
        `if (Test-Path "${zipPath}") { Remove-Item "${zipPath}" -Force }`,
        `Compress-Archive -Path "${zipPayloadGlob}" -DestinationPath "${zipPath}" -Force`,
      ].join("; "),
    ],
    { stdio: "inherit" },
  );

  if (zip.status !== 0) {
    console.warn("No se pudo generar el ZIP automaticamente. Comprime manualmente deploy/donweb-public_html.");
  }
} else {
  console.log("ZIP automatico disponible solo en Windows. Comprime manualmente deploy/donweb-public_html.");
}

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
console.log(`ZIP listo en: ${zipPath}`);
console.log(`Instrucciones rápidas en: ${notesPath}`);
