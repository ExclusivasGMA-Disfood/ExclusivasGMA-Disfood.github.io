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
  window.eval(scripts.join('\n;\n')+'\nwindow.testStorage=GMAStorage;window.testLoadScript=loadExternalScript;window.testGeneratePdf=generatePdf;');
  await new Promise(resolve=>setTimeout(resolve,50));
  return window;
}
for(const page of ['index.html','nuevo/index.html']){
 test(`${page}: catálogo, escaparates, familias y recorrido`,async()=>{
  const w=await app(page);try{
    const d=w.document;
    assert.equal(d.querySelectorAll('#newDiscovery .discovery-card').length,30);
    assert.equal(d.querySelectorAll('#bestDiscovery .discovery-card').length,25);
    assert.match(d.querySelector('#desktopResultMeta').textContent,/1001/);
    assert.equal(d.querySelectorAll('.desktop-product-card').length,72);
    const button=d.querySelector('.desktop-dept-button');const name=button.dataset.desktopDept;
    button.click();assert.equal(d.querySelector(`[data-desktop-dept="${name}"]`).getAttribute('aria-expanded'),'false');
    d.querySelector(`[data-desktop-dept="${name}"]`).click();assert.equal(d.querySelector(`[data-desktop-dept="${name}"]`).getAttribute('aria-expanded'),'true');
    d.querySelector('#desktopExpandAll').click();assert.match(d.querySelector('#desktopResultMeta').textContent,/1001/);
    d.querySelector('.desktop-more-button').click();assert.equal(d.querySelectorAll('.desktop-product-card').length,144);
    while(d.querySelector('.desktop-more-button'))d.querySelector('.desktop-more-button').click();
    assert.equal(d.querySelectorAll('.desktop-product-card').length,1001);
    assert.equal(new Set([...d.querySelectorAll('.desktop-product-card')].map(e=>e.dataset.id)).size,1001);
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
