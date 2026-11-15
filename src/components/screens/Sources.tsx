"use client";

import { useGame } from "@/lib/game/store";
import { STRINGS } from "@/lib/i18n/strings";
import { SOURCES } from "@/lib/data/nasa";
import { SpaceScene } from "@/components/ui/Scene";

export default function Sources() {
  const lang = useGame((s) => s.lang);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  return (
    <SpaceScene className="screen-pad" bg="/assets/bg-space.webp">
      <div className="screen-content sources-content">
        <h2 className="screen-title font-pixel">{t.sources.title}</h2>
        <p className="eyebrow">Created by Anthahkarana</p>
        <p className="sources-intro">{t.sources.intro}</p>

        <ul className="sources-list">
          {SOURCES.map((source) => (
            <li key={source.name} className="source-item">
              <a
                className="source-link"
                href={source.url}
                target="_blank"
                rel="noreferrer"
              >
                {source.name}
              </a>
              <p className="source-use">{source.use[lang]}</p>
            </li>
          ))}
        </ul>

        <button type="button" className="btn-main" onClick={() => go(useGame.getState().stats.stormPulses.length ? "ceremony" : "boot")}>
          {t.sources.btnBack} <span aria-hidden="true">&#9654;</span>
        </button>
      </div>
    </SpaceScene>
  );
}
