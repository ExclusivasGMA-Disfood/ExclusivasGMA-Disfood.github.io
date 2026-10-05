// Logos estáticos: el dorado solo aparece al seleccionarlos.
(()=>{
  const items=[...document.querySelectorAll('.gma-brands__item')];
  if(!items.length)return;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('width','0');svg.setAttribute('height','0');
  svg.setAttribute('aria-hidden','true');svg.style.position='absolute';
  // Conserva blancos y transparencia: el oro colorea únicamente el dibujo.
  svg.innerHTML='<defs><filter id="gma-logo-gold" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="table" tableValues="0.70 0.96 1"/><feFuncG type="table" tableValues="0.46 0.79 1"/><feFuncB type="table" tableValues="0.08 0.35 1"/></feComponentTransfer></filter></defs>';
  document.body.append(svg);
  let selected=null;
  for(const item of items){
    const button=document.createElement('button');
    button.type='button';button.className='gma-brands__select';
    button.setAttribute('aria-label',item.querySelector('img')?.alt||item.dataset.brand);
    button.setAttribute('aria-pressed','false');
    button.append(...item.childNodes);item.append(button);
    button.addEventListener('click',()=>{
      const activate=selected!==button;
      if(selected)selected.setAttribute('aria-pressed','false');
      selected=activate?button:null;
      button.setAttribute('aria-pressed',String(activate));
    });
  }
})();
