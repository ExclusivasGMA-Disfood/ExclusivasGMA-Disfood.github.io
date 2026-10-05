// Seasonal selection shares references with their permanent family.
document.querySelector('[data-menu-action="christmas"]')?.addEventListener('click',()=>{
  clearAllFilters();
  searchInput.value='navidad';
  commitSearch();
});

// Main-menu destinations account for the fixed header and mobile controls.
let mainMenuFrame=0;
function mainMenuNavigate(destination){
  cancelAnimationFrame(mainMenuFrame);
  document.getElementById('topMenuToggle')?.focus({preventScroll:true});
  const align=()=>{
    if(destination==='home'){scrollImmediately(0);return;}
    const desktop=document.getElementById('desktopCatalog');
    const isDesktop=desktop&&getComputedStyle(desktop).display!=='none';
    const target=destination==='brands'?document.getElementById('gmaBrandsTitle'):(isDesktop?desktop:groupsEl);
    if(!target)return;
    const headerHeight=document.getElementById('siteHeader').getBoundingClientRect().height;
    const controlsHeight=isDesktop?0:controls.offsetHeight;
    scrollImmediately(window.scrollY+target.getBoundingClientRect().top-headerHeight-controlsHeight-12);
  };
  pauseGroupVirtualization();
  align();
  mainMenuFrame=requestAnimationFrame(()=>{
    align();resumeGroupVirtualization();
    mainMenuFrame=requestAnimationFrame(align);
  });
}
