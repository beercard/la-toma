import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...x) => resolve(root, ...x);

const HERO = p("public/images/home-hero-desktop.webp");
const WORDMARK = p("public/images/home-logo-desktop.webp");
const FAVICON = p("public/favicon.svg");

async function buildOg() {
  const W = 1200;
  const H = 630;

  const bg = await sharp(HERO).resize(W, H, { fit: "cover", position: "centre" }).toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#231f1c" fill-opacity="0.34"/></svg>`,
  );

  const wmWidth = 640;
  const wm = await sharp(WORDMARK).resize({ width: wmWidth }).toBuffer();
  const wmMeta = await sharp(wm).metadata();
  const wmHeight = wmMeta.height ?? 110;
  const wmLeft = Math.round((W - wmWidth) / 2);
  const wmTop = 225;

  const texts = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <text x="${W / 2}" y="${wmTop + wmHeight + 56}" text-anchor="middle"
             font-family="Arial, Helvetica, sans-serif" font-size="34" letter-spacing="10"
             fill="#ffffff" font-weight="700">MULTIESPACIO</text>
       <text x="${W / 2}" y="${wmTop + wmHeight + 110}" text-anchor="middle"
             font-family="Georgia, 'Times New Roman', serif" font-size="26"
             fill="#f7f4ef" fill-opacity="0.92">Restobar en la Costanera de Corrientes Capital</text>
     </svg>`,
  );

  await sharp(bg)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: wm, top: wmTop, left: wmLeft },
      { input: texts, top: 0, left: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(p("public/og-image.jpg"));

  const meta = await sharp(p("public/og-image.jpg")).metadata();
  console.log(`✓ og-image.jpg ${meta.width}x${meta.height} (${Math.round(meta.size / 1024)} KB)`);
}

async function buildIcons() {
  const sizes = [
    ["apple-touch-icon.png", 180],
    ["icon-192.png", 192],
    ["icon-512.png", 512],
  ];
  for (const [name, size] of sizes) {
    await sharp(FAVICON, { density: 384 })
      .resize(size, size, { fit: "cover" })
      .png()
      .toFile(p("public", name));
    console.log(`✓ ${name} ${size}x${size}`);
  }
}

await buildOg();
await buildIcons();
console.log("Listo.");
