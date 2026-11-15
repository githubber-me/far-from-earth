'use client';
import { allStationsDone, useGame } from '@/lib/game/store';
import { STATIONS, words } from '@/lib/game/mission';
import { STRINGS, displayName } from '@/lib/i18n/strings';

export default function StationMap() {
  const { lang, name, nameKn, visits, go } = useGame();
  const w = (en: string, kn: string) => words(lang, en, kn);
  const t = STRINGS[lang];
  const count = STATIONS.filter(id => visits[id] > 0).length;
  const ready = allStationsDone(visits);
  const descriptions = [
    w('Split a limited supply. Keep every system running.', 'ಸೀಮಿತ ಶಕ್ತಿ ಹಂಚಿ. ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳನ್ನು ನಡೆಸಿ.'),
    w('Experiment with water and light. Grow your food.', 'ನೀರು ಮತ್ತು ಬೆಳಕಿನ ಪ್ರಯೋಗ ಮಾಡಿ. ಆಹಾರ ಬೆಳೆಸಿ.'),
    w('Repair the pipes. Make every drop count.', 'ಪೈಪ್ ಸರಿಪಡಿಸಿ. ಪ್ರತಿ ಹನಿಯನ್ನು ಉಳಿಸಿ.'),
    w('Read the weather. Prepare for what comes next.', 'ಹವಾಮಾನ ತಿಳಿಯಿರಿ. ಮುಂದಿನ ಸವಾಲಿಗೆ ಸಿದ್ಧರಾಗಿ.'),
  ];
  const icons = ['↯', '❋', '◉', '☼'];
  return <main className="mission-dashboard">
    <div className="dashboard-title"><div><span className="eyebrow">{w('YOUR FIRST SOL ON MARS', 'ಮಂಗಳದ ಮೊದಲ ದಿನ')}</span><h1>{w('A world worth caring for.', 'ಕಾಳಜಿಗೆ ಅರ್ಹವಾದ ಜಗತ್ತು.')}</h1><p>{w(`Welcome, ${displayName(lang, name, nameKn)}. Get your outpost ready for the storm.`, `${displayName(lang, name, nameKn)}, ಸ್ವಾಗತ. ಬಿರುಗಾಳಿಗೆ ನೆಲೆಯನ್ನು ಸಿದ್ಧಗೊಳಿಸಿ.`)}</p></div><div className="mission-progress"><strong>{count}<small>/4</small></strong><span>{w('systems prepared', 'ವ್ಯವಸ್ಥೆಗಳು ಸಿದ್ಧ')}</span></div></div>
    <div className="dashboard-layout">
      <section className="outpost-view"><img src="/assets/generated/outpost.webp" alt={w('Your Mars outpost', 'ನಿಮ್ಮ ಮಂಗಳ ನೆಲೆ')}/><span className="map-tag">JEZERO STATION</span><div className="map-status"><span className="status-dot"/>{ready ? w('Outpost ready. Your decisions come next.', 'ನೆಲೆ ಸಿದ್ಧ. ಮುಂದಿನ ನಿರ್ಧಾರ ನಿಮ್ಮದು.') : w('Explore the systems. Build your understanding.', 'ವ್ಯವಸ್ಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ತಿಳುವಳಿಕೆ ಬೆಳೆಸಿ.')}</div></section>
      <section className="mission-tasks" aria-label={w('Preparation tasks', 'ಸಿದ್ಧತಾ ಕಾರ್ಯಗಳು')}>
        {STATIONS.map((id, i) => <button key={id} className={`mission-task ${visits[id] ? 'task-complete' : ''}`} onClick={() => go(id)}><span className="task-symbol" aria-hidden="true">{icons[i]}</span><span><small>{visits[id] ? w('COMPLETE · EXPLORE AGAIN', 'ಪೂರ್ಣ · ಮತ್ತೆ ನೋಡಿ') : `${w('EXPERIMENT', 'ಪ್ರಯೋಗ')} 0${i+1}`}</small><strong>{t.map[id]}</strong><span className="task-description">{descriptions[i]}</span></span><span className="task-arrow" aria-hidden="true">{visits[id] ? '✓' : '↗'}</span></button>)}
      </section>
    </div>
    <div className="dashboard-bottom"><div><span className="eyebrow">{w('YOUR NEXT CHALLENGE', 'ಮುಂದಿನ ಸವಾಲು')}</span><h2>{w('A storm will test your choices.', 'ಬಿರುಗಾಳಿ ನಿಮ್ಮ ನಿರ್ಧಾರಗಳನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ.')}</h2><p>{ready ? w('Your power plan and preparation will change what happens. Take your time and think it through.', 'ನಿಮ್ಮ ಶಕ್ತಿ ಯೋಜನೆ ಫಲಿತಾಂಶ ಬದಲಿಸುತ್ತದೆ. ಸಮಯ ತೆಗೆದುಕೊಂಡು ಯೋಚಿಸಿ.') : w('Complete all four experiments to unlock the storm. You can revisit your decisions before you begin.', 'ಬಿರುಗಾಳಿಗೆ ಮುನ್ನ ನಾಲ್ಕೂ ಪ್ರಯೋಗಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ. ನಿರ್ಧಾರಗಳನ್ನು ಬದಲಾಯಿಸಬಹುದು.')}</p></div><button className="launch-button" disabled={!ready} onClick={() => go('storm')}>{w('Face the storm', 'ಬಿರುಗಾಳಿ ಎದುರಿಸಿ')} <span aria-hidden="true">↗</span></button></div>
    <p className="simulation-note">{w('Learning simulation · Resource values are game units, not real engineering measurements.', 'ಕಲಿಕೆಯ ಮಾದರಿ · ಸಂಪನ್ಮೂಲಗಳು ಆಟದ ಘಟಕಗಳು, ನಿಜವಾದ ಅಳತೆಗಳಲ್ಲ.')}</p>
  </main>;
}
