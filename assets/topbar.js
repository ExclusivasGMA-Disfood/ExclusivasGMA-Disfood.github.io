(()=>{
  const header=document.getElementById('siteHeader');
  const searchButton=document.getElementById('topSearchToggle');
  const accountButton=document.getElementById('topSelection');
  const menuButton=document.getElementById('topMenuToggle');
  const menu=document.getElementById('topMenuPanel');
  const search=document.getElementById('searchInput');
  const searchPanel=document.getElementById('topSearchPanel');
  searchPanel.appendChild(document.getElementById('searchSuggestions'));
  searchPanel.setAttribute('aria-hidden','true');
  const dialog=document.getElementById('accountDialog');
  const toolbar=document.querySelector('#controls .catalog-toolbar');
  const toolbarHome=document.getElementById('controls');
  const wideScreen=window.matchMedia('(min-width:760px)');
  const updateHeight=()=>document.documentElement.style.setProperty('--topbar-h',header.getBoundingClientRect().height+'px');
  const placeToolbar=()=>{
    if(wideScreen.matches)header.querySelector('.gma-topbar-inner').insertBefore(toolbar,header.querySelector('.gma-topbar-actions'));
    else toolbarHome.appendChild(toolbar);
    requestAnimationFrame(()=>{setControlsHeight();updateHeight();});
  };
  const positionAccount=()=>{
    const rect=accountButton.getBoundingClientRect();
    dialog.style.setProperty('--account-top',header.getBoundingClientRect().bottom+'px');
    dialog.style.setProperty('--account-right',(window.innerWidth-rect.right)+'px');
  };
  const closeMenu=()=>{
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-hidden','true');menu.inert=true;
  };
  const closeAccount=(restoreFocus=false)=>{
    if(!dialog.classList.contains('open'))return;
    dialog.classList.remove('open');
    dialog.setAttribute('aria-hidden','true');
    accountButton.setAttribute('aria-expanded','false');
    dialog.inert=true;
    if(restoreFocus)accountButton.focus({preventScroll:true});
  };
  const showSearch=(open,focus=false)=>{
    if(open){closeMenu();closeAccount();}
    if(!open&&searchPanel.contains(document.activeElement))document.activeElement.blur();
    header.classList.toggle('search-open',open);searchPanel.inert=!open;
    searchPanel.setAttribute('aria-hidden',String(!open));
    if(!open)window.GMA_HIDE_SEARCH_SUGGESTIONS?.();
    searchButton.setAttribute('aria-expanded',String(open));
    searchButton.setAttribute('aria-label',open?'Ocultar buscador':'Mostrar buscador');
    updateHeight();
    if(open&&focus)search.focus({preventScroll:true});
  };
  window.GMA_CLOSE_SEARCH=()=>showSearch(false);
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(updateHeight).observe(header);
  if(wideScreen.addEventListener)wideScreen.addEventListener('change',placeToolbar);
  else wideScreen.addListener(placeToolbar);
  window.addEventListener('resize',()=>{updateHeight();if(dialog.classList.contains('open'))positionAccount();});
  searchButton.addEventListener('click',()=>showSearch(!header.classList.contains('search-open'),true));
  search.addEventListener('focus',()=>{showSearch(true);window.GMA_UPDATE_SEARCH_SUGGESTIONS?.();});
  accountButton.addEventListener('click',()=>{
    const opening=!dialog.classList.contains('open');
    showSearch(false);closeMenu();
    if(!opening){closeAccount();return;}
    positionAccount();
    dialog.classList.add('open');
    dialog.setAttribute('aria-hidden','false');
    accountButton.setAttribute('aria-expanded','true');
    dialog.inert=false;
    document.getElementById('accountClose').focus({preventScroll:true});
  });
  document.getElementById('accountClose').addEventListener('click',()=>closeAccount(true));
  menuButton.addEventListener('click',()=>{
    const opening=!header.classList.contains('menu-open');
    showSearch(false);closeAccount();
    header.classList.toggle('menu-open',opening);
    menuButton.setAttribute('aria-expanded',String(opening));
    menu.setAttribute('aria-hidden',String(!opening));menu.inert=!opening;
    if(opening)menu.querySelector('button')?.focus({preventScroll:true});
  });
  menu.addEventListener('click',event=>{
    const item=event.target.closest('[data-menu-action]');
    if(!item)return;
    closeMenu();
    switch(item.dataset.menuAction){
      case 'filters': openFilterPanel();break;
      case 'home': scrollImmediately(0);break;
      case 'products':
      case 'catalog': scrollToResults();break;
      default: showToast('Disponible próximamente');
    }
  });
  document.addEventListener('pointerdown',event=>{
    // Overlay panels never change document height when dismissed.
    if(!header.contains(event.target)){closeMenu();showSearch(false);}
    if(!dialog.contains(event.target)&&!accountButton.contains(event.target))closeAccount();
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    if(dialog.classList.contains('open')){closeAccount(true);return;}
    if(header.classList.contains('menu-open')){closeMenu();menuButton.focus({preventScroll:true});return;}
    if(header.classList.contains('search-open')){showSearch(false);searchButton.focus({preventScroll:true});}
  });
  placeToolbar();
})();
