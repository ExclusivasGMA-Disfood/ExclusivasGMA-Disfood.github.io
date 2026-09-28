(function(){
  document.documentElement.classList.add('gma-v12');
  document.addEventListener('pointerdown',()=>document.documentElement.classList.remove('keyboard-user'),{capture:true,passive:true});
  document.addEventListener('keydown',()=>document.documentElement.classList.add('keyboard-user'),{capture:true});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    requestAnimationFrame(()=>document.body.classList.add('ui-ready'));
  }
})();
