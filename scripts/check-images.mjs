import fs from 'node:fs';
import sharp from 'sharp';
const manifest=JSON.parse(fs.readFileSync('data/images-manifest.json','utf8'));
const files=[...new Set(Object.values(manifest).flat())];
let failures=[];
for(const file of files){
  try{
    const bytes=fs.readFileSync(file);
    if(file.endsWith('.svg')){if(!/<svg\b/.test(bytes.toString())||!/<\/svg>/.test(bytes.toString()))throw Error('SVG no válido');}
    else await sharp(bytes,{failOn:'warning'}).raw().toBuffer();
  }catch(error){failures.push(`${file}: ${error.message}`);}
}
if(failures.length)throw Error(failures.join('\n'));
console.log(`${files.length} imágenes verificadas; sin archivos corruptos`);
