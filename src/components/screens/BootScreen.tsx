'use client';
import { useGame } from '@/lib/game/store';
import { words } from '@/lib/game/mission';
import { Brand } from '@/components/ui/Brand';

export default function BootScreen() {
  const { lang, setLang, go } = useGame();
  const w = (en: string, kn: string) => words(lang, en, kn);
  return <main className="launch-page">
    <header className="launch-nav">
      <Brand />
      <nav aria-label={w('Main navigation', 'ಮುಖ್ಯ ಸಂಚರಣೆ')}>
        <a href="#mission">{w('The mission', 'ನಮ್ಮ ಗುರಿ')}</a>
        <a href="#learn">{w('What you’ll learn', 'ಏನು ಕಲಿಯುತ್ತೀರಿ')}</a>
        <button className="language-switch" onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}>{lang === 'en' ? 'ಕನ್ನಡ' : 'English'} <span aria-hidden="true">↗</span></button>
      </nav>
    </header>
    <section className="launch-hero" id="mission">
      <div className="hero-story">
        <div className="eyebrow"><span className="status-dot"/>{w('A little curiosity. A whole new world.', 'ಸ್ವಲ್ಪ ಕುತೂಹಲ. ಒಂದು ಹೊಸ ಜಗತ್ತು.')}</div>
        <h1>{w('Far from Earth.', 'ಭೂಮಿಯಿಂದ ದೂರ.')}<br/><span>{w('Closer to what matters.', 'ಮುಖ್ಯವಾದುದಕ್ಕೆ ಹತ್ತಿರ.')}</span></h1>
        <p className="hero-description">{w('A tiny outpost on Mars. A crew counting on you. Explore, experiment and learn to keep a little world alive.', 'ಮಂಗಳದ ಮೇಲೆ ಪುಟ್ಟ ನೆಲೆ. ನಿಮ್ಮನ್ನು ನಂಬಿರುವ ತಂಡ. ಅನ್ವೇಷಿಸಿ, ಪ್ರಯೋಗಿಸಿ, ಈ ಪುಟ್ಟ ಜಗತ್ತನ್ನು ಜೀವಂತವಾಗಿಡಲು ಕಲಿಯಿರಿ.')}</p>
        <button className="launch-button" onClick={() => go('boarding')}>{w('Begin your mission', 'ನಿಮ್ಮ ಯಾತ್ರೆ ಆರಂಭಿಸಿ')}<span aria-hidden="true">↗</span></button>
        <div className="hero-meta"><span>{w('Ages 7–12', 'ವಯಸ್ಸು 7–12')}</span><i/><span>{w('Play at your pace', 'ನಿಮ್ಮ ವೇಗದಲ್ಲಿ ಆಡಿ')}</span><i/><span>EN / ಕನ್ನಡ</span></div>
        <a className="demo-link" href="/demo"> <span className="play-circle" aria-hidden="true">▶</span>{w('Watch the mission film', 'ಯಾತ್ರೆಯ ಚಿತ್ರ ನೋಡಿ')}<span aria-hidden="true">↗</span></a>
      </div>
      <div className="hero-world">
        <img src="/assets/generated/outpost.webp" alt={w('An astronaut and rover looking over their glowing Mars outpost', 'ಮಂಗಳದ ನೆಲೆಯನ್ನು ನೋಡುತ್ತಿರುವ ಗಗನಯಾತ್ರಿ ಮತ್ತು ರೋವರ್')} fetchPriority="high"/>
        <span className="world-coordinate">JEZERO / MARS<br/>MISSION 001</span>
        <div className="world-label"><span className="status-dot"/>{w('One small world. In your hands.', 'ಒಂದು ಪುಟ್ಟ ಜಗತ್ತು. ನಿಮ್ಮ ಕೈಯಲ್ಲಿ.')}<span className="world-cross">+</span></div>
      </div>
    </section>
    <section className="mission-intro" id="learn">
      <div className="intro-heading"><span className="eyebrow">{w('THE MISSION IS TO CARE', 'ನಮ್ಮ ಗುರಿ: ಕಾಳಜಿ')}</span><h2>{w('Don’t just visit Mars.\nUnderstand how life works.', 'ಮಂಗಳಕ್ಕೆ ಭೇಟಿ ಕೊಡುವುದಷ್ಟೇ ಅಲ್ಲ.\nಜೀವ ಹೇಗೆ ಉಳಿಯುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ.')}</h2></div>
      <p>{w('Every watt, every drop, every living thing is connected. Make a prediction. Try it out. Discover why your choices matter, on Mars and back home.', 'ಪ್ರತಿ ಹನಿ, ಪ್ರತಿ ಶಕ್ತಿ ಘಟಕ, ಪ್ರತಿ ಜೀವಿ ಪರಸ್ಪರ ಅವಲಂಬಿತ. ಊಹಿಸಿ. ಪ್ರಯೋಗಿಸಿ. ಮಂಗಳದಲ್ಲೂ ಭೂಮಿಯಲ್ಲೂ ನಿಮ್ಮ ನಿರ್ಧಾರಗಳು ಏಕೆ ಮುಖ್ಯ ಎಂದು ತಿಳಿಯಿರಿ.')}</p>
    </section>
    <div className="learning-path">
      {[
        ['01', w('Build a living system', 'ಜೀವಂತ ವ್ಯವಸ್ಥೆ ರಚಿಸಿ'), w('Route energy. Grow food. Close the water loop.', 'ಶಕ್ತಿ ಹಂಚಿ. ಆಹಾರ ಬೆಳೆಸಿ. ನೀರು ಮರುಬಳಸಿ.'), '↗'],
        ['02', w('Think like a scientist', 'ವಿಜ್ಞಾನಿಯಂತೆ ಯೋಚಿಸಿ'), w('Test an idea. Watch what changes. Try again.', 'ಊಹೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ. ಬದಲಾವಣೆ ನೋಡಿ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'), '◎'],
        ['03', w('Bring the lesson home', 'ಕಲಿತದ್ದನ್ನು ಮನೆಗೆ ತನ್ನಿ'), w('Protect your crew. Reflect on what you learned.', 'ತಂಡವನ್ನು ರಕ್ಷಿಸಿ. ಕಲಿತದ್ದನ್ನು ಯೋಚಿಸಿ.'), '✳'],
      ].map(([n, title, body, icon]) => <article key={n}><span className="path-number">{n}</span><div><h3>{title}</h3><p>{body}</p></div><span className="path-icon" aria-hidden="true">{icon}</span></article>)}
    </div>
    <footer className="launch-footer"><span>Created by <strong>Anthahkarana</strong></span><span>{w('A fictional mission. Real curiosity.', 'ಕಲ್ಪಿತ ಯಾತ್ರೆ. ನಿಜವಾದ ಕುತೂಹಲ.')}</span><button onClick={() => go('sources')}>{w('Science & sources', 'ವಿಜ್ಞಾನ ಮತ್ತು ಮೂಲಗಳು')} ↗</button></footer>
  </main>;
}
