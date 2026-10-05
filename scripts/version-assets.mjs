import fs from 'node:fs';
import {createHash} from 'node:crypto';
const check=process.argv.includes('--check');
const hash=content=>createHash('sha256').update(content).digest('hex').slice(0,12);
const outputs=new Map();
const framing='assets/image-framing.js';
outputs.set(framing,fs.readFileSync(framing,'utf8').replace(/data\/image-framing\.json\?v=[^']+/,`data/image-framing.json?v=${hash(fs.readFileSync('data/image-framing.json'))}`));
let html=fs.readFileSync('nuevo/index.html','utf8');
html=html.replace(/(<(?:script|link)\b[^>]*(?:src|href)=")(assets\/[^"?]+\.(?:js|css)|data\/[^"?]+\.js)(?:\?[^"\s]*)?("[^>]*>)/g,(_,start,file,end)=>`${start}${file}?v=${hash(outputs.get(file)??fs.readFileSync(file))}${end}`);
outputs.set('nuevo/index.html',html);
for(const [file,content] of outputs){
 if(check){if(fs.readFileSync(file,'utf8')!==content)throw new Error(`Recurso desactualizado: ${file}`);}
 else fs.writeFileSync(file,content);
}
console.log('Versiones de recursos verificadas');
