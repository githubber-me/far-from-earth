/** SI-assisted code (OpenAI Codex). Creates deterministic SVG disclosure frames. */
import { readdir, readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=process.cwd();
const source=path.join(root,'assets/source');
const published=path.join(root,'public/assets');
async function files(dir){const result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())result.push(...await files(p));else result.push(p);}return result;}
// Retain exact originals outside the publicly served directory. No image pixels are edited.
for(const file of await files(published)){
 if(!/\.(png|webp)$/i.test(file))continue;
 const relative=path.relative(published,file);const target=path.join(source,relative);
 await mkdir(path.dirname(target),{recursive:true});
 try {await readFile(target);throw new Error(`Original already exists: ${relative}`);}catch(e){if(e.code!=='ENOENT')throw e;}
 await rename(file,target);
}
const entries=[];
for(const file of await files(source)){
 if(!/\.(png|webp)$/i.test(file))continue;
 const relative=path.relative(source,file);
 // The WebP is the published version where both source formats exist.
 if(relative.endsWith('.png')){try{await readFile(file.replace(/\.png$/,'.webp'));continue;}catch{}}
 const data=await readFile(file);const {width,height}=await sharp(data).metadata();
 const mime=relative.endsWith('.png')?'image/png':'image/webp';
 const size=Math.max(12,Math.round(width*0.015));const strip=Math.ceil(size*2.4);
 const url='/assets/'+relative.replace(/\.(png|webp)$/,'.svg');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height+strip}" viewBox="0 0 ${width} ${height+strip}"><title>SI-generated artwork · Mission Dhruva</title><desc>Artwork generated with OpenAI image generation. Created by Anthahkarana. Fictional illustration, not NASA imagery. Original pixels preserved inside this disclosure frame.</desc><metadata>{"siGenerated":true,"tool":"OpenAI image generation","creator":"Anthahkarana","kind":"fictional illustration"}</metadata><image width="${width}" height="${height}" href="data:${mime};base64,${data.toString('base64')}"/><rect y="${height}" width="${width}" height="${strip}" fill="#252c23"/><text x="${Math.round(width/2)}" y="${height+strip/2}" dominant-baseline="central" text-anchor="middle" fill="#fffdf3" font-family="Arial,sans-serif" font-size="${size}" font-weight="600">SI-GENERATED ARTWORK</text></svg>`;
 const output=path.join(root,'public',url);await mkdir(path.dirname(output),{recursive:true});await writeFile(output,svg);
 entries.push({file:url,siGenerated:true,tool:'OpenAI image generation',source:'assets/source/'+relative,visibleDisclosure:'SI-GENERATED ARTWORK'});
}
await writeFile(path.join(root,'public/assets/si-manifest.json'),JSON.stringify({creator:'Anthahkarana',assets:entries},null,2)+'\n');
console.log(`Published ${entries.length} labeled artwork files; originals preserved outside public/.`);
