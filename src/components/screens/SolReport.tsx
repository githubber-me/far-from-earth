"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import { INSIGHT_WEATHER } from "@/lib/data/nasa";
import { MarsScene } from "@/components/ui/Scene";
import { ChoiceCard, ContinueButton } from "@/components/ui/ChoiceCards";

export default function SolReport() {
  const lang = useGame((s) => s.lang);
  const setCaption = useGame((s) => s.setCaption);
  const setGearShielded = useGame((s) => s.setGearShielded);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  const [packed, setPacked] = useState<"light" | "heavy" | null>(null);

  const lines = useMemo<NarrationLine[]>(
    () => [{ id: "sol.report", speaker: "dhruva", text: t.sol.dhruvaReport }],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );
  useNarration(lines, `sol-${lang}`);

  const celsius = (v: number) => `${v}\u00b0C`;

  function pack(kind: "light" | "heavy") {
    setPacked(kind);
    useGame.getState().visit("sol");
    if (kind === "heavy") {
      setGearShielded(true);
      setCaption({ speaker: "dhruva", text: t.taskSol.heavyRight });
    } else {
      setGearShielded(false);
      setCaption({ speaker: "dhruva", text: t.taskSol.lightGently });
    }
  }

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-sol.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.sol.title}</h2>

        <p className="decision-note">{lang === "en" ? "Solar storm alert: prepare to stay in the shelter. The weather readings below describe the surface; radiation is a separate hazard." : "ಸೌರ ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ: ಆಶ್ರಯದಲ್ಲಿ ಇರಲು ಸಿದ್ಧರಾಗಿ. ಕೆಳಗಿನ ಅಂಕಿಗಳು ಮೇಲ್ಮೈ ಹವಾಮಾನ; ವಿಕಿರಣ ಬೇರೆ ಅಪಾಯ."}</p>
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

        {!packed && (
          <div className="fade-in pack-block">
            <h3 className="lang-pick-title">{t.taskSol.packTitle}</h3>
            <div className="choice-grid">
              <ChoiceCard title={t.taskSol.light} desc={t.taskSol.lightDesc} onClick={() => pack("light")} />
              <ChoiceCard title={t.taskSol.heavy} desc={t.taskSol.heavyDesc} onClick={() => pack("heavy")} />
            </div>
          </div>
        )}

        {packed && <ContinueButton label={t.sol.btnContinue} onClick={() => go("map")} />}
      </div>
    </MarsScene>
  );
}
