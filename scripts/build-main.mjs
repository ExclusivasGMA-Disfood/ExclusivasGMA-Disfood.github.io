// Main-site delivery assets. Shared source files and /nuevo/ stay unchanged.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {minify} from 'terser';
import sharp from 'sharp';
const check=process.argv.includes('--check');
const read=p=>fs.readFile(p,'utf8');
const hash=b=>createHash('sha256').update(b).digest('hex').slice(0,12);
const runtime=['runtime','pdf-loader','keyboard'];
const app=['catalog','navigation-position','views','selection-review','session','resize','polish','discovery','image-framing','topbar','desktop','brands'];
const styles=['catalog-base','catalog-components','brands','palette'];
const outputs=new Map();
const catalog=await read('data/catalog-data.js');
const context={window:{}};vm.runInNewContext(catalog,context);
const refs=Object.values(context.window.GMA_CATALOG_CURATION).flat();
const manifest=JSON.parse(await read('data/images-manifest.json'));
const variants={};let originalBytes=0,smallBytes=0;
for(const ref of refs){
 const urls=[manifest[ref]].flat().filter(Boolean);
 const source=urls.find(s=>/-producto-tre-archi\./.test(s))||urls[0];
 if(!source)continue;
 const bytes=await fs.readFile(source),meta=await sharp(bytes).metadata();
 const entries=[];originalBytes+=bytes.length;
 for(const width of [320,640]){
  if(meta.width<=width)continue;
  const buffer=await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:85}).toBuffer();
  if(buffer.length>=bytes.length)continue;
  const target=`images/thumbnails/${ref}-${hash(bytes)}-${width}.webp`;
  outputs.set(target,buffer);entries.push(`${target} ${width}w`);
  if(width===320)smallBytes+=buffer.length;
 }
 if(entries.length)variants[source]={set:entries.join(', '),width:meta.width};
 else smallBytes+=bytes.length;
}
const helper=`function mainDiscoveryImageAttrs(source){const v=${JSON.stringify(variants)}[source.split('?')[0]];return v?' srcset="'+v.set+', '+source+' '+v.width+'w" sizes="164px"':'';}\n`;
async function bundle(names,discovery=false){
 const chunks=[];
 if(discovery)chunks.push(helper);
 for(const name of names){
  let source=await read(`assets/${name}.js`);
  if(discovery&&name==='discovery'){
   const needle='src="${imageUrl}" alt=""';
   if(source.split(needle).length!==2)throw new Error('Discovery template changed; review image attributes');
   source=source.replace(needle,'src="${imageUrl}"${mainDiscoveryImageAttrs(imageUrl)} alt=""');
  }
  // Minify each classic script separately, preserving globals and execution order.
  chunks.push((await minify(source,{compress:false,mangle:false,format:{comments:false}})).code);
 }
 return chunks.join('\n;\n')+'\n';
}
outputs.set('assets/main-runtime.min.js',await bundle(runtime));
outputs.set('assets/main-app.min.js',await bundle(app,true));
outputs.set('assets/main-styles.css',(await Promise.all(styles.map(n=>read(`assets/${n}.css`)))).join('\n'));
let html=await read('index.html');
// Works both on the initial source HTML and subsequent builds.
const localCss=/<link rel="stylesheet" href="assets\/(?:catalog-base|catalog-components|brands|palette|main-styles)\.css[^"\n]*">/g;
let first=true;
html=html.replace(localCss,()=>{if(!first)return '';first=false;return `<link rel="stylesheet" href="assets/main-styles.css?v=${hash(outputs.get('assets/main-styles.css'))}">`;});
const group=(names,target)=>{
 const pattern=new RegExp('<script src="assets/(?:'+names.join('|')+'|'+target.replaceAll('.','\\.')+')\\.js[^"\\n]*"></script>','g');
 let seen=false;
 html=html.replace(pattern,()=>{if(seen)return '';seen=true;return `<script src="assets/${target}.js?v=${hash(outputs.get(`assets/${target}.js`))}"></script>`;});
 if(!seen)throw new Error(`Missing script group ${target}`);
};
group(runtime,'main-runtime.min');group(app,'main-app.min');
outputs.set('index.html',html);
for(const [path,content] of outputs){
 const data=Buffer.from(content);
 if(check){const actual=await fs.readFile(path).catch(()=>Buffer.alloc(0));if(!actual.equals(data))throw new Error(`Stale ${path}; run npm run build:main`);}
 else {await fs.mkdir(path.slice(0,path.lastIndexOf('/'))||'.',{recursive:true});await fs.writeFile(path,data);}
}
console.log(`${check?'Checked':'Built'} ${outputs.size} main assets; showcase originals ${originalBytes} bytes, 320px variants ${smallBytes} bytes.`);
