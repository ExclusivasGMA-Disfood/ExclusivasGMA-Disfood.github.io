// ===== GMA V6 · session continuity, graceful degradation and micro-UX =====
(function(){
  const $=id=>document.getElementById(id);
  const sessionBar=$('sessionBar'), saveEl=$('saveState'), networkEl=$('networkState'), offlineBanner=$('offlineBanner');
  let savePulse;
  function sessionActive(){return favIds().length>0 || (clientName||'').trim();}
  function updateSessionBar(){
    if(!sessionBar)return;
    const active=sessionActive(); sessionBar.classList.toggle('show',!!active);
    if(!active)return;
    $('sessionTitle').textContent=(clientName||'').trim() || 'Selección en curso';
    const n=favIds().length;
    $('sessionSummary').textContent=`${n} ${n===1?'referencia':'referencias'}`;
  }
  function setSaveState(state){
    if(!saveEl)return; clearTimeout(savePulse); saveEl.className='save-state '+state;
    saveEl.textContent=state==='saving'?'Guardando…':state==='error'?'No guardado':'Guardado';
    
  }
  const oldSave=saveState;
  saveState=async function(){setSaveState('saving');try{const r=await oldSave();setSaveState(r?'saved':'error');updateSessionBar();return r}catch(e){setSaveState('error');updateSessionBar()}};
  const oldStats=updateStats;
  updateStats=function(){oldStats();updateSessionBar();};

  function editClient(){
    const next=prompt('Nombre del cliente o restaurante:',clientName||'');
    if(next===null)return; clientName=next.trim(); const input=$('clientInput');if(input)input.value=clientName;saveState();updateSessionBar();
  }
  $('sessionClientEdit')?.addEventListener('click',editClient);
  $('sessionClientEdit')?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();editClient()}});
  $('resumeVisitBtn')?.addEventListener('click',()=>{closeSheet();setTimeout(()=>document.getElementById('navSelection')?.focus({preventScroll:true}),180)});
  $('copyRefsBtn')?.addEventListener('click',async()=>{
    const ids=favIds();if(!ids.length){showToast('No hay referencias seleccionadas');return}
    const text=ids.map(id=>{const it=findItem(id);return `${it.ref} · ${it.n} · Cant. ${favs[id]}`}).join('\n');
    try{await navigator.clipboard.writeText(text);showToast('Referencias copiadas')}catch(e){showToast('No se pudieron copiar las referencias')}
  });

  function updateNetwork(){
    const online=navigator.onLine; if(networkEl)networkEl.innerHTML=`<i class="session-dot ${online?'':'offline'}"></i>${online?'Online':'Sin conexión'}`;
    offlineBanner?.classList.toggle('show',!online);
    if(online)setTimeout(()=>offlineBanner?.classList.remove('show'),900);
  }
  addEventListener('online',()=>{updateNetwork();showToast('Conexión recuperada')});addEventListener('offline',updateNetwork);updateNetwork();

  // Protect against missing third-party PDF libraries and incomplete CDN loading.
  const oldPdf=generatePdf;
  generatePdf=function(){
    if(!window.jspdf || !window.jspdf.jsPDF || typeof window.jspdf.jsPDF.API.autoTable!=='function'){
      showToast('Generador PDF no disponible; copiando la propuesta');copyProposalAsPdfFallback();return;
    }
    try{return oldPdf()}catch(e){console.error(e);copyProposalAsPdfFallback();}
  };

  // Keep mobile bottom navigation out of the way while typing.
  const vv=window.visualViewport;
  function keyboardState(){if(!vv)return;document.documentElement.classList.toggle('keyboard-open',window.innerHeight-vv.height>180)}
  vv?.addEventListener('resize',keyboardState,{passive:true});

  // Avoid accidental data loss when leaving a recently edited selection.
  let dirtyUntil=0;
  document.addEventListener('input',e=>{if(e.target.matches('#clientInput'))dirtyUntil=Date.now()+4000},{passive:true});
  addEventListener('beforeunload',e=>{if(Date.now()<dirtyUntil){e.preventDefault();e.returnValue=''}});

  // Ensure sheet and product controls expose current state to assistive technology.
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.add-btn');if(btn)btn.setAttribute('aria-pressed',String(favs.hasOwnProperty(btn.dataset.id)));
  },true);

  setTimeout(()=>{updateSessionBar();updateNetwork()},350);
})();
