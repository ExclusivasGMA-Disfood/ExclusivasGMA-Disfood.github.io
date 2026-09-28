(()=>{
  const root=document.getElementById('desktopCatalog');
  if(!root)return;
  const familyList=document.getElementById('desktopFamilyList');
  const products=document.getElementById('desktopProducts');
  const title=document.getElementById('desktopCatalogTitle');
  const breadcrumb=document.getElementById('desktopBreadcrumb');
  const meta=document.getElementById('desktopResultMeta');
  const selectionList=document.getElementById('desktopSelectionList');
  const selectionCount=document.getElementById('desktopSelectionCount');
  const desktopMedia=window.matchMedia('(min-width:1000px), (orientation:landscape) and (min-width:640px) and (max-width:999px)');
  const landscapeBrowseMedia=window.matchMedia('(orientation:landscape) and (min-width:640px) and (max-width:999px)');
  let desktopView=GMAStorage.getItem('gma-desktop-view')||'grid';
  let forcedGroup=null;
  let openDept=DEPTS[0]?.name||null;
  let desktopGroupFocused=false;
  let landscapeShowAll=true;
  let landscapeDepartmentFocus=null;
  const DESKTOP_BATCH=72;
  let desktopLimit=DESKTOP_BATCH;
  let desktopScopeKey='';

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const groupRows=()=>DATA.map((group,gi)=>({group,gi,visible:getVisibleItemsForGroup(group,gi).items}));
  const firstAllowedGroup=rows=>{
    if(familyFilter){const match=rows.find(row=>row.group.title===familyFilter&&row.visible.length);if(match)return match.gi;}
    if(currentDept!=='all'){const match=rows.find(row=>row.group.dept===currentDept&&row.visible.length);if(match)return match.gi;}
    return rows.find(row=>row.visible.length)?.gi ?? rows[0]?.gi ?? 0;
  };
  function activeGroupIndex(rows){
    const valid=rows.some(row=>row.gi===forcedGroup&&row.visible.length&&allowedRow(row));
    if(!valid)forcedGroup=firstAllowedGroup(rows);
    return forcedGroup;
  }
  function isBroadResult(){return !!(searchTerm||onlyNew||selectedOnly||countryFilter||regionFilter);}
  function allowedRow(row){
    if(currentDept!=='all'&&row.group.dept!==currentDept)return false;
    if(familyFilter&&row.group.title!==familyFilter)return false;
    return true;
  }
  function renderNavigation(rows,activeGi){
    familyList.innerHTML=DEPTS.map(({name})=>{
      const deptRows=rows.filter(row=>row.group.dept===name);
      if(!deptRows.length)return '';
      const count=deptRows.reduce((sum,row)=>sum+row.visible.length,0);
      const isOpen=name===openDept;
      return `<div class="desktop-dept ${isOpen?'active':''}" data-dept="${esc(name)}">
        <button class="desktop-dept-button" type="button" data-desktop-dept="${esc(name)}" aria-expanded="${isOpen}"><span>${esc(name)}</span><span>${count}</span></button>
        <div class="desktop-subfamilies">${deptRows.map(row=>`<button class="desktop-group-button ${row.gi===activeGi&&(!isBroadResult()||desktopGroupFocused)?'active':''}" type="button" data-desktop-group="${row.gi}"><span>${esc(row.group.title)}</span><small>${row.visible.length}</small></button>`).join('')}</div>
      </div>`;
    }).join('');
  }
  function cardHtml(entry){
    const {it,id,group}=entry;
    const image=imageUrlFor(it);
    const selected=Object.prototype.hasOwnProperty.call(favs,id);
    const photo=image
      ? `<img class="${productPhotoCropClass(it)}" src="${esc(image)}" alt="" loading="lazy" decoding="async">`
      : `${categoryPlaceholderSvg(group.title)}${it.origin?`<span class="fam-origin">${esc(it.origin)}</span>`:''}`;
    return `<article class="desktop-product-card ${selected?'fav':''}" data-id="${id}">
      <button class="desktop-product-open" type="button" aria-label="Ver ficha de ${esc(it.n)}">
        <span class="desktop-product-photo ${image?'':'placeholder'}" ${image?'':`style="--fam:${esc(group.color)}"`}>${photo}</span>
        <span class="desktop-product-copy"><span class="desktop-product-name">${esc(it.n)}</span><span class="desktop-product-ref">Ref. ${esc(it.ref)}</span><span class="desktop-product-family">${esc(group.title)}</span></span>
      </button>
      <button class="desktop-add" type="button" data-id="${id}" aria-pressed="${selected}" aria-label="${selected?'Quitar de la selección':'Añadir a la selección'}: ${esc(it.n)}"><svg viewBox="0 0 24 24">${selected?CHECK_ICON:PLUS_ICON}</svg></button>
    </article>`;
  }
  function renderProducts(rows,activeGi){
    const active=rows.find(row=>row.gi===activeGi)||rows[0];
    let entries=[];
    const showAllLandscape=landscapeShowAll;
    if(showAllLandscape){
      rows.filter(row=>allowedRow(row)&&(!landscapeDepartmentFocus||row.group.dept===landscapeDepartmentFocus))
        .forEach(row=>row.visible.forEach(({it,ii})=>entries.push({it,id:itemId(row.gi,ii),group:row.group})));
      breadcrumb.textContent=landscapeDepartmentFocus||(isBroadResult()||currentDept!=='all'||familyFilter?'Resultados del catálogo':'Catálogo completo');
      title.textContent=landscapeDepartmentFocus||(searchTerm?`Resultados para “${searchTerm}”`:familyFilter||(currentDept!=='all'?currentDept:'Todos los productos'));
    }else if(isBroadResult()&&!desktopGroupFocused){
      rows.filter(allowedRow).forEach(row=>row.visible.forEach(({it,ii})=>entries.push({it,id:itemId(row.gi,ii),group:row.group})));
      breadcrumb.textContent='Resultados del catálogo';
      title.textContent=searchTerm?`Resultados para “${searchTerm}”`:(selectedOnly?'Productos seleccionados':'Productos filtrados');
    }else if(active){
      entries=active.visible.map(({it,ii})=>({it,id:itemId(active.gi,ii),group:active.group}));
      breadcrumb.textContent=isBroadResult()?`${active.group.dept} · Resultados filtrados`:active.group.dept;
      title.textContent=active.group.title;
    }
    const scopeKey=[searchTerm,onlyNew,selectedOnly,countryFilter,regionFilter,currentDept,familyFilter,activeGi,desktopGroupFocused,landscapeShowAll,landscapeDepartmentFocus,desktopView].join('|');
    if(scopeKey!==desktopScopeKey){desktopScopeKey=scopeKey;desktopLimit=DESKTOP_BATCH;}
    const visibleLimit=desktopLimit;
    window.GMA_DESKTOP_ITEMS=entries.map(({it,id,group:g})=>({it,id,g}));
    const visibleEntries=entries.slice(0,visibleLimit);
    const remaining=Math.max(0,entries.length-visibleEntries.length);
    meta.textContent=`${entries.length} ${entries.length===1?'producto':'productos'}`;
    products.className=`desktop-products ${desktopView==='grid'?'':desktopView}`;
    products.innerHTML=entries.length
      ? visibleEntries.map(cardHtml).join('')+(remaining?`<div class="desktop-more"><button class="desktop-more-button" type="button">Mostrar ${Math.min(DESKTOP_BATCH,remaining)} más · ${remaining} pendientes</button></div>`:'')
      : '<div class="desktop-empty">No hay productos que coincidan con esta selección.</div>';
    document.querySelectorAll('.desktop-view-button').forEach(button=>{const active=button.dataset.desktopView===desktopView;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    const expanded=landscapeShowAll&&!landscapeDepartmentFocus;
    const expand=document.getElementById('desktopExpandAll');
    expand.textContent=expanded?'Recoger todo':'Desplegar todo';expand.setAttribute('aria-label',expand.textContent);expand.setAttribute('aria-expanded',String(expanded));
    observeMore();
  }
  let moreObserver;
  function appendMore(){
    const entries=window.GMA_DESKTOP_ITEMS||[];
    const end=Math.min(desktopLimit+DESKTOP_BATCH,entries.length);
    if(end<=desktopLimit)return;
    const more=products.querySelector('.desktop-more');
    const hadFocus=more?.contains(document.activeElement);
    more?.remove();
    products.insertAdjacentHTML('beforeend',entries.slice(desktopLimit,end).map(({it,id,g:group})=>cardHtml({it,id,group})).join(''));
    desktopLimit=end;
    if(end<entries.length)products.insertAdjacentHTML('beforeend','<div class="desktop-more"><button class="desktop-more-button" type="button">Mostrar más productos</button></div>');
    if(hadFocus)(products.querySelector('.desktop-more-button')||products.querySelector('.desktop-product-card:last-child button'))?.focus({preventScroll:true});
    observeMore();
  }
  function observeMore(){
    moreObserver?.disconnect();
    if(!('IntersectionObserver' in window))return;
    const sentinel=products.querySelector('.desktop-more');if(!sentinel)return;
    moreObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&desktopMedia.matches){moreObserver.disconnect();appendMore();}},{rootMargin:'320px'});
    moreObserver.observe(sentinel);
  }
  function renderDesktopCatalog(){
    if(!desktopMedia.matches)return;
    const rows=groupRows();
    const activeGi=activeGroupIndex(rows);
    renderNavigation(rows,activeGi);
    renderProducts(rows,activeGi);
    renderDesktopSelection();
  }
  function renderDesktopSelection(){
    if(!desktopMedia.matches)return;
    const ids=favIds();
    selectionCount.textContent=ids.length;
    selectionList.innerHTML=ids.length?ids.map(id=>{
      const it=findItem(id),qty=favs[id]||1;
      return `<div class="desktop-selection-item" data-selection-id="${id}"><div><div class="desktop-selection-name" title="${esc(it.n)}">${esc(it.n)}</div><div class="desktop-selection-ref">Ref. ${esc(it.ref)}</div></div><div class="desktop-qty"><button type="button" data-action="dec" aria-label="Restar unidad">−</button><span>${qty}</span><button type="button" data-action="inc" aria-label="Sumar unidad">+</button><button type="button" data-action="remove" aria-label="Quitar producto">×</button></div></div>`;
    }).join(''):'<div class="desktop-selection-empty">Añade productos con el botón + para preparar una propuesta comercial.</div>';
  }

  familyList.addEventListener('click',event=>{
    const deptButton=event.target.closest('[data-desktop-dept]');
    if(deptButton){
      const dept=deptButton.dataset.desktopDept;
      if(openDept===dept){openDept=null;renderDesktopCatalog();familyList.querySelector(`[data-desktop-dept="${CSS.escape(dept)}"]`)?.focus({preventScroll:true});return;}
      openDept=dept;
      landscapeShowAll=true;landscapeDepartmentFocus=dept;desktopGroupFocused=false;
      const row=groupRows().find(item=>item.group.dept===dept&&item.visible.length);
      if(row)forcedGroup=row.gi;
      renderDesktopCatalog();
      return;
    }
    const groupButton=event.target.closest('[data-desktop-group]');
    if(groupButton){
      forcedGroup=Number(groupButton.dataset.desktopGroup);
      desktopGroupFocused=true;landscapeShowAll=false;landscapeDepartmentFocus=null;
      openDept=DATA[forcedGroup]?.dept||openDept;
      renderDesktopCatalog();
      document.querySelector('.desktop-main')?.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
  products.addEventListener('click',event=>{
    const more=event.target.closest('.desktop-more-button');
    if(more){appendMore();return;}
    const add=event.target.closest('.desktop-add');
    if(add){event.preventDefault();event.stopPropagation();toggleFav(add.dataset.id);return;}
    const open=event.target.closest('.desktop-product-open');
    if(open){const card=open.closest('.desktop-product-card');if(card)openProduct(card.dataset.id,open);}
  });
  selectionList.addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');
    if(!button)return;
    const row=button.closest('[data-selection-id]');
    const id=row?.dataset.selectionId;
    if(!id)return;
    if(button.dataset.action==='remove')delete favs[id];
    else if(button.dataset.action==='inc')favs[id]=(favs[id]||1)+1;
    else favs[id]=Math.max(1,(favs[id]||1)-1);
    saveState();syncSelectionState(id);updateStats();
    if(selectedOnly)render();
  });
  document.querySelectorAll('.desktop-view-button').forEach(button=>button.addEventListener('click',()=>{
    desktopView=button.dataset.desktopView;
    GMAStorage.setItem('gma-desktop-view',desktopView);
    renderDesktopCatalog();
  }));
  document.getElementById('desktopFilters').addEventListener('click',()=>{desktopGroupFocused=false;landscapeShowAll=true;landscapeDepartmentFocus=null;openFilterPanel();});
  document.getElementById('desktopExpandAll').addEventListener('click',()=>{
    const wasExpanded=landscapeShowAll&&!landscapeDepartmentFocus;
    landscapeShowAll=!wasExpanded;landscapeDepartmentFocus=null;desktopGroupFocused=wasExpanded;
    forcedGroup=firstAllowedGroup(groupRows());renderDesktopCatalog();
  });
  document.getElementById('desktopOpenSelection').addEventListener('click',openSheet);
  document.getElementById('desktopCopySelection').addEventListener('click',async()=>{
    const ids=favIds();
    if(!ids.length){showToast('No hay referencias seleccionadas');return;}
    const text=ids.map(id=>{const it=findItem(id);return `${it.ref} · ${it.n} · Cant. ${favs[id]}`}).join('\n');
    try{await navigator.clipboard.writeText(text);showToast('Selección copiada');}catch(error){showToast('No se pudo copiar la selección');}
  });
  document.getElementById('searchInput')?.addEventListener('input',()=>{forcedGroup=null;desktopGroupFocused=false;landscapeShowAll=true;landscapeDepartmentFocus=null;});
  desktopMedia.addEventListener?.('change',event=>{if(event.matches)renderDesktopCatalog();});

  const baseRender=render;
  let previousFilters='';
  render=function(){
    const key=[searchTerm,onlyNew,selectedOnly,countryFilter,regionFilter,currentDept,familyFilter].join('|');
    if(key!==previousFilters){previousFilters=key;forcedGroup=null;desktopGroupFocused=false;landscapeShowAll=true;landscapeDepartmentFocus=null;}
    baseRender();renderDesktopCatalog();
  };
  const baseStats=updateStats;
  updateStats=function(){baseStats();renderDesktopSelection();};
  const baseSync=syncSelectionState;
  syncSelectionState=function(id){
    baseSync(id);
    const selected=Object.prototype.hasOwnProperty.call(favs,id);
    document.querySelectorAll(`.desktop-add[data-id="${id}"]`).forEach(button=>{
      button.closest('.desktop-product-card')?.classList.toggle('fav',selected);
      button.setAttribute('aria-pressed',String(selected));
      button.setAttribute('aria-label',`${selected?'Quitar de la selección':'Añadir a la selección'}: ${findItem(id).n}`);
      const svg=button.querySelector('svg');if(svg)svg.innerHTML=selected?CHECK_ICON:PLUS_ICON;
    });
  };
  window.GMA_RENDER_DESKTOP=renderDesktopCatalog;
  renderDesktopCatalog();
})();
