import fs from 'node:fs';
const m=JSON.parse(fs.readFileSync('data/family-illustrations.json','utf8'));
let css='/* Generated from data/family-illustrations.json. */\n';
for(const {name,crop:[x,y,w,h]} of m.families){
 const s=Math.min(46/w,38/h),dw=w*s,dh=h*s;
 const selectors=[`.dept-header[data-dept=${JSON.stringify(name)}]`,`.desktop-dept-button[data-desktop-dept=${JSON.stringify(name)}]`];
 css+=selectors.map(v=>v+'::before').join(',')+`{content:"";display:block;flex:0 0 ${dw.toFixed(3)}px;width:${dw.toFixed(3)}px;height:${dh.toFixed(3)}px;background-image:url("../${m.image}");background-repeat:no-repeat;background-size:${(m.width*s).toFixed(3)}px ${(m.height*s).toFixed(3)}px;background-position:${(-x*s).toFixed(3)}px ${(-y*s).toFixed(3)}px;mix-blend-mode:multiply;pointer-events:none}\n`;
}
css+='.desktop-dept-button{gap:10px}.desktop-dept-button>span:first-of-type{flex:1;min-width:0}\n';
const target='assets/family-illustrations.css';
if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==css)throw Error('Family illustrations out of date');}else fs.writeFileSync(target,css);
