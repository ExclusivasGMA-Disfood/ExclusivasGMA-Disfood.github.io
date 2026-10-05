import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const input=new URL('../data/product-details.json',import.meta.url);
const output=new URL('../data/product-specs.js',import.meta.url);
const specs=JSON.parse(readFileSync(input,'utf8'));
const fields=new Set(['title','completeness','facts','ingredients','imageNote','origin']);
for(const [ref,entry] of Object.entries(specs)){
 if(Object.keys(entry).some(key=>!fields.has(key))||!entry.title||!Array.isArray(entry.facts)||!entry.facts.length)throw new Error(`Ficha no válida: ${ref}`);
 if(!['with-ingredients','facts-only'].includes(entry.completeness))throw new Error(`Estado de ficha no válido: ${ref}`);
 if((entry.completeness==='with-ingredients')!==Boolean(entry.ingredients))throw new Error(`Ingredientes incoherentes: ${ref}`);
 if(entry.facts.some(row=>!Array.isArray(row)||row.length!==2||row.some(value=>typeof value!=='string'||!value.trim())))throw new Error(`Datos de ficha no válidos: ${ref}`);
}
const content=`window.GMA_VERIFIED_PRODUCT_INFO = ${JSON.stringify(specs)};\n`;
if(process.argv.includes('--check')){
 if(readFileSync(output,'utf8')!==content)throw new Error(`${fileURLToPath(output)} no está actualizado`);
}else writeFileSync(output,content);
console.log(`${Object.keys(specs).length} fichas de producto verificadas`);
