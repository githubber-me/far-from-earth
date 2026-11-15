'use client';
import { useState } from 'react';
import { useGame } from '@/lib/game/store';
import { CROP_NEEDS, growCrop, words } from '@/lib/game/mission';
import type { Crop } from '@/lib/game/types';
import { MarsScene } from '@/components/ui/Scene';

export default function Greenhouse() {
  const { lang, crop, setCrop, alloc, visits, visit, applyDelta, bumpStat, go } = useGame();
  const [water, setWater] = useState(1);
  const [tank, setTank] = useState(6);
  const [results,setResults] = useState<ReturnType<typeof growCrop>[]>([]);
  const [running,setRunning] = useState(false);
  const w=(en:string,kn:string)=>words(lang,en,kn);
  const done = visits.greenhouse > 0;
  const crops: {id:Crop;name:string}[]=[{id:'tomatoes',name:w('Tomatoes','ಟೊಮ್ಯಾಟೊ')},{id:'potatoes',name:w('Potatoes','ಆಲೂಗಡ್ಡೆ')},{id:'sunflowers',name:w('Sunflowers','ಸೂರ್ಯಕಾಂತಿ')}];
  const last=results.at(-1);
  function grow(){
    if(!crop || running || results.length>=3 || done)return;
    setRunning(true);
    const amount = Math.min(water, tank);
    const result=growCrop(crop,amount,alloc.green);
    setTank(tank-amount); setResults([...results,result]); applyDelta({food:result.food});
    if(result.watered&&result.lit)bumpStat('plantsWatered');
    setRunning(false);
  }
  return <MarsScene className="screen-pad" bg="/assets/generated/greenhouse.svg"><div className="screen-content lab-content">
    <span className="eyebrow">{w('EXPERIMENT 02 / LIVING THINGS','ಪ್ರಯೋಗ 02 / ಜೀವಿಗಳು')}</span><h1 className="screen-title">{w('Grow a little tomorrow.','ನಾಳೆಗಾಗಿ ಬೆಳೆಸಿ.')}</h1><p className="lab-intro">{w('Three growing cycles. Six water units. Study a plant’s needs, then test how water and light affect your harvest.','ಮೂರು ಬೆಳವಣಿಗೆ ಚಕ್ರಗಳು. ಆರು ನೀರಿನ ಘಟಕಗಳು. ಗಿಡದ ಅಗತ್ಯ ತಿಳಿದು ನೀರು ಮತ್ತು ಬೆಳಕು ಬೆಳೆ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ ಎಂದು ಪರೀಕ್ಷಿಸಿ.')}</p>
    {done ? <div className="experiment-result result-good"><h2>{w('Your harvest is in the food reserve.','ನಿಮ್ಮ ಬೆಳೆ ಆಹಾರದ ಸಂಗ್ರಹದಲ್ಲಿದೆ.')}</h2><p>{w('Plants need the right amount of water and enough light together. More water alone cannot fix too little light.','ಗಿಡಗಳಿಗೆ ಸರಿಯಾದ ಪ್ರಮಾಣದ ನೀರು ಮತ್ತು ಸಾಕಷ್ಟು ಬೆಳಕು ಒಟ್ಟಿಗೆ ಬೇಕು. ಹೆಚ್ಚು ನೀರು ಮಾತ್ರ ಕಡಿಮೆ ಬೆಳಕನ್ನು ಸರಿಪಡಿಸಲಾರದು.')}</p><button className="btn-main" onClick={()=>go('map')}>{w('Back to the outpost','ನೆಲೆಗೆ ಹಿಂದಿರುಗಿ')} ↗</button></div> : <>
    <div className="crop-options">{crops.map(({id,name})=><button key={id} disabled={results.length>0} className={crop===id?'selected':''} aria-pressed={crop===id} onClick={()=>setCrop(id)}><span aria-hidden="true">{id==='tomatoes'?'◉':id==='potatoes'?'◈':'✳'}</span><strong>{name}</strong><small>{CROP_NEEDS[id].water} {w('water','ನೀರು')} · {CROP_NEEDS[id].light} {w('light','ಬೆಳಕು')}</small></button>)}</div>
    {crop&&<><div className="grow-readout"><div><small>{w('WATER LEFT','ಉಳಿದ ನೀರು')}</small><strong>{tank}<small>/6</small></strong></div><div><small>{w('LIGHT FROM YOUR PLAN','ಯೋಜನೆಯ ಬೆಳಕು')}</small><strong>{alloc.green}</strong></div><div><small>{w('CYCLES COMPLETE','ಮುಗಿದ ಚಕ್ರಗಳು')}</small><strong>{results.length}<small>/3</small></strong></div></div>
    {results.length<3&&<><label className="energy-control"><span><strong>{w('Water this cycle','ಈ ಚಕ್ರದ ನೀರು')}</strong><b>{Math.min(water,tank)}</b></span><input type="range" min="0" max={Math.min(3,tank)} value={Math.min(water,tank)} onChange={e=>setWater(Number(e.target.value))}/></label><button className="btn-main" disabled={running} onClick={grow}>{w('Run growing experiment','ಬೆಳವಣಿಗೆ ಪ್ರಯೋಗ ನಡೆಸಿ')} →</button>{water>tank&&<p>{w('Lower the water amount to match your remaining supply.','ಉಳಿದ ನೀರಿಗೆ ಸರಿಯಾಗಿ ಪ್ರಮಾಣ ಕಡಿಮೆ ಮಾಡಿ.')}</p>}</>}
    {last&&<div className="experiment-result" role="status"><strong>+{last.food} {w('food harvested','ಆಹಾರ ಬೆಳೆದಿದೆ')}</strong><p>{!last.watered ? w('The water amount missed this crop’s needs. Too little dries roots; too much can waterlog them. Adjust your next experiment.','ನೀರಿನ ಪ್ರಮಾಣ ಸರಿಯಾಗಲಿಲ್ಲ. ಕಡಿಮೆ ನೀರು ಬೇರು ಒಣಗಿಸುತ್ತದೆ; ಹೆಚ್ಚು ನೀರು ಮುಳುಗಿಸುತ್ತದೆ. ಮುಂದಿನ ಪ್ರಯೋಗ ಬದಲಿಸಿ.') : !last.lit ? w('The water was right, but light was too low. Water cannot replace light. Next mission, give the greenhouse more energy or choose a less demanding crop.','ನೀರು ಸರಿಯಾಗಿತ್ತು, ಆದರೆ ಬೆಳಕು ಕಡಿಮೆ. ನೀರು ಬೆಳಕಿಗೆ ಪರ್ಯಾಯವಲ್ಲ. ಮುಂದಿನ ಯಾತ್ರೆಯಲ್ಲಿ ಹೆಚ್ಚು ಶಕ್ತಿ ಕೊಡಿ ಅಥವಾ ಕಡಿಮೆ ಬೆಳಕಿನ ಬೆಳೆ ಆರಿಸಿ.') : w('A healthy crop. Water and light worked together. Can you repeat this with the water left?','ಆರೋಗ್ಯಕರ ಬೆಳೆ. ನೀರು ಮತ್ತು ಬೆಳಕು ಒಟ್ಟಿಗೆ ಕೆಲಸ ಮಾಡಿದವು. ಉಳಿದ ನೀರಿನಿಂದ ಮತ್ತೆ ಮಾಡಬಲ್ಲಿರಾ?')}</p></div>}
    {results.length===3&&<button className="btn-main" onClick={()=>{visit('greenhouse');go('map');}}>{w('Save harvest & return','ಬೆಳೆ ಉಳಿಸಿ ಹಿಂದಿರುಗಿ')} ↗</button>}</>}
    </>}
  </div></MarsScene>;
}
