/* Individually reviewed, centred framing of original square photographs.
   Never changes image files, product details, or the dimensions of a card. */
(async()=>{
  try{
    const response=await fetch('data/image-framing.json?v=20260928.1');
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
    if(rules.length){const style=document.createElement('style');style.id='product-image-framing';style.textContent=rules.join('\n');document.head.appendChild(style);}
  }catch(_error){/* The original full photograph remains visible if metadata is unavailable. */}
})();
