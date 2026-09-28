import fs from 'node:fs/promises';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('data/brands-manifest.json','utf8'));
for(const brand of manifest.brands){
 let source=await fs.readFile(brand.original);
 if(brand.id==='dominguez')source=Buffer.from(source.toString().replace('<style></style>','<style>.a{fill:#fff}.b{fill:#454545}</style>'));
 if(brand.id==='gastronoms')source=Buffer.from(source.toString().replaceAll('#fefefe','#333333').replaceAll('#e41b20','#333333'));
 await sharp(source).trim().resize({width:400,height:200,fit:'inside'}).png().toFile(brand.image);
 const m=await sharp(brand.image).metadata();brand.width=m.width;brand.height=m.height;
}
await fs.writeFile('data/brands-manifest.json',JSON.stringify(manifest,null,2)+'\n');
