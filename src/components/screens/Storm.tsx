'use client';
import { useState, useRef } from 'react';
import { useGame } from '@/lib/game/store';
import { stormDelta, WAVE_COPY, words } from '@/lib/game/mission';
import type { StormChoice } from '@/lib/game/types';
import { MarsScene } from '@/components/ui/Scene';
import { useNarration } from '@/lib/audio/speech';

export default function Storm(){
  const {lang, alloc, water, gearShielded, applyDelta, recordPulse, go, resources}=useGame();
  const [wave,setWave]=useState(0);
  const [picked,setPicked]=useState<StormChoice|null>(null);
  const [outcome,setOutcome]=useState<ReturnType<typeof stormDelta>|null>(null);
  const locked=useRef(false);
  const w=(en:string,kn:string)=>words(lang,en,kn);
  const copy=WAVE_COPY[lang][wave];
  useNarration([{id:`storm.lesson.${wave}`,speaker:'dhruva',text:copy.body}],`storm-lesson-${wave}-${lang}`);
  const choices:{id:StormChoice;title:string;desc:string;icon:string}[]=[
    {id:'shields',title:w('Protect the crew','ತಂಡ ರಕ್ಷಿಸಿ'),desc:w('Run shelter systems. Reduce exposure; use stored food.','ಆಶ್ರಯ ವ್ಯವಸ್ಥೆ ನಡೆಸಿ. ಪ್ರಭಾವ ಕಡಿಮೆ; ಸಂಗ್ರಹದ ಆಹಾರ ಬಳಕೆ.'),icon:'◈'},
    {id:'greenhouse',title:w('Protect the harvest','ಬೆಳೆ ರಕ್ಷಿಸಿ'),desc:w('Keep plants growing. Save food, but accept more exposure.','ಗಿಡ ಬೆಳೆಸಿ. ಆಹಾರ ಉಳಿಸಿ, ಆದರೆ ಹೆಚ್ಚು ಪ್ರಭಾವ.'),icon:'❋'},
    {id:'comms',title:w('Send research to Earth','ಭೂಮಿಗೆ ಮಾಹಿತಿ ಕಳುಹಿಸಿ'),desc:w('Share the storm data. The radio uses extra battery.','ಬಿರುಗಾಳಿ ಮಾಹಿತಿ ಹಂಚಿ. ರೇಡಿಯೋ ಹೆಚ್ಚು ಶಕ್ತಿ ಬಳಸುತ್ತದೆ.'),icon:'◎'},
  ];
  function commit(){if(!picked||locked.current)return;locked.current=true;const delta=stormDelta(picked,wave,{alloc,water,gearShielded});const before={...resources};applyDelta(delta);const after=useGame.getState().resources;setOutcome({power:after.power-before.power,food:after.food-before.food,o2:after.o2-before.o2,dose:after.dose-before.dose});recordPulse(picked);}
  return <MarsScene storm className="screen-pad" bg="/assets/bg-storm.svg"><div className="screen-content lab-content">
    <span className="eyebrow">{w('THE STORM','ಬಿರುಗಾಳಿ')} / 0{wave+1} OF 03</span><div className="storm-steps" aria-label={`${wave+1}/3`}>{[0,1,2].map(i=><span key={i} className={i<=wave?'active':''}/>)}</div>
    <h1 className="screen-title">{copy.title}</h1><p className="lab-intro">{copy.body}</p>
    {!outcome?<><p className="decision-note">{w('No countdown. Read, predict, then decide.','ಸಮಯದ ಒತ್ತಡವಿಲ್ಲ. ಓದಿ, ಊಹಿಸಿ, ನಿರ್ಧರಿಸಿ.')}</p><div className="storm-choices">{choices.map(c=>{const d=stormDelta(c.id,wave,{alloc,water,gearShielded});return <button key={c.id} aria-pressed={picked===c.id} className={picked===c.id?'selected':''} onClick={()=>setPicked(c.id)}><span className="choice-glyph">{c.icon}</span><div><strong>{c.title}</strong><p>{c.desc}</p><small>{w('Projected','ಅಂದಾಜು')}: {d.power} ⚡ · {d.food>0?'+':''}{d.food} {w('food','ಆಹಾರ')} · +{d.dose} {w('exposure','ಪ್ರಭಾವ')}</small></div><span aria-hidden="true">{picked===c.id?'●':'○'}</span></button>})}</div><button className="btn-main" disabled={!picked} onClick={commit}>{w('Commit to my decision','ನನ್ನ ನಿರ್ಧಾರ ದೃಢಪಡಿಸಿ')} →</button></>:<div className="experiment-result result-good" role="status"><span className="eyebrow">{w('CAUSE → EFFECT','ಕಾರಣ → ಪರಿಣಾಮ')}</span><h2>{choices.find(c=>c.id===picked)?.title}</h2><div className="outcome-values"><span>{outcome.power} ⚡</span><span>{outcome.food>0?'+':''}{outcome.food} {w('food','ಆಹಾರ')}</span><span>+{outcome.dose} {w('exposure','ಪ್ರಭಾವ')}</span></div><p>{w(`Your shelter allocation of ${alloc.shield} and ${gearShielded?'prepared':'light'} gear shaped the exposure. Your greenhouse allocation of ${alloc.green} shaped food loss. Preparation changes outcomes.`,`ಆಶ್ರಯದ ${alloc.shield} ಶಕ್ತಿ ಮತ್ತು ನಿಮ್ಮ ಸಾಧನಗಳು ಪ್ರಭಾವವನ್ನು ಬದಲಿಸಿದವು. ಹಸಿರುಮನೆಯ ${alloc.green} ಶಕ್ತಿ ಆಹಾರದ ನಷ್ಟ ಬದಲಿಸಿತು. ಸಿದ್ಧತೆ ಫಲಿತಾಂಶ ಬದಲಿಸುತ್ತದೆ.`)}</p><button className="btn-main" onClick={()=>{if(wave===2)go('recovery');else{setWave(wave+1);setOutcome(null);setPicked(null);locked.current=false;}}}>{wave===2?w('Review my mission','ಯಾತ್ರೆ ಪರಿಶೀಲಿಸಿ'):w('Next wave','ಮುಂದಿನ ಅಲೆ')} →</button></div>}
    <p className="simulation-note">{w('Simplified game model: solar radiation and Martian dust storms are different events. This scenario combines challenges to explore trade-offs.','ಸರಳ ಆಟದ ಮಾದರಿ: ಸೌರ ವಿಕಿರಣ ಮತ್ತು ಧೂಳಿನ ಬಿರುಗಾಳಿ ಬೇರೆ ಘಟನೆಗಳು. ಈ ಆಟ ಹೊಂದಾಣಿಕೆ ಕಲಿಸುತ್ತದೆ.')}</p>
  </div></MarsScene>;
}
