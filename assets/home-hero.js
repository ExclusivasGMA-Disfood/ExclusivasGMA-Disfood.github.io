(()=>{
  let interacted=false;
  const mark=()=>{interacted=true;};
  ['pointerdown','touchstart','wheel','keydown'].forEach(type=>addEventListener(type,mark,{once:true,passive:true}));
  const startAtTop=()=>{if(!interacted)window.scrollTo({top:0,left:0,behavior:'instant'});};
  startAtTop();
  addEventListener('load',startAtTop,{once:true});
  addEventListener('pageshow',startAtTop);
  const root=document.getElementById('homeHero');if(!root)return;
  const slides=[...root.querySelectorAll('.home-hero-slide')];
  const dots=[...root.querySelectorAll('[data-hero-go]')];
  const pause=root.querySelector('[data-hero-pause]');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let generation=0;
  let index=0,timer=0,paused=reduce.matches,hover=false,visible=true;
  function schedule(){clearInterval(timer);if(!paused&&!hover&&visible&&!document.hidden&&!root.contains(document.activeElement))timer=setInterval(()=>show(index+1),9000);}
  async function show(next){const request=++generation;const target=(next+slides.length)%slides.length;await Promise.all([...slides[target].querySelectorAll('img')].map(img=>img.decode?.().catch(()=>{})));if(request!==generation)return;index=target;slides.forEach((slide,i)=>{slide.hidden=i!==index;});dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));schedule();}
  function syncPause(){pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Reanudar carrusel':'Pausar carrusel');pause.textContent=paused?'▷':'Ⅱ';schedule();}
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
  root.querySelector('[data-hero-prev]').addEventListener('click',()=>show(index-1));
  root.querySelector('[data-hero-next]').addEventListener('click',()=>show(index+1));
  pause.addEventListener('click',()=>{paused=!paused;syncPause();});
  root.addEventListener('mouseenter',()=>{hover=true;schedule();});
  root.addEventListener('mouseleave',()=>{hover=false;schedule();});
  root.addEventListener('focusin',schedule);root.addEventListener('focusout',()=>setTimeout(schedule,0));
  root.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(index+(event.key==='ArrowRight'?1:-1));}});
  let touch=null;
  root.addEventListener('touchstart',e=>{if(e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  root.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(index+(dx<0?1:-1));},{passive:true});
  document.addEventListener('visibilitychange',schedule);
  reduce.addEventListener('change',()=>{paused=reduce.matches;syncPause();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();}).observe(root);
  syncPause();
})();
