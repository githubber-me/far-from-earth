"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import { CHINNU, PixelSprite } from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ContinueButton } from "@/components/ui/ChoiceCards";

export default function Recovery() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const stormChoice = useGame((s) => s.stormChoice);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<"outcome" | "card">("outcome");

  const lines = useMemo<NarrationLine[]>(() => {
    const outcomeKey =
      stormChoice === "shields"
        ? "recovery.shields"
        : stormChoice === "greenhouse"
          ? "recovery.greenhouse"
          : "recovery.comms";
    const outcomeText =
      stormChoice === "shields"
        ? t.recovery.outcomeShields
        : stormChoice === "greenhouse"
          ? t.recovery.outcomeGreenhouse
          : t.recovery.outcomeComms;
    if (stage === "outcome") {
      return [
        { id: outcomeKey, speaker: "dhruva", text: fmt(outcomeText, { name: who }) },
        { id: "recovery.tradeoff", speaker: "dhruva", text: t.recovery.dhruvaTradeoff },
      ];
    }
    const chinnuLine =
      stormChoice === "shields" ? t.chinnu.recoverShields : t.chinnu.recoverOther;
    const chinnuId =
      stormChoice === "shields" ? "chinnu.recoverShields" : "chinnu.recoverOther";
    return [
      { id: chinnuId, speaker: "chinnu", text: chinnuLine },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, stormChoice, lang]);

  useNarration(lines, `recovery-${stage}-${stormChoice}-${lang}`);

  return (
    <MarsScene className="screen-pad after-storm">
      <div className="screen-content">
        {stage === "outcome" && (
          <ContinueButton label={t.recovery.btnContinue} onClick={() => setStage("card")} />
        )}

        {stage === "card" && (
          <div className="fade-in">
            <div className="science-card">
              <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
              <h3 className="science-title font-pixel">{t.recovery.cardTitle}</h3>
              <p className="science-body">{t.recovery.cardBody}</p>
              <p className="science-source">{t.recovery.cardSource}</p>
            </div>
            <ContinueButton
              label={t.recovery.btnContinue}
              onClick={() => go("ceremony")}
            />
          </div>
        )}
      </div>
    </MarsScene>
  );
}
