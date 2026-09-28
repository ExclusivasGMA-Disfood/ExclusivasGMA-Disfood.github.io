// Load only when exporting; failed requests are removed so retry really reloads.
let pdfLibrariesPromise=null;
const externalScripts=new Map();
function loadExternalScript(src){
  if(externalScripts.has(src))return externalScripts.get(src);
  const promise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    const finish=error=>{clearTimeout(timer);script.onload=null;script.onerror=null;if(error){script.remove();externalScripts.delete(src);reject(error);}else resolve();};
    const timer=setTimeout(()=>finish(new Error('Tiempo de carga agotado')),12000);
    script.src=src;script.async=true;
    script.onload=()=>finish();script.onerror=()=>finish(new Error('No se pudo cargar el exportador'));
    document.head.appendChild(script);
  });
  externalScripts.set(src,promise);return promise;
}
function ensurePdfLibraries(){
  if(window.jspdf?.jsPDF?.API?.autoTable)return Promise.resolve();
  if(!pdfLibrariesPromise)pdfLibrariesPromise=loadExternalScript('assets/vendor/jspdf.umd.min.js')
    .then(()=>loadExternalScript('assets/vendor/jspdf.plugin.autotable.min.js'))
    .catch(error=>{pdfLibrariesPromise=null;throw error;});
  return pdfLibrariesPromise;
}
