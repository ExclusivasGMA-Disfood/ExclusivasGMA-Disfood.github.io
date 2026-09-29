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
  window.eval(scripts.join('\n;\n')+'\nwindow.testStorage=GMAStorage;window.testLoadScript=loadExternalScript;window.testGeneratePdf=generatePdf;window.testFilter=(q,sel=false)=>{searchTerm=q;selectedOnly=sel;currentVisibleGroups().forEach(g=>{openDepts.add(g.dept);openGroups.add(g.title);});render();};window.testData=DATA;window.testVisible=()=>getVisibleItemsForGroup(DATA.find(g=>g.title==="Huerta Nacional"),DATA.findIndex(g=>g.title==="Huerta Nacional")).items;');
  await new Promise(resolve=>setTimeout(resolve,50));
  return window;
}
for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: catálogo, escaparates, familias y recorrido`,async()=>{
  const w=await app(page);try{
    const d=w.document;
    assert.equal(d.querySelectorAll('#newDiscovery .discovery-card').length,6);
    assert.equal(d.querySelectorAll('#bestDiscovery .discovery-card').length,8);
    assert.match(d.querySelector('#desktopResultMeta').textContent,/991/);
    assert.equal(d.querySelectorAll('.desktop-product-card').length,72);
    const button=d.querySelector('.desktop-dept-button');const name=button.dataset.desktopDept;
    button.click();assert.equal(d.querySelector(`[data-desktop-dept="${name}"]`).getAttribute('aria-expanded'),'false');
    d.querySelector(`[data-desktop-dept="${name}"]`).click();assert.equal(d.querySelector(`[data-desktop-dept="${name}"]`).getAttribute('aria-expanded'),'true');
    d.querySelector('#desktopExpandAll').click();assert.match(d.querySelector('#desktopResultMeta').textContent,/991/);
    d.querySelector('.desktop-more-button').click();assert.equal(d.querySelectorAll('.desktop-product-card').length,144);
    while(d.querySelector('.desktop-more-button'))d.querySelector('.desktop-more-button').click();
    assert.equal(d.querySelectorAll('.desktop-product-card').length,991);
    assert.equal(new Set([...d.querySelectorAll('.desktop-product-card')].map(e=>e.dataset.id)).size,991);
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
   assert.equal(w.testData.reduce((n,g)=>n+g.items.length,0),999,'Se conserva el total vigente de referencias');
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
   assert.match(pdf,/Ref\. 1988\b/);assert.match(pdf,/Ref\. 1989\b/);assert.doesNotMatch(pdf,/Ref\. 1900\b/);

  }finally{await w.happyDOM.close();}
 });
}

for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: Dimardis agrupado con foto preferida y búsqueda exacta`,async()=>{
  const w=await app(page);try{
   const d=w.document;
   w.testFilter('tomate dimardis');
   const cards=[...d.querySelectorAll('.desktop-product-card')];
   assert.equal(cards.length,1);
   assert.match(cards[0].textContent,/2 formatos/);
   assert.match(cards[0].querySelector('img').getAttribute('src'),/2631-frontal\.jpg/);
   cards[0].querySelector('.desktop-add').click();
   assert.equal(d.querySelector('#productFormatSelect').options.length,2);
   assert.match(d.querySelector('.product-detail-ref').textContent,/2631/);
   const small=[...d.querySelector('#productFormatSelect').options].find(o=>o.textContent.includes('4830'));
   const select=d.querySelector('#productFormatSelect');select.value=small.value;select.dispatchEvent(new w.Event('change'));
   assert.match(d.querySelector('.product-detail-ref').textContent,/4830/);
   d.querySelector('#productClose').click();
   w.testFilter('4830');d.querySelector('.desktop-product-open').click();
   assert.match(d.querySelector('.product-detail-ref').textContent,/4830/);
   assert.equal(w.testData.reduce((n,g)=>n+g.items.length,0),999);
  }finally{await w.happyDOM.close();}
 });
}

test('Huerta: dos familias, legumbres reunidas y búsqueda por subgrupo',async()=>{
 const w=await app();try{
  const groups=w.testData.filter(g=>g.dept==='Conservas de la Huerta');
  assert.deepEqual(Array.from(groups,g=>g.title),['Huerta Nacional','Huerta Italia']);
  assert.equal(groups[0].items.length,47);assert.equal(groups[1].items.length,17);
  assert.equal(groups[0].items.filter(i=>i.sub==='Legumbres').length,9);
  w.testFilter('legumbres');assert.equal(w.document.querySelectorAll('.desktop-product-card').length,9);
  w.testFilter('tomate nacional');assert.equal(w.document.querySelectorAll('.desktop-product-card').length,7);
  w.testFilter('huerta italia');assert.equal(w.document.querySelectorAll('.desktop-product-card').length,17);
 }finally{await w.happyDOM.close();}
});

for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: cierre táctil sin confundir lectura, gesto corto ni desplazamiento lateral`,async()=>{
  const w=await app(page,390,844);try{
   const d=w.document,open=d.querySelector('.discovery-open'),sheet=d.querySelector('#productSheet');
   const touch=(el,type,x,y)=>{const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:type==='touchend'?[]:[{clientX:x,clientY:y}]},changedTouches:{value:[{clientX:x,clientY:y}]}});el.dispatchEvent(e);};
   const swipe=(el,dx,dy)=>{touch(el,'touchstart',100,100);touch(el,'touchmove',100+dx,100+dy);touch(el,'touchend',100+dx,100+dy);};
   open.click();let detail=d.querySelector('#productDetail');
   detail.scrollTop=120;swipe(detail,0,100);assert.equal(sheet.getAttribute('aria-hidden'),'false');
   detail.scrollTop=0;swipe(detail,100,10);assert.equal(sheet.getAttribute('aria-hidden'),'false');
   swipe(detail,0,35);assert.equal(sheet.getAttribute('aria-hidden'),'false');
   swipe(detail,0,100);assert.equal(sheet.getAttribute('aria-hidden'),'true');
   open.click();touch(d.querySelector('#productClose'),'touchend',100,100);assert.equal(sheet.getAttribute('aria-hidden'),'true');
   w.eval("openLightbox('images/products/2631-frontal.jpg','Tomate',null)");
   assert.ok(d.querySelector('#lightboxCloseTop svg'));
   touch(d.querySelector('#lightboxCloseTop'),'touchend',100,100);assert.equal(d.querySelector('#lightboxBackdrop').getAttribute('aria-hidden'),'true');
   w.eval("openLightbox('images/products/2631-frontal.jpg','Tomate',null)");
   swipe(d.querySelector('#lightboxImg'),0,100);assert.equal(d.querySelector('#lightboxBackdrop').getAttribute('aria-hidden'),'true');
  }finally{await w.happyDOM.close();}
 });
}

for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: cambiar vista y recoger conserva la familia leída después del primer bloque`,async()=>{
  const w=await app(page);try{
   const d=w.document;
   d.querySelector('.desktop-more-button').click();
   const card=d.querySelectorAll('.desktop-product-card')[100];
   const id=card.dataset.id,gi=Number(id.split('-')[0]);
   w.GMA_NAV.capture=()=>({id,gi,offset:0});
   w.GMA_NAV.restore=()=>{};
   d.querySelector('[data-desktop-view="visual"]').click();
   assert.ok(d.querySelector(`#desktopProducts [data-id="${id}"]`),'No perder productos cargados después de los primeros 72');
   d.querySelector('#desktopExpandAll').click();
   assert.ok(d.querySelector(`#desktopProducts [data-id="${id}"]`),'Recoger conserva la familia actual');
   assert.equal(d.querySelector('#desktopCatalogTitle').textContent,w.testData[gi].title);
   d.querySelector('#desktopExpandAll').click();
   assert.ok(d.querySelector(`#desktopProducts [data-id="${id}"]`),'Desplegar conserva el producto actual');
  }finally{await w.happyDOM.close();}
 });
}
