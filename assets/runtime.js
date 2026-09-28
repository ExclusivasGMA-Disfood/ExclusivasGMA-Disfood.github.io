// Small shared primitives. Storage failures must never block browsing or imply success.
const GMAStorage={
  getItem(key){try{return localStorage.getItem(key);}catch{return null;}},
  setItem(key,value){try{localStorage.setItem(key,value);return true;}catch{return false;}},
  removeItem(key){try{localStorage.removeItem(key);return true;}catch{return false;}}
};
const GMAPanels=(()=>{
  const stack=[];
  const previousInert=new Map();
  const focusables=panel=>[...panel.querySelectorAll('button,a[href],input,select,textarea,[tabindex]')].filter(el=>!el.disabled&&el.tabIndex>=0&&!el.closest('[inert],[hidden]')&&el.getClientRects().length);
  function sync(){
    for(const [el,value] of previousInert)el.inert=value;
    previousInert.clear();
    const top=stack.at(-1)?.panel;
    if(!top)return;
    for(const child of document.body.children){
      if(child===top||child.contains(top)||child.classList.contains('sheet-backdrop')||child.tagName==='SCRIPT')continue;
      previousInert.set(child,child.inert);child.inert=true;
    }
  }
  function open(panel){
    if(stack.some(x=>x.panel===panel))return;
    const opener=document.activeElement;
    panel.setAttribute('aria-hidden','false');panel.inert=false;panel.tabIndex=-1;
    stack.push({panel,opener});sync();
    requestAnimationFrame(()=>{if(stack.at(-1)?.panel===panel)(focusables(panel)[0]||panel).focus({preventScroll:true});});
  }
  function close(panel){
    const i=stack.findIndex(x=>x.panel===panel);if(i<0)return;
    const [{opener}]=stack.splice(i,1);
    panel.setAttribute('aria-hidden','true');panel.inert=true;sync();
    const top=stack.at(-1)?.panel;
    if(opener?.isConnected&&!opener.closest('[inert]'))opener.focus({preventScroll:true});
    else if(top)(focusables(top)[0]||top).focus({preventScroll:true});
  }
  document.addEventListener('keydown',event=>{
    if(event.key!=='Tab'||!stack.length)return;
    const panel=stack.at(-1).panel,items=focusables(panel);
    if(!items.length){event.preventDefault();panel.focus();return;}
    const first=items[0],last=items.at(-1);
    if(event.shiftKey&&(document.activeElement===first||!panel.contains(document.activeElement))){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&(document.activeElement===last||!panel.contains(document.activeElement))){event.preventDefault();first.focus();}
  });
  return {open,close};
})();
// Keep the original image node: gallery switching can recover from a failed source.
document.addEventListener('error',event=>{
  const img=event.target;if(!(img instanceof HTMLImageElement)||!img.getAttribute('src'))return;
  const box=img.parentElement;if(!box)return;
  img.hidden=true;box.classList.add('image-error');
  if(!box.querySelector(':scope > .image-fallback')){
    const fallback=document.createElement('span');fallback.className='image-fallback';fallback.textContent='Imagen no disponible';box.appendChild(fallback);
  }
},true);
document.addEventListener('load',event=>{
  const img=event.target;if(!(img instanceof HTMLImageElement))return;
  img.hidden=false;img.parentElement?.classList.remove('image-error');img.parentElement?.querySelector(':scope > .image-fallback')?.remove();
},true);
