// Atajos útiles para uso comercial en ordenador
window.addEventListener('keydown',(e)=>{
  const tag=(document.activeElement&&document.activeElement.tagName)||'';
  if(e.key==='/' && !['INPUT','TEXTAREA'].includes(tag) && !document.querySelector('.sheet.in')){
    e.preventDefault(); if(!document.getElementById('siteHeader').classList.contains('search-open')) document.getElementById('topSearchToggle').click(); else document.getElementById('searchInput').focus();
  }
  if(e.key==='Escape' && document.activeElement===document.getElementById('searchInput') && document.getElementById('searchInput').value){
    document.getElementById('searchInput').value='';
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
    document.getElementById('searchInput').blur();
  }
});
