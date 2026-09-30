import fs from 'node:fs/promises';
import vm from 'node:vm';
export async function buildTaxonomy(){
 const taxonomy=JSON.parse(await fs.readFile('data/main-taxonomy.json','utf8'));
 const context={window:{}};vm.runInNewContext(await fs.readFile('data/catalog-data.js','utf8'),context);
 const old=context.window.GMA_CATALOG_DATA,lookup=new Map(old.flatMap(g=>g.items.map(i=>[String(i.ref),{g,i}])));
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const used=new Set(),groups=[],departments=[],aliases={};
 for(const family of taxonomy.families){
  const previous=context.window.GMA_CATALOG_DEPARTMENTS.find(d=>d.name===family.legacyName);
  departments.push({name:family.name,icon:previous?.icon||'',legacyName:family.legacyName});
  for(const sub of family.subfamilies){
   if(!sub.refs.length)continue;
   const items=sub.refs.map(ref=>{
    if(used.has(ref)||!lookup.has(ref))throw new Error('Duplicate or unknown taxonomy reference '+ref);
    used.add(ref);const {g,i}=lookup.get(ref);const name=normalize(i.n);const tags=[];
    if(/halal/.test(name))tags.push('Halal');
    if(/encargo/i.test(g.title)||/encargo/.test(name))tags.push('Por encargo');
    if(/congel|\bi\.?q\.?f\b|\bcng\b|\bcong\b/.test(name)||/IQF/.test(g.title)||g.title==='Congelados')tags.push('Congelado');
    if(!tags.includes('Congelado')&&/refrigerad/.test(name))tags.push('Refrigerado');
    if(g.dept==='Navidad'||/navidad/.test(name))tags.push('Selección de Navidad');
    return {...i,sub:null,classificationSource:{title:g.title,dept:g.dept},catalogTags:tags,
      s:normalize([i.s,i.sub,g.title,g.dept,family.name,sub.title,...tags].filter(Boolean).join(' '))};
   });
   const original=lookup.get(sub.refs[0]).g;
   aliases[sub.title]=original.title;
   groups.push({title:sub.title,dept:family.name,color:original.color,items,s:normalize(family.name+' '+sub.title)});
  }
 }
 if(used.size!==lookup.size)throw new Error('Unclassified references: '+[...lookup.keys()].filter(r=>!used.has(r)).join(','));
 // Format variants must remain together so one grouped card retains all choices.
 const formats={window:{}};vm.runInNewContext(await fs.readFile('data/product-formats.js','utf8'),formats);
 for(const f of formats.window.GMA_PRODUCT_FORMATS||[]){const owners=new Set(f.formats.map(([ref])=>groups.find(g=>g.items.some(i=>i.ref===ref))));if(owners.size!==1||owners.has(undefined))throw new Error('Split format group: '+f.name);}
 return '// Generated from catalog-data.js and main-taxonomy.json. Main site only.\n'+
 `window.GMA_CATALOG_DATA=${JSON.stringify(groups)};\nwindow.GMA_CATALOG_DEPARTMENTS=${JSON.stringify(departments)};\nwindow.GMA_CATALOG_CURATION=${JSON.stringify(context.window.GMA_CATALOG_CURATION)};\nwindow.GMA_SUBFAMILY_ALIASES=${JSON.stringify(aliases)};\n`;
}
