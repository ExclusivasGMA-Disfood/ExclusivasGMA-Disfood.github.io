// ===== estabilidad móvil y errores de imagen sin observadores pesados =====
(function(){
  let resizeTimer;
  const refresh=()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>window.setControlsHeight?.(),100)};
  addEventListener('orientationchange',refresh,{passive:true});
  window.visualViewport?.addEventListener('resize',refresh,{passive:true});
})();
