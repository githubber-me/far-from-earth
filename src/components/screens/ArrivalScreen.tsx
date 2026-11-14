"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import { ASTRONAUT, DOME_ICON, PixelSprite } from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ContinueButton } from "@/components/ui/ChoiceCards";

type Stage = "arrive" | "chinnu" | "sol" | "map";

export default function ArrivalScreen() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<Stage>("arrive");

  const lines = useMemo<NarrationLine[]>(() => {
    const out: NarrationLine[] = [];
    if (stage === "arrive") {
      out.push({ id: "arrival.arrive", speaker: "dhruva", text: fmt(t.arrival.dhruvaArrive, { name: who }) });
    }
    if (stage === "chinnu") {
      out.push({ id: "arrival.chinnu", speaker: "dhruva", text: t.arrival.dhruvaChinnu });
      out.push({ id: "chinnu.arrival", speaker: "chinnu", text: t.chinnu.arrival });
    }
    if (stage === "sol") {
      out.push({ id: "arrival.sol", speaker: "dhruva", text: t.arrival.dhruvaSol });
    }
    if (stage === "map") {
      out.push({ id: "arrival.map", speaker: "dhruva", text: t.arrival.dhruvaMap });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, lang]);

  useNarration(lines, `arrival-${stage}-${lang}`);

  const nextFrom = (from: Stage) => {
    if (from === "arrive") setStage("chinnu");
    else if (from === "chinnu") setStage("sol");
    else if (from === "sol") setStage("map");
  };

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-outpost.webp">
      <div className="screen-content">
        <div className="outpost-panorama">
          <PixelSprite grid={DOME_ICON} scale={8} className="sprite-float" />
        </div>

        <div className="astronaut-row">
          <PixelSprite grid={ASTRONAUT} scale={5} className="sprite-bob" />
          {stage !== "arrive" && (
            <div className="fade-in">
              <img
                src="/assets/chinnu.png"
                alt="Chinnu the rover-bot"
                className="chinnu-art sprite-bob"
              />
            </div>
          )}
        </div>

        {stage === "arrive" && (
          <ContinueButton label={t.arrival.btnContinue} onClick={() => nextFrom("arrive")} />
        )}
        {stage === "chinnu" && (
          <ContinueButton label={t.arrival.btnContinue} onClick={() => nextFrom("chinnu")} />
        )}
        {stage === "sol" && (
          <div className="fade-in sol-chip">Sol 1 · ಸಾಲ್ 1</div>
        )}
        {stage === "sol" && (
          <ContinueButton label={t.arrival.btnContinue} onClick={() => nextFrom("sol")} />
        )}
        {stage === "map" && (
          <div className="fade-in">
            <ContinueButton label={t.arrival.btnContinue} onClick={() => go("map")} />
          </div>
        )}
      </div>
    </MarsScene>
  );
}
