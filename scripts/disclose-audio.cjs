/** Apply the same ID3 metadata as the live TTS route, without regenerating audio. */
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const code=ts.transpileModule(fs.readFileSync('src/lib/audio/disclosure.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const sandbox={exports:{},Buffer};vm.runInNewContext(code,sandbox);
for(const file of fs.readdirSync('public/demo').filter(x=>/^voice-\d+\.mp3$/.test(x))){
 const path='public/demo/'+file;
 const audio=fs.readFileSync(path);
 const tagged=sandbox.exports.withAudioDisclosure(audio,'Sarvam AI');
 fs.writeFileSync(path,tagged);
 if(!sandbox.exports.withAudioDisclosure(tagged,'Sarvam AI').equals(tagged))throw new Error('Non-idempotent ID3 tag');
 console.log('Tagged '+file);
}
