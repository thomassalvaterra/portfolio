// Genera versioni .webp ridimensionate delle immagini in /public.
// Uso: npm run images  (gli originali restano dove sono)
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'

const PUBLIC = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

// cartella -> larghezza massima
const targets = [
  { dir: 'project', width: 1600 },
  { dir: 'work', width: 900 },
  { dir: 'brand', width: 360, trim: true },
  { dir: '.', width: 900, only: ['Thomas.png'] },
  { dir: '.', width: 256, only: ['logo.png'], out: 'logo-sm' }
]

for (const { dir, width, only, out, trim } of targets) {
  const folder = join(PUBLIC, dir)
  const files = (await readdir(folder)).filter(
    (f) => /\.(png|jpe?g)$/i.test(f) && (!only || only.includes(f))
  )

  for (const file of files) {
    const name = out || parse(file).name
    const dest = join(folder, `${name}.webp`)
    let img = sharp(join(folder, file))
    // i loghi hanno molto margine vuoto: lo taglia, così hanno tutti la stessa scala
    if (trim) img = sharp(await img.trim({ threshold: 40 }).toBuffer())
    const info = await img
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest)
    console.log(`${join(dir, file)} -> ${name}.webp (${Math.round(info.size / 1024)} KB)`)
  }
}

// logo PixelAi: dall'originale ricevuto, ridimensionato
const SRC = new URL('../assets-src/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const pixel = await sharp(join(SRC, 'PixelAi.webp'))
  .resize({ width: 900 })
  .webp({ quality: 85 })
  .toFile(join(PUBLIC, 'brand', 'PixelAi.webp'))
console.log(`assets-src/PixelAi.webp -> PixelAi.webp (${Math.round(pixel.size / 1024)} KB)`)
