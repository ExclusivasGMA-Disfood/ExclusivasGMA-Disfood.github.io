// Keep navigation actions from moving the page through browser scroll anchoring.
let familyPositionGeneration=0,familyOverflowAnchor=null;
function keepFamilyPosition(action, locate, scroller=null){
  const root=document.documentElement;
  const before=locate();
  const top=before?.getBoundingClientRect().top;
  const y=window.scrollY,x=window.scrollX;
  const generation=++familyPositionGeneration;
  if(familyOverflowAnchor===null)familyOverflowAnchor=root.style.overflowAnchor;
  const previousScroll=scroller?.scrollTop||0;
  root.style.overflowAnchor='none';
  action();
  const align=()=>{
    if(scroller){
      window.scrollTo({left:x,top:y,behavior:'instant'});
      scroller.scrollTop=previousScroll;
      const fresh=locate();
      if(fresh&&top!=null)scroller.scrollTop+=fresh.getBoundingClientRect().top-top;
    }else{
      const fresh=locate();
      if(fresh&&top!=null)window.scrollTo({left:x,top:Math.max(0,window.scrollY+fresh.getBoundingClientRect().top-top),behavior:'instant'});
    }
  };
  align();
  requestAnimationFrame(()=>{if(generation!==familyPositionGeneration)return;align();root.style.overflowAnchor=familyOverflowAnchor;familyOverflowAnchor=null;});
}
