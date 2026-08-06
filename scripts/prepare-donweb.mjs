import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
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

// Las credenciales SMTP no pueden vivir en public/.htaccess porque ese archivo
// esta trackeado en git y terminarian publicadas en GitHub. Se guardan en
// .htaccess-env (ignorado por git) y se inyectan solo en el paquete de deploy.
const htaccessEnvPath = resolve(rootDir, ".htaccess-env");
const deployHtaccessPath = resolve(targetDir, ".htaccess");
let htaccessEnvInjected = false;

if (existsSync(htaccessEnvPath) && existsSync(deployHtaccessPath)) {
  const base = readFileSync(deployHtaccessPath, "utf8");
  const env = readFileSync(htaccessEnvPath, "utf8").trim();
  // El bloque va despues de las reglas de rewrite y antes de mod_expires,
  // igual que en el .htaccess que corre hoy en produccion.
  const marker = "<IfModule mod_expires.c>";
  const merged = base.includes(marker)
    ? base.replace(marker, `${env}\r\n\r\n${marker}`)
    : `${base.trimEnd()}\r\n\r\n${env}\r\n`;

  writeFileSync(deployHtaccessPath, merged, "utf8");
  htaccessEnvInjected = true;
}

// OJO: no usar Compress-Archive ni ZipFile.CreateFromDirectory en Windows.
// PowerShell 5.1 corre sobre .NET Framework con target 4.5, y ambos guardan las
// rutas con backslash. La spec ZIP (APPNOTE 4.4.17.1) exige "/", asi que al
// descomprimir en el hosting (Linux) se crearian archivos llamados
// "images\foo.webp" en vez de carpetas y el sitio quedaria sin CSS ni imagenes.
// bsdtar (tar.exe, incluido en Windows 10+) si escribe separadores correctos.
// Se listan las entradas de primer nivel en vez de usar "." o "*": evita el
// prefijo "./" en cada ruta y no depende de como expanda comodines cada shell.
rmSync(zipPath, { force: true });

const topLevelEntries = readdirSync(targetDir);

const zip = spawnSync("tar", ["-a", "-c", "-f", zipPath, ...topLevelEntries], {
  cwd: targetDir,
  stdio: "inherit",
});

if (zip.status !== 0) {
  console.warn("No se pudo generar el ZIP automaticamente. Comprime manualmente deploy/donweb-public_html.");
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
    "Envios de email (Eventos):",
    "- El formulario de /eventos usa /api/enviar-evento.php (PHP) en el servidor.",
    "- Las variables SMTP van como SetEnv dentro del .htaccess.",
    htaccessEnvInjected
      ? "- OK: el .htaccess de este paquete YA incluye el bloque SetEnv (tomado de .htaccess-env)."
      : "- ATENCION: no se encontro .htaccess-env, el .htaccess NO trae las variables SMTP.\n  Si sobreescribis el .htaccess del servidor, el formulario de eventos dejara de enviar.",
    "",
    "Las credenciales viven en .htaccess-env (ignorado por git) y solo se inyectan aca.",
    "",
    "Generado automaticamente desde dist.",
  ].join("\n"),
  "utf8",
);

console.log(`Paquete DonWeb preparado en: ${targetDir}`);
console.log(`ZIP listo en: ${zipPath}`);
console.log(`Instrucciones rápidas en: ${notesPath}`);
console.log(
  htaccessEnvInjected
    ? ".htaccess: bloque SetEnv inyectado desde .htaccess-env"
    : ".htaccess: SIN bloque SetEnv (falta .htaccess-env)",
);
