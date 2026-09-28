/* Individually reviewed, centred framing of original square photographs.
   Never changes image files, product details, or the dimensions of a card. */
(async()=>{
  try{
    const response=await fetch('revision/image-framing.json?v=fill1');
    if(!response.ok)return;
    const data=await response.json();
    const frames='.item-photo,.discovery-photo,.desktop-product-photo,.product-visual';
    const rules=[];
    for(const entry of data.images||[]){
      const [w,h]=entry.sourceSize||[],[x,y,right,bottom]=entry.contentBox||[];
      const margin=entry.innerMargin;
      // Only explicitly reviewed symmetric square bounds are supported.
      if(!/^images\/products\/[\w.-]+$/.test(entry.source)||!(w>0&&w===h)
        ||!(x>=0&&x===y&&right===bottom&&right===w-x&&right>x)
        ||!(margin>=0.05&&margin<=0.15))continue;
      const scale=(w/(right-x))*(1-2*margin);
      if(!Number.isFinite(scale)||scale>1.2)continue;
      const source=CSS.escape(entry.source);
      rules.push(`html body :is(${frames})>img:is([src="${source}"],[src^="${source}?"]){padding:0!important;transform:scale(${scale})!important;transform-origin:center!important;object-fit:contain!important}`);
    }
    // Carousel-only framing approved per photograph; source files stay unchanged.
    const carouselRules=new Map();
    for(const entry of data.carousels||[]){
      const [w,h]=entry.sourceSize||[],[x,y,right,bottom]=entry.contentBox||[];
      if(!/^images\/products\/[\w.-]+$/.test(entry.source)||!(w>0&&h>0&&x>=0&&y>=0&&right<=w&&bottom<=h&&right>x&&bottom>y)||!['cover','contain'].includes(entry.fit))continue;
      carouselRules.set(entry.source,entry);
    }
    if(carouselRules.size){
      rules.push('html body :is(#newDiscovery,#bestDiscovery) .discovery-photo[data-framing]>img{inset:auto!important;left:var(--frame-left)!important;top:var(--frame-top)!important;width:var(--frame-width)!important;height:var(--frame-height)!important;max-width:none!important;max-height:none!important;padding:0!important;transform:none!important;object-fit:contain!important}');
      const tracked=new Map();
      function resizeFrame(frame){
        const entry=tracked.get(frame),img=frame.querySelector('img');
        if(!entry||!img||!frame.clientWidth||!frame.clientHeight)return;
        const [w,h]=entry.sourceSize,[x,y,right,bottom]=entry.contentBox;
        const cw=right-x,ch=bottom-y,fw=frame.clientWidth,fh=frame.clientHeight;
        const margin=Math.max(0,Math.min(.1,entry.innerMargin||0));
        const scale=(entry.fit==='cover'?Math.max(fw/cw,fh/ch):Math.min(fw/cw,fh/ch)*(1-2*margin));
        const [px,py]=entry.position||[.5,.5];
        frame.style.setProperty('--frame-width',w*scale+'px');
        frame.style.setProperty('--frame-height',h*scale+'px');
        frame.style.setProperty('--frame-left',((fw-cw*scale)*px-x*scale)+'px');
        frame.style.setProperty('--frame-top',((fh-ch*scale)*py-y*scale)+'px');
        frame.dataset.framing=entry.ref;
      }
      const observer=typeof ResizeObserver==='function'?new ResizeObserver(entries=>entries.forEach(e=>resizeFrame(e.target))):null;
      function scan(){
        for(const [frame] of tracked)if(!frame.isConnected){observer?.unobserve(frame);tracked.delete(frame);}
        document.querySelectorAll('#newDiscovery .discovery-photo,#bestDiscovery .discovery-photo').forEach(frame=>{
          const img=frame.querySelector('img');if(!img)return;
          const source=img.getAttribute('src')?.split('?')[0];
          const entry=carouselRules.get(source);if(!entry)return;
          if(!tracked.has(frame)){tracked.set(frame,entry);observer?.observe(frame);}
          resizeFrame(frame);
        });
      }
      const changes=new MutationObserver(scan);
      for(const id of ['newDiscovery','bestDiscovery']){const root=document.getElementById(id);if(root)changes.observe(root,{childList:true,subtree:true});}
      window.addEventListener('resize',()=>tracked.forEach((_,frame)=>resizeFrame(frame)),{passive:true});
      scan();
    }
    if(rules.length){const style=document.createElement('style');style.id='product-image-framing';style.textContent=rules.join('\n');document.head.appendChild(style);}
  }catch(_error){/* The original full photograph remains visible if metadata is unavailable. */}
})();
