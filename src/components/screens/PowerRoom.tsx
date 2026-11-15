'use client';
import { useState } from 'react';
import { useGame } from '@/lib/game/store';
import { words } from '@/lib/game/mission';
import { MarsScene } from '@/components/ui/Scene';
import type { PowerAlloc } from '@/lib/game/types';

export default function PowerRoom() {
  const { lang, alloc, setAlloc, visit, visits, applyDelta, go } = useGame();
  const [tested, setTested] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const w = (en: string, kn: string) => words(lang, en, kn);
  const used = alloc.life + alloc.green + alloc.shield;
  const viable = used === 12 && Math.min(alloc.life, alloc.green, alloc.shield) >= 2;
  const systems: {key: keyof PowerAlloc; name: string; detail: string}[] = [
    {key:'life', name:w('Life support','ಜೀವ ರಕ್ಷಣೆ'), detail:w('More energy keeps the air system stable.','ಹೆಚ್ಚು ಶಕ್ತಿ ಗಾಳಿಯ ವ್ಯವಸ್ಥೆಯನ್ನು ಸ್ಥಿರಗೊಳಿಸುತ್ತದೆ.')},
    {key:'green', name:w('Greenhouse','ಹಸಿರುಮನೆ'), detail:w('Plants need light. Your crop will use this allocation.','ಗಿಡಗಳಿಗೆ ಬೆಳಕು ಬೇಕು. ನಿಮ್ಮ ಬೆಳೆ ಈ ಶಕ್ತಿಯನ್ನು ಬಳಸುತ್ತದೆ.')},
    {key:'shield', name:w('Shelter systems','ಆಶ್ರಯ ವ್ಯವಸ್ಥೆ'), detail:w('More energy supports protection during the storm.','ಹೆಚ್ಚು ಶಕ್ತಿ ಬಿರುಗಾಳಿಯ ರಕ್ಷಣೆಗೆ ನೆರವಾಗುತ್ತದೆ.')},
  ];
  return <MarsScene className="screen-pad" bg="/assets/bg-power.svg"><div className="screen-content lab-content">
    <span className="eyebrow">{w('EXPERIMENT 01 / ENERGY','ಪ್ರಯೋಗ 01 / ಶಕ್ತಿ')}</span><h1 className="screen-title">{w('Enough for everyone?','ಎಲ್ಲರಿಗೂ ಸಾಕೇ?')}</h1>
    <p className="lab-intro">{w('You have 12 units of solar energy. Share them between three systems. You cannot create more energy by moving a slider.','ನಿಮ್ಮ ಬಳಿ 12 ಶಕ್ತಿ ಘಟಕಗಳಿವೆ. ಮೂರು ವ್ಯವಸ್ಥೆಗಳಿಗೆ ಹಂಚಿ. ಸ್ಲೈಡರ್ ಚಲಿಸಿದರೆ ಹೊಸ ಶಕ್ತಿ ಸೃಷ್ಟಿಯಾಗುವುದಿಲ್ಲ.')}</p>
    <div className="experiment-question"><strong>{w('First, make a prediction','ಮೊದಲು ಊಹಿಸಿ')}</strong><p>{w('If you give the greenhouse more power, what must happen elsewhere?','ಹಸಿರುಮನೆಗೆ ಹೆಚ್ಚು ಶಕ್ತಿ ಕೊಟ್ಟರೆ ಬೇರೆಡೆ ಏನಾಗಬೇಕು?')}</p><div className="prediction-options">{[w('Another system gets less','ಮತ್ತೊಂದು ವ್ಯವಸ್ಥೆಗೆ ಕಡಿಮೆ ಸಿಗುತ್ತದೆ'),w('Nothing changes','ಏನೂ ಬದಲಾಗುವುದಿಲ್ಲ')].map((label,i)=><button key={i} aria-pressed={prediction === String(i)} onClick={()=>setPrediction(String(i))}>{label}</button>)}</div>{prediction && <p className="feedback" role="status">{prediction === '0' ? w('Exactly. A fixed budget means every gain has a trade-off.','ಸರಿ. ಸೀಮಿತ ಶಕ್ತಿಯಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಹೆಚ್ಚಳಕ್ಕೂ ಹೊಂದಾಣಿಕೆ ಬೇಕು.') : w('Try the sliders. The total is fixed: more here means less somewhere else.','ಸ್ಲೈಡರ್ ಬಳಸಿ ನೋಡಿ. ಒಟ್ಟು ಶಕ್ತಿ ಸ್ಥಿರ: ಇಲ್ಲಿ ಹೆಚ್ಚು ಕೊಟ್ಟರೆ ಬೇರೆಡೆ ಕಡಿಮೆ.')}</p>}</div>
    <div className="energy-budget"><span>{w('ENERGY BUDGET','ಶಕ್ತಿ ಮಿತಿ')}</span><strong>{12-used}<small> / 12 {w('unassigned','ಉಳಿದಿದೆ')}</small></strong></div>
    <div className="energy-controls">{systems.map(({key,name,detail})=><label key={key} className="energy-control"><span><strong>{name}</strong><b>{alloc[key]}</b></span><input aria-label={name} type="range" min="0" max="8" value={alloc[key]} onChange={e=>{const value=Number(e.target.value); if(used-alloc[key]+value<=12){setAlloc({...alloc,[key]:value});setTested(false);}}}/><small>{detail}</small></label>)}</div>
    <button className="btn-main" disabled={prediction === null} onClick={()=>setTested(true)}>{w('Test my power plan','ನನ್ನ ಶಕ್ತಿ ಯೋಜನೆ ಪರೀಕ್ಷಿಸಿ')} →</button>
    {tested && <div className={`experiment-result ${viable ? 'result-good' : ''}`} role="status"><strong>{viable ? w('Your outpost can run.','ನಿಮ್ಮ ನೆಲೆ ಕೆಲಸ ಮಾಡಬಲ್ಲದು.') : w('Your plan needs another look.','ಯೋಜನೆಯನ್ನು ಮತ್ತೊಮ್ಮೆ ನೋಡಿ.')}</strong><p>{viable ? w('All systems have a basic supply. More shelter power reduces storm exposure; more greenhouse power helps your crops. This plan will carry into the mission.','ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳಿಗೆ ಮೂಲ ಶಕ್ತಿ ಇದೆ. ಆಶ್ರಯಕ್ಕೆ ಹೆಚ್ಚು ಶಕ್ತಿ ಬಿರುಗಾಳಿ ಪ್ರಭಾವ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ; ಹಸಿರುಮನೆಗೆ ಹೆಚ್ಚು ಶಕ್ತಿ ಬೆಳೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.') : w('Use all 12 units and give each system at least 2. Lower one slider to free up energy, then try again.','ಎಲ್ಲಾ 12 ಘಟಕ ಬಳಸಿ, ಪ್ರತಿ ವ್ಯವಸ್ಥೆಗೆ ಕನಿಷ್ಠ 2 ಕೊಡಿ. ಒಂದು ಸ್ಲೈಡರ್ ಕಡಿಮೆ ಮಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.')}</p>{viable && <button className="btn-main" onClick={()=>{if(!visits.power)applyDelta({power:3});visit('power');go('map');}}>{w('Save plan & return','ಯೋಜನೆ ಉಳಿಸಿ ಹಿಂದಿರುಗಿ')} ↗</button>}</div>}
  </div></MarsScene>;
}
