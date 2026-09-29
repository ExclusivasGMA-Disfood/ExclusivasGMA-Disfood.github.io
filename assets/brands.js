// Entrada escalonada al quedar visibles sobre la navegación inferior.
// Sin JS o con movimiento reducido, los originales siguen visibles.
(()=>{
  const items=[...document.querySelectorAll('.gma-brands__item')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!items.length||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const active=new Set(), pending=new WeakSet(), shown=new WeakSet();
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      const item=entry.target;
      if(!entry.isIntersecting||pending.has(item)||shown.has(item))continue;
      pending.add(item);
      const img=item.querySelector('img');
      if(img)img.loading='eager';
      Promise.resolve(img?.decode?.()).catch(()=>{}).then(()=>{
        pending.delete(item);
        const rect=item.getBoundingClientRect();
        // La imagen puede terminar de cargar después de haber pasado de largo.
        if(rect.bottom<=0||rect.top>=innerHeight-90)return;
        shown.add(item);
        observer.unobserve(item);
        if(reduced.matches)return;
        const column=items.filter(other=>{
          return Math.abs(other.offsetTop-item.offsetTop)<2&&other.offsetLeft<item.offsetLeft;
        }).length;
        const animation=item.animate([
          {opacity:0,transform:'translateY(18px)'},
          {opacity:1,transform:'translateY(0)'}
        ],{duration:750,delay:column*110,fill:'backwards',easing:'cubic-bezier(.22,.61,.36,1)'});
        active.add(animation);
        animation.onfinish=animation.oncancel=()=>active.delete(animation);
      });
    }
  },{threshold:.35,rootMargin:'0px 0px -90px 0px'});
  items.forEach(item=>observer.observe(item));
  reduced.addEventListener?.('change',()=>{if(reduced.matches)for(const animation of active)animation.cancel();});
})();
