// Main-site delivery assets. Shared source files and /nuevo/ stay unchanged.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {minify} from 'terser';
import sharp from 'sharp';
import {prerender} from './prerender-main.mjs';
const check=process.argv.includes('--check');
const read=p=>fs.readFile(p,'utf8');
const hash=b=>createHash('sha256').update(b).digest('hex').slice(0,12);
const runtime=['runtime','pdf-loader','keyboard'];
const app=['catalog','navigation-position','views','selection-review','session','resize','polish','discovery','image-framing','topbar','desktop','brands'];
const styles=['fonts-local','catalog-base','catalog-components','brands','palette'];
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
  if(discovery&&name==='catalog'){
   source=source.replace('const IMAGE_MANIFEST = Object.create(null);', 'const IMAGE_MANIFEST = '+JSON.stringify(manifest)+';');
  }
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
// Retain source paths in data attributes so regeneration remains deterministic.
const logoTags=[...html.matchAll(/<img\b[^>]*src="images\/(?:brands\/[^"]+|gma-logo-catalogo\.png)"[^>]*>/g)];
for(const [tag] of logoTags){
 const source=tag.match(/src="([^"]+)/)[1];
 const bytes=await fs.readFile(source);
 const buffer=await sharp(bytes).webp({quality:90,smartSubsample:true}).toBuffer();
 if(buffer.length>=bytes.length){html=html.replace(tag,tag.replace(/ srcset="[^"]*"/g,''));continue;}
 const target='images/optimized/'+hash(bytes)+'.webp';outputs.set(target,buffer);
 const replacement=tag.replace(/ srcset="[^"]*"/g,'').replace(/src="[^"]+"/, 'src="'+source+'" srcset="'+target+'"');
 html=html.replace(tag,replacement);
}
// Self-host the exact font families; preload the two principal faces.
html=html.replace(/<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>\n?/g,'');
const fontPreloads='<link rel="preload" as="font" href="assets/fonts/geist-400.woff2" type="font/woff2" crossorigin>\n<link rel="preload" as="font" href="assets/fonts/merriweather-700.woff2" type="font/woff2" crossorigin>';
if(!html.includes('href="assets/fonts/geist-400.woff2"'))html=html.replace('</head>',fontPreloads+'\n</head>');
// Works both on the initial source HTML and subsequent builds.
const localCss=/<link rel="stylesheet" href="assets\/(?:catalog-base|catalog-components|brands|palette|main-styles)\.css[^"\n]*">/g;
const inlineStyles='<style id="main-critical-styles">'+outputs.get('assets/main-styles.css').replaceAll('url(fonts/','url(assets/fonts/')+'</style>';
html=html.replace(/<style id="main-critical-styles">[\s\S]*?<\/style>/,()=>inlineStyles);
let first=true;
html=html.replace(localCss,()=>{if(!first)return '';first=false;return inlineStyles;});
const group=(names,target)=>{
 const pattern=new RegExp('<script src="assets/(?:'+names.join('|')+'|'+target.replaceAll('.','\\.')+')\\.js[^"\\n]*"></script>','g');
 let seen=false;
 html=html.replace(pattern,()=>{if(seen)return '';seen=true;return `<script src="assets/${target}.js?v=${hash(outputs.get(`assets/${target}.js`))}"></script>`;});
 if(!seen)throw new Error(`Missing script group ${target}`);
};
group(runtime,'main-runtime.min');group(app,'main-app.min');
html=await prerender(html,outputs);
outputs.set('index.html',html);
for(const [path,content] of outputs){
 const data=Buffer.from(content);
 if(check){const actual=await fs.readFile(path).catch(()=>Buffer.alloc(0));if(!actual.equals(data))throw new Error(`Stale ${path}; run npm run build:main`);}
 else {await fs.mkdir(path.slice(0,path.lastIndexOf('/'))||'.',{recursive:true});await fs.writeFile(path,data);}
}
console.log(`${check?'Checked':'Built'} ${outputs.size} main assets; showcase originals ${originalBytes} bytes, 320px variants ${smallBytes} bytes.`);
