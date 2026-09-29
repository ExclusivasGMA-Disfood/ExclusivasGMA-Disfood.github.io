// Entrada sutil una sola vez. Sin JS o con movimiento reducido, todo es visible.
(()=>{
  const items=document.querySelectorAll('.gma-brands__item');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!items.length||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const active=new Set();
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      observer.unobserve(entry.target);
      if(reduced.matches)continue;
      const animation=entry.target.animate([
        {opacity:0,transform:'translateY(6px)'},
        {opacity:1,transform:'translateY(0)'}
      ],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'});
      active.add(animation);
      animation.onfinish=animation.oncancel=()=>active.delete(animation);
    }
  },{threshold:.15});
  items.forEach(item=>observer.observe(item));
  reduced.addEventListener?.('change',()=>{if(reduced.matches)for(const animation of active)animation.cancel();});
})();
