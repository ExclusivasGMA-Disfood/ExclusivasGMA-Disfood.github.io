// ===== GMA V3 interactions =====
(function(){
  const body=document.body;
  const guide=document.getElementById('guideCard');
  if(GMAStorage.getItem('gma-guide-hidden')==='1') guide?.remove();
  document.getElementById('guideClose')?.addEventListener('click',()=>{guide.remove();GMAStorage.setItem('gma-guide-hidden','1');setControlsHeight();});

  function setView(view){
    if(view==='compact') view='carousel';
    if(!['standard','carousel','visual'].includes(view)) view='standard';
    body.classList.remove('compact-view','carousel-view','visual-view');
    if(view==='carousel') body.classList.add('carousel-view');
    if(view==='visual') body.classList.add('visual-view');
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
    GMAStorage.setItem('gma-catalog-view',view);
    window.GMA_REFRESH_DEFERRED_GROUPS?.();
  }
  document.querySelectorAll('.view-btn').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
  setView(GMAStorage.getItem('gma-catalog-view')||'standard');

  const goTop=()=>window.scrollTo({top:0,behavior:'smooth'});
  document.getElementById('navHome').onclick=goTop;
  document.getElementById('navSearch').onclick=()=>{if(!document.getElementById('siteHeader').classList.contains('search-open'))document.getElementById('topSearchToggle').click();else document.getElementById('searchInput').focus({preventScroll:true})};
  document.getElementById('navIndex').onclick=()=>openIndex();
  document.getElementById('heroIndexBtn').onclick=()=>openIndex();
  document.getElementById('navSelection').onclick=()=>{ if(favIds().length) openSheet(); else showToast('Aún no has seleccionado productos'); };

  const originalUpdateStats=updateStats;
  updateStats=function(){
    originalUpdateStats();
    const n=favIds().length, badge=document.getElementById('navCount');
    badge.textContent=n; badge.classList.toggle('show',n>0);
  };

  // ensure badge reflects restored state after asynchronous load
  setTimeout(()=>updateStats(),250);
})();
