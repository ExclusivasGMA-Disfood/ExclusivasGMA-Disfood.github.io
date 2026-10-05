// Mantener el producto leído al cambiar la geometría, no el número de píxeles.
(()=>{
  const media=matchMedia('(min-width:1000px), (orientation:landscape) and (min-width:640px) and (max-width:999px)');
  let mode=media.matches, remembered=null, restoring=false, frame=0, originalOverflowAnchor='';
  const visible=el=>el && el.getClientRects().length && el.getBoundingClientRect().height>0;
  function line(){
    const header=document.getElementById('siteHeader').getBoundingClientRect().bottom;
    if(media.matches){
      const head=document.querySelector('.desktop-main-head');
      return header+(head?.getBoundingClientRect().height||0)+28;
    }
    return header+(document.getElementById('controls')?.getBoundingClientRect().height||0)+48;
  }
  function capture(){
    const edge=line();
    const selector=media.matches?'#desktopProducts .desktop-product-card':'#groups .item';
    const card=[...document.querySelectorAll(selector)].find(el=>{
      if(!visible(el))return false;
      const r=el.getBoundingClientRect();return r.bottom>edge+20&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
    });
    if(card){const id=card.dataset.id;return {id,gi:Number(id.split('-')[0]),offset:card.getBoundingClientRect().top-edge};}
    if(!media.matches){
      const group=[...document.querySelectorAll('#groups .group-header,#groups .dept-header')].find(el=>{
        if(!visible(el))return false;
        const r=el.getBoundingClientRect(),y=Math.max(edge, r.top)+Math.min(10,r.height/2);
        return r.bottom>edge&&y<innerHeight&&el.contains(document.elementFromPoint(r.left+r.width/2,y));
      });
      if(group){const gi=group.closest('.group')?.dataset.groupId;return {gi:gi===undefined?null:Number(gi),dept:group.dataset.dept,offset:group.getBoundingClientRect().top-edge};}
    }
    return null;
  }
  function remember(){if(!restoring&&mode===media.matches)remembered=capture();}
  function restore(anchor){
    if(!anchor){remember();return;}
    const root=document.documentElement;
    if(!restoring)originalOverflowAnchor=root.style.overflowAnchor;
    restoring=true;pauseGroupVirtualization();
    root.style.overflowAnchor='none';root.classList.add('catalog-repositioning');
    function target(){
      if(media.matches){
        const gi=anchor.gi??DATA.findIndex(g=>g.dept===anchor.dept);
        return document.querySelector(`#desktopProducts [data-id="${anchor.id}"]`)||document.querySelector(`#desktopProducts [data-id^="${gi}-"]`)||document.querySelector('#desktopProducts .desktop-product-card');
      }
      const group=document.querySelector(`#groups [data-group-id="${anchor.gi}"]`);
      if(group?.classList.contains('open'))mountGroupItems(group);
      const card=anchor.id&&group?.querySelector(`[data-id="${anchor.id}"]`);
      if(card&&document.body.classList.contains('carousel-view')){
        const list=card.closest('.group-items');if(list)list.scrollLeft=card.offsetLeft-list.offsetLeft;
      }
      return card||group?.querySelector('.group-header')||[...document.querySelectorAll('#groups .dept-header')].find(el=>el.dataset.dept===(anchor.dept||DATA[anchor.gi]?.dept));
    }
    const align=()=>{
      const el=target();if(!visible(el))return;
      const oldPosition=el.style.position;
      // A sticky heading's screen position is not its position in the catalogue.
      if(el.classList.contains('dept-header'))el.style.position='static';
      const top=scrollY+el.getBoundingClientRect().top;
      el.style.position=oldPosition;
      const offset=el.classList.contains('dept-header')?0:Math.max(-20,Math.min(anchor.offset,60));
      window.scrollTo({top:Math.max(0,top-line()-offset),behavior:'instant'});
    };
    const settle=()=>{
      align();
      if(!media.matches){
        document.querySelectorAll('#groups .group.open').forEach(group=>{
          const r=group.getBoundingClientRect();
          if(r.bottom>-1100 && r.top<innerHeight+1100)mountGroupItems(group);
        });
        align();
      }
    };
    settle();
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{settle();root.style.overflowAnchor=originalOverflowAnchor;root.classList.remove('catalog-repositioning');restoring=false;resumeGroupVirtualization();remember();});
  }
  window.GMA_NAV={capture,restore,remember,beforeRotation:()=>remembered,afterRotation:()=>{mode=media.matches;},line};
  let readingFrame=0;
  addEventListener('scroll',()=>{if(!readingFrame)readingFrame=requestAnimationFrame(()=>{readingFrame=0;remember();});},{passive:true});
  addEventListener('pointerup',()=>requestAnimationFrame(remember),{passive:true});
  requestAnimationFrame(remember);
})();
