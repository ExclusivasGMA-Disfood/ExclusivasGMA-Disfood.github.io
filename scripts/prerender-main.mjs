import {Window} from 'happy-dom';
import fs from 'node:fs/promises';
// Use the real renderers at build time; no separate catalogue markup to maintain.
export async function prerender(html,outputs){
 const w=new Window({url:'https://catalog.test/',width:1366,height:900,settings:{disableJavaScriptFileLoading:true,disableCSSFileLoading:true,enableJavaScriptEvaluation:true,suppressInsecureJavaScriptEnvironmentWarning:true}});
 try{
  const match=w.matchMedia.bind(w);
  w.matchMedia=q=>{const r=match(q.split(',')[0]);Object.defineProperty(r,'matches',{value:q.split(',').some(x=>match(x.trim()).matches)});return r;};
  w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.fetch=async u=>({ok:true,json:async()=>JSON.parse(await fs.readFile(String(u).split('?')[0],'utf8'))});
  w.document.write(html.replace(/<script\b[\s\S]*?<\/script>/g,''));
  const scripts=[];
  for(const m of html.matchAll(/<script src="([^"?]+)[^"]*"><\/script>/g))scripts.push(outputs.get(m[1])||await fs.readFile(m[1],'utf8'));
  w.eval(scripts.join('\n;\n'));
  await new Promise(r=>setTimeout(r,60));
  const slots=['newDiscoveryScroll','bestDiscoveryScroll','newDiscoveryCount','bestDiscoveryCount','groups','desktopFamilyList','desktopProducts','desktopCatalogTitle','desktopBreadcrumb','desktopResultMeta','desktopSelectionList','expandAll','resultCount'];
  for(const id of slots){
   const node=w.document.getElementById(id);
   if(!node)throw new Error(`Missing prerender slot ${id}`);
   const content=`<!--prerender:${id}-->${node.innerHTML}<!--/prerender:${id}-->`;
   const old=new RegExp(`<!--prerender:${id}-->[\\s\\S]*?<!--/prerender:${id}-->`);
   if(old.test(html))html=html.replace(old,()=>content);
   else{
    const empty=new RegExp(`(<(div|nav|span|h2|button)[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</\\2>)`);
    if(!empty.test(html))throw new Error(`Cannot replace ${id}`);
    html=html.replace(empty,(_,start,tag,end)=>start+content+end);
   }
  }
  return html;
 }finally{await w.happyDOM.close();}
}
