"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import type { StormChoice } from "@/lib/game/types";
import {
  ANTENNA_ICON,
  CHINNU_HIDING,
  DOME_ICON,
  PixelSprite,
  SHIELD_ICON,
} from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ChoiceCard, ContinueButton } from "@/components/ui/ChoiceCards";

export default function Storm() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const setStormChoice = useGame((s) => s.setStormChoice);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<"alert" | "choose">("alert");

  const lines = useMemo<NarrationLine[]>(() => {
    if (stage === "alert") {
      return [
        {
          id: "storm.dhruva1",
          speaker: "dhruva",
          text: fmt(t.storm.dhruva1, { name: who }),
        },
        { id: "chinnu.sneeze", speaker: "chinnu", text: t.chinnu.sneeze },
        { id: "chinnu.hide", speaker: "chinnu", text: t.chinnu.hide },
      ];
    }
    return [{ id: "storm.dhruva2", speaker: "dhruva", text: t.storm.dhruva2 }];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, lang]);

  useNarration(lines, `storm-${stage}-${lang}`);

  function choose(choice: StormChoice) {
    setStormChoice(choice);
    go("recovery");
  }

  return (
    <MarsScene storm className="screen-pad">
      <div className="screen-content">
        <h2 className="screen-title screen-title-alert font-pixel">{t.storm.title}</h2>

        <div className="storm-visual">
          <PixelSprite grid={CHINNU_HIDING} scale={5} className="sprite-shake" />
        </div>

        {stage === "alert" && (
          <ContinueButton
            label={lang === "kn" ? "ಮುಂದುವರಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ" : "Tap to continue"}
            onClick={() => setStage("choose")}
          />
        )}

        {stage === "choose" && (
          <div className="fade-in choice-grid">
            <ChoiceCard
              title={t.storm.shields}
              desc={t.storm.shieldsDesc}
              icon={<PixelSprite grid={SHIELD_ICON} scale={4} />}
              onClick={() => choose("shields")}
            />
            <ChoiceCard
              title={t.storm.greenhouse}
              desc={t.storm.greenhouseDesc}
              icon={<PixelSprite grid={DOME_ICON} scale={4} />}
              onClick={() => choose("greenhouse")}
            />
            <ChoiceCard
              title={t.storm.comms}
              desc={t.storm.commsDesc}
              icon={<PixelSprite grid={ANTENNA_ICON} scale={4} />}
              onClick={() => choose("comms")}
            />
          </div>
        )}
      </div>
    </MarsScene>
  );
}
