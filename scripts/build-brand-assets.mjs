// Deterministic icon exports; preserve the original catalogue logo.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
const source = 'images/gma-logo-catalogo.png';
const assets = [];
async function exportLogo(path, width, height, logoWidth) {
  const logo = await sharp(source).resize({ width: logoWidth }).toBuffer();
  await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .composite([{ input: logo, gravity: 'centre' }]).removeAlpha().png().toFile(path);
  assets.push({ path, width, height, background: '#ffffff' });
}
await exportLogo('images/brand/gma-share-v1.png', 1200, 630, 840);
for (const size of [32, 48, 192, 512]) {
  await exportLogo(`images/brand/gma-icon-${size}-v1.png`, size, size, Math.round(size * .82));
}
await exportLogo('apple-touch-icon.png', 180, 180, 148);
// ICO with a PNG payload, supported by modern desktop browsers.
const png = await sharp('images/brand/gma-icon-48-v1.png').toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 48; header[7] = 48;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
await writeFile('favicon.ico', Buffer.concat([header, png]));
assets.push({ path: 'favicon.ico', width: 48, height: 48, background: '#ffffff' });
await writeFile('data/brand-assets.json', JSON.stringify({ source, assets }, null, 2) + '\n');
