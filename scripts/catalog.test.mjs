import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {Window} from 'happy-dom';

async function app(page='index.html',width=1366,height=900){
  const window=new Window({url:'https://catalog.test/'+(page.startsWith('nuevo')?'nuevo/':''),width,height,settings:{disableJavaScriptFileLoading:true,disableCSSFileLoading:true,enableJavaScriptEvaluation:true,suppressInsecureJavaScriptEnvironmentWarning:true}});
  const match=window.matchMedia.bind(window);
  // Happy DOM does not implement comma-separated media alternatives correctly.
  window.matchMedia=query=>{const result=match(query.split(',')[0]);Object.defineProperty(result,'matches',{value:query.split(',').some(q=>match(q.trim()).matches)});return result;};
  window.scrollTo=()=>{};window.HTMLElement.prototype.scrollIntoView=()=>{};
  window.HTMLElement.prototype.getClientRects=function(){return this.closest('[hidden],[inert]')?[]:[{width:40,height:40}];};
  window.fetch=async()=>({ok:true,json:async()=>JSON.parse(fs.readFileSync('data/images-manifest.json','utf8'))});
  window.document.write(fs.readFileSync(page,'utf8').replace(/<script\b[\s\S]*?<\/script>/g,''));
  const scripts=[];
  for(const m of fs.readFileSync(page,'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
    if(m[1].includes('application/ld+json'))continue;
    const src=m[1].match(/src="([^"?]+)/)?.[1];
    scripts.push(src?fs.readFileSync(src,'utf8'):m[2]);
  }
  window.eval(scripts.join('\n;\n')+'\nwindow.testStorage=GMAStorage;window.testLoadScript=loadExternalScript;window.testGeneratePdf=generatePdf;window.testFilter=(q,sel=false)=>{searchTerm=q;selectedOnly=sel;currentVisibleGroups().forEach(g=>{openDepts.add(g.dept);openGroups.add(g.title);});render();};window.testData=DATA;window.testVisible=()=>getVisibleItemsForGroup(DATA[5],5).items;');
  await new Promise(resolve=>setTimeout(resolve,50));
  return window;
}
for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: catálogo, escaparates, familias y recorrido`,async()=>{
  const w=await app(page);try{
    const d=w.document;
    assert.equal(d.querySelectorAll('#newDiscovery .discovery-card').length,6);
    assert.equal(d.querySelectorAll('#bestDiscovery .discovery-card').length,8);
    assert.match(d.querySelector('#desktopResultMeta').textContent,/994/);
    assert.equal(d.querySelectorAll('.desktop-product-card').length,72);
    const button=d.querySelector('.desktop-dept-button');const name=button.dataset.desktopDept;
    button.click();assert.equal(d.querySelector(`[data-desktop-dept="${name}"]`).getAttribute('aria-expanded'),'false');
    d.querySelector(`[data-desktop-dept="${name}"]`).click();assert.equal(d.querySelector(`[data-desktop-dept="${name}"]`).getAttribute('aria-expanded'),'true');
    d.querySelector('#desktopExpandAll').click();assert.match(d.querySelector('#desktopResultMeta').textContent,/994/);
    d.querySelector('.desktop-more-button').click();assert.equal(d.querySelectorAll('.desktop-product-card').length,144);
    while(d.querySelector('.desktop-more-button'))d.querySelector('.desktop-more-button').click();
    assert.equal(d.querySelectorAll('.desktop-product-card').length,994);
    assert.equal(new Set([...d.querySelectorAll('.desktop-product-card')].map(e=>e.dataset.id)).size,994);
    d.querySelector('#desktopExpandAll').click();assert.equal(d.querySelector('#desktopExpandAll').getAttribute('aria-expanded'),'false');
    d.querySelector('#desktopExpandAll').click();assert.equal(d.querySelector('#desktopExpandAll').getAttribute('aria-expanded'),'true');
    d.querySelector('.desktop-group-button').click();const size=d.querySelectorAll('.desktop-product-card').length;
    d.querySelector('.desktop-product-open').focus();d.querySelector('.desktop-product-open').click();
    await new Promise(r=>setTimeout(r,30));
    assert.equal(d.querySelector('#productSheet').getAttribute('aria-hidden'),'false');
    assert.ok(d.querySelector('#productSheet').contains(d.activeElement));
    assert.match(d.querySelector('#productPosition').textContent,new RegExp(`de ${size}$`));
    d.querySelector('#productClose').click();
    assert.equal(d.querySelector('#productSheet').getAttribute('aria-hidden'),'true');
    assert.ok(d.activeElement.classList.contains('desktop-product-open'));
  }finally{await w.happyDOM.close();}
 });
 test(`${page}: error de imagen conserva controles y se recupera`,async()=>{
  const w=await app(page);try{
    const d=w.document;d.querySelector('.discovery-open').click();
    const image=d.querySelector('.product-visual img'),parent=image.parentElement;
    const controls=[...parent.querySelectorAll('button')];assert.ok(controls.length>=3);
    image.dispatchEvent(new w.Event('error'));
    assert.ok(image.hidden);assert.equal(parent.querySelectorAll('button').length,controls.length);
    assert.ok(parent.querySelector('.image-fallback'));
    image.dispatchEvent(new w.Event('load'));assert.equal(image.hidden,false);assert.equal(parent.querySelector('.image-fallback'),null);
  }finally{await w.happyDOM.close();}
 });
 test(`${page}: no confirma guardado cuando falla localStorage`,async()=>{
  const w=await app(page);try{
    w.testStorage.setItem=()=>false;
    w.document.querySelector('.discovery-add').click();await new Promise(r=>setTimeout(r,20));
    assert.equal(w.document.querySelector('#saveState').textContent,'No guardado');
    await new Promise(r=>setTimeout(r,950));assert.equal(w.document.querySelector('#saveState').textContent,'No guardado');
  }finally{await w.happyDOM.close();}
 });
}
test('PDF: un recurso fallido se elimina y el reintento crea otro',async()=>{
 const scripts=[];
 const context=vm.createContext({window:{},setTimeout,clearTimeout,document:{
   createElement(){return {remove(){this.removed=true;}};},head:{appendChild(script){scripts.push(script);}}
 }});
 vm.runInContext(fs.readFileSync('assets/pdf-loader.js','utf8'),context);
 const first=vm.runInContext("loadExternalScript('export.js').catch(()=>false)",context);
 const script=scripts[0];script.onerror();assert.equal(await first,false);assert.equal(script.removed,true);
 const second=vm.runInContext("loadExternalScript('export.js')",context);
 assert.equal(scripts.length,2);assert.notEqual(scripts[1],script);scripts[1].onload();await second;
});

test('PDF: documento real con selección extensa y sin precios',async()=>{
 const w=await app();try{
   w.eval(fs.readFileSync('assets/vendor/jspdf.umd.min.js','utf8'));
   w.eval(fs.readFileSync('assets/vendor/jspdf.plugin.autotable.min.js','utf8'));
   const Real=w.jspdf.jsPDF;let bytes;
   function Capture(...args){const doc=new Real(...args);doc.save=()=>{bytes=doc.output('arraybuffer');};return doc;}
   Capture.API=Real.API;w.jspdf.jsPDF=Capture;
   for(const button of [...w.document.querySelectorAll('.desktop-add')].slice(0,60))button.click();
   await w.testGeneratePdf();
   assert.ok(bytes,'Se debe producir un PDF real');
   const pdf=Buffer.from(bytes).toString('latin1');assert.ok(pdf.startsWith('%PDF-'));assert.match(pdf,/Ref\./);assert.doesNotMatch(pdf,/Precio|PVP/);
   assert.ok((pdf.match(/\/Type \/Page\b/g)||[]).length>1,'La selección extensa ocupa varias páginas');
 }finally{await w.happyDOM.close();}
});

for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: paneles exclusivos, cierre y foco`,async()=>{
  const w=await app(page);try{const d=w.document;
   d.querySelector('#topSearchToggle').click();
   assert.equal(d.activeElement.id,'searchInput');
   assert.equal(d.querySelector('#topSearchPanel').getAttribute('aria-hidden'),'false');
   d.querySelector('#topSelection').click();
   assert.equal(d.querySelector('#topSearchPanel').inert,true);
   assert.equal(d.querySelector('#accountDialog').getAttribute('aria-hidden'),'false');
   d.querySelector('#topMenuToggle').click();
   assert.equal(d.querySelector('#accountDialog').inert,true);
   assert.equal(d.querySelector('#topMenuPanel').getAttribute('aria-hidden'),'false');
   d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
   assert.equal(d.querySelector('#topMenuPanel').inert,true);
   assert.equal(d.activeElement.id,'topMenuToggle');
  }finally{await w.happyDOM.close();}
 });
 test(`${page}: el scroll marca la familia sin filtrar ni reemplazar productos`,async()=>{
  const w=await app(page);try{const d=w.document;
   const cards=[...d.querySelectorAll('.desktop-product-card')],ids=cards.map(e=>e.dataset.id);
   let offset=0;
   cards.forEach((el,i)=>el.getBoundingClientRect=()=>({top:i*140-offset,bottom:(i+1)*140-offset,height:140}));
   const target=cards.findIndex(e=>e.dataset.id.split('-')[0]!==cards[0].dataset.id.split('-')[0]);
   assert.ok(target>0);offset=target*140;
   w.dispatchEvent(new w.Event('scroll'));await new Promise(r=>setTimeout(r,40));
   assert.equal(d.querySelector('[aria-current="location"]').dataset.desktopGroup,cards[target].dataset.id.split('-')[0]);
   assert.deepEqual([...d.querySelectorAll('.desktop-product-card')].map(e=>e.dataset.id),ids);
   assert.equal(d.querySelector('.desktop-product-card'),cards[0]);
   offset=0;w.dispatchEvent(new w.Event('scroll'));await new Promise(r=>setTimeout(r,40));
   assert.equal(d.querySelector('[aria-current="location"]').dataset.desktopGroup,cards[0].dataset.id.split('-')[0]);
  }finally{await w.happyDOM.close();}
 });
}

for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: tomates Marzo agrupados, formatos y selección independiente`,async()=>{
  const w=await app(page);try{
   const d=w.document;
   w.testFilter('tomate marzo');
   const cards=[...d.querySelectorAll('.desktop-product-card')];
   assert.equal(cards.length,4,'Tres grupos de tomate y una mermelada');
   const frito=cards.find(c=>c.textContent.includes('Tomate frito · Marzo'));
   assert.ok(frito);frito.querySelector('.desktop-add').click();
   assert.equal(w.eval('favIds().length'),0,'El + pide formato, no elige una referencia silenciosamente');
   const select=d.querySelector('#productFormatSelect');assert.equal(select.options.length,3);
   const ids=[...select.options].map(o=>o.value);
   for(const id of ids.slice(0,2)){
    const picker=d.querySelector('#productFormatSelect');picker.value=id;picker.dispatchEvent(new w.Event('change'));
    const ref=w.eval(`findItem('${id}').ref`);
    assert.match(d.querySelector('.product-detail-ref').textContent,new RegExp(ref));
    d.querySelector('#productSelectBtn').click();
    await new Promise(r=>setTimeout(r,20));
   }
   assert.equal(w.eval('favIds().length'),2);
   assert.ok([...d.querySelectorAll('.desktop-selection-name')].every(e=>/250 GR|580 GR/i.test(e.textContent)));
   assert.match(d.querySelector('#productPosition').textContent,/de 4$/);
   // A reference search must select the matching format, even if it is not the first card.
   d.querySelector('#productClose').click();
   w.testFilter('1988');
   assert.equal(d.querySelectorAll('.desktop-product-card').length,1);
   d.querySelector('.desktop-product-open').click();
   assert.match(d.querySelector('.product-detail-ref').textContent,/1988/);
   assert.equal(d.querySelector('#productFormatSelect').selectedOptions[0].textContent.includes('580 g'),true);
   d.querySelector('#productClose').click();
   w.testFilter('',true);
   assert.equal(d.querySelectorAll('.desktop-product-card').length,2,'La revisión muestra ambos formatos seleccionados');
   assert.equal(w.testData.reduce((n,g)=>n+g.items.length,0),1001,'No se elimina ninguna referencia');
   const mobileRefs=w.testVisible().map(x=>x.it.ref);
   assert.equal(mobileRefs.length,2);
   const saved=JSON.parse(w.localStorage.getItem('gma-catalog-state'));
   assert.equal(Object.keys(saved.favRefs).length,2);
   w.eval(fs.readFileSync('assets/vendor/jspdf.umd.min.js','utf8'));
   w.eval(fs.readFileSync('assets/vendor/jspdf.plugin.autotable.min.js','utf8'));
   const Real=w.jspdf.jsPDF;let pdfBytes;
   function Capture(...args){const doc=new Real(...args);doc.save=()=>{pdfBytes=doc.output('arraybuffer');};return doc;}
   Capture.API=Real.API;w.jspdf.jsPDF=Capture;
   await w.testGeneratePdf();
   const pdf=Buffer.from(pdfBytes).toString('latin1');
   assert.match(pdf,/1988/);assert.match(pdf,/1989/);assert.doesNotMatch(pdf,/1900/);

  }finally{await w.happyDOM.close();}
 });
}
