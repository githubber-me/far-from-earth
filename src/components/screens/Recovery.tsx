'use client';
import { useState } from 'react';
import { useGame } from '@/lib/game/store';
import { words } from '@/lib/game/mission';
import { MarsScene } from '@/components/ui/Scene';

export default function Recovery(){
 const {lang,resources,alloc,go}=useGame();
 const [answer,setAnswer]=useState<number|null>(null);
 const w=(en:string,kn:string)=>words(lang,en,kn);
 return <MarsScene className="screen-pad" bg="/assets/generated/outpost.svg"><div className="screen-content lab-content"><span className="eyebrow">{w('MISSION DEBRIEF','ಯಾತ್ರೆಯ ಪರಿಶೀಲನೆ')}</span><h1 className="screen-title">{w('You kept a world going.','ನೀವು ಒಂದು ಜಗತ್ತನ್ನು ನಡೆಸಿದಿರಿ.')}</h1><p className="lab-intro">{w('Now, connect the dots. A good explorer can explain what happened, not just finish a mission.','ಈಗ ಸಂಬಂಧಗಳನ್ನು ತಿಳಿಯಿರಿ. ಒಳ್ಳೆಯ ಅನ್ವೇಷಕ ಯಾತ್ರೆ ಮುಗಿಸುವುದಷ್ಟೇ ಅಲ್ಲ, ಏನಾಯಿತು ಎಂದು ವಿವರಿಸಬಲ್ಲ.')}</p>
 <div className="debrief-grid"><div><small>{w('AIR RESERVE','ಗಾಳಿ ಸಂಗ್ರಹ')}</small><strong>{resources.o2}</strong></div><div><small>{w('FOOD RESERVE','ಆಹಾರ ಸಂಗ್ರಹ')}</small><strong>{resources.food}</strong></div><div><small>{w('POWER LEFT','ಉಳಿದ ಶಕ್ತಿ')}</small><strong>{resources.power}/12</strong></div></div>
 <div className="experiment-result"><strong>{w('Your decisions left a footprint.','ನಿಮ್ಮ ನಿರ್ಧಾರಗಳು ಪರಿಣಾಮ ಬೀರಿದವು.')}</strong><p>{w(`You gave ${alloc.green} energy units to plants and ${alloc.shield} to shelter systems. You ended with ${resources.dose} exposure points. Try a different balance next mission and compare.`,`ನೀವು ಗಿಡಗಳಿಗೆ ${alloc.green} ಮತ್ತು ಆಶ್ರಯಕ್ಕೆ ${alloc.shield} ಶಕ್ತಿ ಘಟಕ ಕೊಟ್ಟಿರಿ. ಕೊನೆಯಲ್ಲಿ ${resources.dose} ಪ್ರಭಾವ ಅಂಕ ಉಳಿದವು. ಮುಂದಿನ ಬಾರಿ ಬೇರೆ ಹಂಚಿಕೆ ಮಾಡಿ ಹೋಲಿಸಿ.`)}</p></div>
 <div className="experiment-question"><span className="eyebrow">{w('BRING IT BACK TO EARTH','ಭೂಮಿಗೆ ಕಲಿಕೆ ತನ್ನಿ')}</span><h2>{w('Your school garden is wilting in the shade. What would you test first?','ನೆರಳಿನಲ್ಲಿ ಶಾಲೆಯ ಗಿಡಗಳು ಬಾಡುತ್ತಿವೆ. ಮೊದಲು ಏನನ್ನು ಪರೀಕ್ಷಿಸುತ್ತೀರಿ?')}</h2><div className="reflection-options">{[w('Keep adding more water','ಇನ್ನಷ್ಟು ನೀರು ಹಾಕುತ್ತಿರಿ'),w('Move one plant into light and compare','ಒಂದು ಗಿಡ ಬೆಳಕಿಗೆ ಸರಿಸಿ ಹೋಲಿಸಿ'),w('Change everything at once','ಎಲ್ಲವನ್ನೂ ಒಟ್ಟಿಗೆ ಬದಲಿಸಿ')].map((text,i)=><button key={i} aria-pressed={answer===i} onClick={()=>setAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{text}</button>)}</div>{answer!==null&&<p className="feedback" role="status">{answer===1?w('Yes. Change one thing and compare. That is how an experiment helps you understand cause and effect. The same thinking works on Mars and in your garden.','ಹೌದು. ಒಂದನ್ನು ಬದಲಿಸಿ ಹೋಲಿಸಿ. ಪ್ರಯೋಗ ಕಾರಣ ಮತ್ತು ಪರಿಣಾಮ ತಿಳಿಸುತ್ತದೆ. ಮಂಗಳದಲ್ಲೂ ತೋಟದಲ್ಲೂ ಇದೇ ಯೋಚನೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.'):w('Think about the greenhouse. Water and light do different jobs. Change just one condition so you can tell what helped. Try again.','ಹಸಿರುಮನೆ ನೆನಪಿಸಿಕೊಳ್ಳಿ. ನೀರು ಮತ್ತು ಬೆಳಕಿನ ಕೆಲಸ ಬೇರೆ. ಏನು ಸಹಾಯ ಮಾಡಿತು ತಿಳಿಯಲು ಒಂದನ್ನು ಮಾತ್ರ ಬದಲಿಸಿ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.')}</p>}</div>
 <button className="btn-main" disabled={answer!==1} onClick={()=>go('ceremony')}>{w('Complete my mission','ನನ್ನ ಯಾತ್ರೆ ಪೂರ್ಣಗೊಳಿಸಿ')} ↗</button></div></MarsScene>;
}
