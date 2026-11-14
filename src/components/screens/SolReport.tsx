"use client";

import { useMemo } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import { INSIGHT_WEATHER } from "@/lib/data/nasa";
import { MarsScene } from "@/components/ui/Scene";
import { ContinueButton } from "@/components/ui/ChoiceCards";

export default function SolReport() {
  const lang = useGame((s) => s.lang);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  const lines = useMemo<NarrationLine[]>(
    () => [
      { id: "sol.report", speaker: "dhruva", text: t.sol.dhruvaReport },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );
  useNarration(lines, `sol-${lang}`);

  const celsius = (v: number) => `${v}\u00b0C`;

  return (
    <MarsScene className="screen-pad">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.sol.title}</h2>

        <div className="weather-card">
          <div className="weather-grid">
            <div className="weather-cell">
              <span className="weather-label">{t.sol.high}</span>
              <span className="weather-value font-pixel">{celsius(INSIGHT_WEATHER.highC)}</span>
            </div>
            <div className="weather-cell">
              <span className="weather-label">{t.sol.low}</span>
              <span className="weather-value font-pixel">{celsius(INSIGHT_WEATHER.lowC)}</span>
            </div>
            <div className="weather-cell">
              <span className="weather-label">{t.sol.pressure}</span>
              <span className="weather-value font-pixel">{INSIGHT_WEATHER.pressurePa} Pa</span>
            </div>
            <div className="weather-cell">
              <span className="weather-label">{t.sol.wind}</span>
              <span className="weather-value weather-wind">{INSIGHT_WEATHER.wind[lang]}</span>
            </div>
          </div>
          <p className="weather-attribution">{t.sol.attribution}</p>
        </div>

        <ContinueButton label={t.sol.btnContinue} onClick={() => go("map")} />
      </div>
    </MarsScene>
  );
}
