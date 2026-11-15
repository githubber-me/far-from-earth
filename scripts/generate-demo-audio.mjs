// SI-assisted code (OpenAI Codex). The TTS route embeds Sarvam SI disclosure in ID3 metadata.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const lines=JSON.parse(await readFile('docs/demo/narration.json','utf8'));
await mkdir('public/demo',{recursive:true});
for(let i=0;i<lines.length;i++){
 const res=await fetch('http://localhost:3000/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:`demo.${i}`,speaker:'dhruva',lang:'en',text:lines[i].text})});
 if(!res.ok)throw new Error(`Sarvam narration ${i}: ${res.status} ${(await res.text()).slice(0,180)}`);
 await writeFile(`public/demo/voice-${i}.mp3`,Buffer.from(await res.arrayBuffer()));
 console.log(`Narration ${i+1}/${lines.length} saved`);
}
