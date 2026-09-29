(function(){
  const deptSel=document.getElementById('deptFilterSelect');
  const famSel=document.getElementById('familyFilterSelect');
  const activeBar=document.getElementById('activeFilterBar');

  function populateDepartments(){
    if(!deptSel)return;
    deptSel.innerHTML='<option value="">Todas las secciones</option>';
    DEPTS.forEach(d=>{const o=document.createElement('option');o.value=d.name;o.textContent=d.name;deptSel.appendChild(o);});
  }
  window.populateFamilySelect=function(dept,selected){
    if(!famSel)return;
    const val=dept&&dept!=='all'?dept:'';
    const families=DATA.filter(g=>!val||g.dept===val).slice().sort((a,b)=>a.title.localeCompare(b.title,'es'));
    famSel.innerHTML='<option value="">Todas las familias</option>';
    families.forEach(g=>{const o=document.createElement('option');o.value=g.title;o.textContent=g.title;famSel.appendChild(o);});
    famSel.value=selected&&families.some(g=>g.title===selected)?selected:'';
    if(selected&&!famSel.value) stagedFamily='';
  };
  populateDepartments(); populateFamilySelect('all','');
  deptSel?.addEventListener('change',()=>{stagedDept=deptSel.value||'all';stagedFamily='';populateFamilySelect(stagedDept,'');});
  famSel?.addEventListener('change',()=>{stagedFamily=famSel.value||'';if(stagedFamily){const g=DATA.find(x=>x.title===stagedFamily);if(g){stagedDept=g.dept;deptSel.value=g.dept;}}});

  function activeParts(){
    const p=[];
    if(currentDept!=='all'&&!familyFilter)p.push(['dept',`Sección: ${currentDept}`]);
    if(familyFilter)p.push(['family',`Familia: ${familyFilter}`]);
    if(countryFilter&&!regionFilter)p.push(['country',`${{Nacional:'España',Francés:'Francia',Italiano:'Italia'}[countryFilter]||countryFilter}`]);
    if(regionFilter)p.push(['region',regionFilter]);
    if(searchTerm)p.push(['search','Búsqueda']);
    return p;
  }
  window.renderActiveFilters=function(){
    if(!activeBar)return;
    const parts=activeParts();
    activeBar.innerHTML=parts.map(([k,label])=>`<button class="active-filter-chip" type="button" data-clear="${k}" aria-label="Quitar filtro ${label}">${label} ×</button>`).join('')+(parts.length>1?'<button class="active-filter-chip active-filter-clear" type="button" data-clear="all">Limpiar</button>':'');
    activeBar.classList.toggle('show',parts.length>0);
  };
  function clearOne(k){
    if(k==='all'){clearAllFilters();renderActiveFilters();return;}
    if(k==='dept'){currentDept='all';familyFilter='';}
    if(k==='family')familyFilter='';
    if(k==='country'){countryFilter='';regionFilter='';}
    if(k==='region')regionFilter='';
    if(k==='search'){searchTerm='';const s=document.getElementById('searchInput');if(s)s.value='';document.getElementById('clearSearch')?.classList.remove('show');}
    updateFilterBadge();render();renderActiveFilters();scrollToResults();
  }
  activeBar?.addEventListener('click',e=>{const b=e.target.closest('[data-clear]');if(b)clearOne(b.dataset.clear);});

  // Keep active-filter bar synchronized with every render without changing the core renderer.
  const coreRender=render; render=function(){coreRender();renderActiveFilters();};

  function cardFor(it,id,badge){
    const imageUrl=imageUrlFor(it);
    const group=DATA[Number(String(id).split('-')[0])]||{};
    const famColor=group.color||'var(--teal)';
    const accessibleName=it.n.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const cardName=(it.discoveryName||it.n).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const photo=imageUrl?`<img class="${productPhotoCropClass(it)}" src="${imageUrl}" alt="" loading="lazy" decoding="async">`:`${categoryPlaceholderSvg(group.title)}${it.origin?`<span class="fam-origin">${it.origin}</span>`:''}`;
    const selected=Object.prototype.hasOwnProperty.call(favs,id);
    const icon=selected?CHECK_ICON:PLUS_ICON;
    return `<article class="discovery-card ${selected?'fav':''}" data-product-id="${id}">${badge?`<span class="discovery-badge">${badge}</span>`:''}<button class="discovery-open" type="button" aria-label="Ver ficha de ${accessibleName}"><span class="discovery-photo ${imageUrl?'':'placeholder'}" ${imageUrl?'':`style="--fam:${famColor}"`}>${photo}</span><span class="discovery-card-body"><span class="discovery-name">${cardName}</span><span class="discovery-ref">Ref. ${it.ref}</span></span></button><button class="discovery-add" type="button" data-id="${id}" aria-pressed="${selected}" aria-label="${selected?'Quitar de la selección':'Añadir a la selección'}: ${accessibleName}"><svg viewBox="0 0 24 24">${icon}</svg></button></article>`;
  }
  function findRef(ref){for(let gi=0;gi<DATA.length;gi++)for(let ii=0;ii<DATA[gi].items.length;ii++){const it=DATA[gi].items[ii];if(String(it.ref)===String(ref))return {it,id:itemId(gi,ii)}}return null;}
  const desktopShowcaseMedia=window.matchMedia('(min-width:1000px), (orientation:landscape) and (min-width:640px) and (max-width:999px)');
  function buildDiscovery(){
    /* Novedades seleccionadas por foto sobre blanco; todas conservan isNew. */
    const NOVEDADES_REFS=window.GMA_CATALOG_CURATION.new;
    const desktopShowcase=desktopShowcaseMedia.matches;
    const fresh=NOVEDADES_REFS.map(findRef).filter(Boolean);
    const freshHtml=fresh.map(x=>cardFor(x.it,x.id,'Nuevo')).join('');
    const newEl=document.getElementById('newDiscoveryScroll');if(newEl)newEl.innerHTML=freshHtml;
    const c=document.getElementById('newDiscoveryCount');if(c)c.textContent=`${fresh.length} referencias`;

    /* Selección editorial de ocho referencias con fotografía sobre blanco; no representa ventas medidas. */
    const FEATURED_REFS=window.GMA_CATALOG_CURATION.featured;
    const best=FEATURED_REFS.map(findRef).filter(Boolean),bestHtml=best.map(x=>cardFor(x.it,x.id,'Top')).join('');
    const count=document.getElementById('bestDiscoveryCount');if(count)count.textContent=`${best.length} referencias`;
    const bestEl=document.getElementById('bestDiscoveryScroll');if(bestEl)bestEl.innerHTML=bestHtml;
  }
  document.addEventListener('click',e=>{
    const add=e.target.closest('.discovery-add');
    if(add){
      e.preventDefault();e.stopPropagation();
      const id=add.dataset.id;toggleFav(id);
      const selected=Object.prototype.hasOwnProperty.call(favs,id);
      const card=add.closest('.discovery-card');card?.classList.toggle('fav',selected);
      add.setAttribute('aria-pressed',String(selected));
      add.setAttribute('aria-label',`${selected?'Quitar de la selección':'Añadir a la selección'}: ${findItem(id).n}`);
      const svg=add.querySelector('svg');if(svg)svg.innerHTML=selected?CHECK_ICON:PLUS_ICON;
      return;
    }
    const open=e.target.closest('.discovery-open');
    if(open){const c=open.closest('.discovery-card');if(c)openProduct(c.dataset.productId,open);}
  });
  window.GMA_REBUILD_DISCOVERY=buildDiscovery;
  buildDiscovery();
  desktopShowcaseMedia.addEventListener?.('change',buildDiscovery);
  window.GMA_IMAGE_MANIFEST_READY?.then(()=>buildDiscovery());

  function syncTopBarHeight(){
    const heroEl=document.querySelector('.gma-topbar');
    if(heroEl) document.documentElement.style.setProperty('--topbar-h', heroEl.getBoundingClientRect().height+'px');
  }
  syncTopBarHeight();
  window.addEventListener('resize', syncTopBarHeight);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(syncTopBarHeight);

  // Families now belong in Filters. Existing family/index shortcuts open the filter sheet.
  const openFilters=()=>openFilterPanel();
  const hi=document.getElementById('heroIndexBtn');if(hi)hi.onclick=openFilters;
  const mf=document.getElementById('catalogMainFilter');if(mf)mf.onclick=openFilters;
  const ni=document.getElementById('navIndex');if(ni)ni.onclick=openFilters;
  const ci=document.getElementById('catalogIndexBtn');if(ci)ci.onclick=openFilters;

  // ensure three-view switch stays synchronized and repaint is cheap
  document.querySelectorAll('.view-btn').forEach(b=>b.addEventListener('click',()=>{requestAnimationFrame(()=>setControlsHeight());}));
  renderActiveFilters();
})();
