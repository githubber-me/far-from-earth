"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import type { Crop } from "@/lib/game/types";
import { CHINNU, PixelSprite, plantSprite, PLANT_FROZEN } from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ChoiceCard } from "@/components/ui/ChoiceCards";

export default function Greenhouse() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const visits = useGame((s) => s.visits);
  const crop = useGame((s) => s.crop);
  const setCrop = useGame((s) => s.setCrop);
  const setCaption = useGame((s) => s.setCaption);
  const stormChoice = useGame((s) => s.stormChoice);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);
  const firstVisit = visits.greenhouse <= 1;

  const [picked, setPicked] = useState<Crop | null>(crop);

  const lines = useMemo<NarrationLine[]>(() => {
    if (!firstVisit) {
      return [
        {
          id: "greenhouse.grow",
          speaker: "dhruva",
          text: fmt(t.greenhouse.dhruvaGrow, { name: who }),
        },
      ];
    }
    return [
      { id: "greenhouse.dhruva1", speaker: "dhruva", text: t.greenhouse.dhruva1 },
      { id: "greenhouse.dhruva2", speaker: "dhruva", text: fmt(t.greenhouse.dhruva2, { name: who }) },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstVisit, lang]);

  useNarration(lines, `greenhouse-${firstVisit ? "first" : "again"}-${lang}`);

  const stage: 0 | 1 | 2 =
    visits.greenhouse >= 3 ? 2 : visits.greenhouse >= 2 ? 1 : 0;
  const frozen = stormChoice === "shields";

  const crops: { id: Crop; label: string; icon: string[] }[] = [
    { id: "tomatoes", label: t.greenhouse.tomatoes, icon: plantSprite("tomatoes", 2) },
    { id: "potatoes", label: t.greenhouse.potatoes, icon: plantSprite("potatoes", 2) },
    { id: "sunflowers", label: t.greenhouse.sunflowers, icon: plantSprite("sunflowers", 2) },
  ];

  function pick(id: Crop) {
    setCrop(id);
    setPicked(id);
    setCaption({ speaker: "chinnu", text: t.chinnu.gerald });
  }

  const stageLabel = frozen
    ? t.greenhouse.stageFrozen
    : stage === 0
      ? t.greenhouse.stageSprout
      : stage === 1
        ? t.greenhouse.stageYoung
        : t.greenhouse.stageMature;

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-greenhouse.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.map.greenhouse}</h2>

        <div className="plant-stage">
          <PixelSprite
            grid={frozen ? PLANT_FROZEN : plantSprite(crop ?? "sunflowers", stage)}
            scale={6}
            className="sprite-bob"
          />
          <span className="gerald-tag">{lang === "kn" ? "\u0c9c\u0cc6\u0cb0\u0cbe\u0cb2\u0ccd\u0ca1\u0ccd" : "Gerald"}</span>
          <span className="stage-tag">{stageLabel}</span>
        </div>

        {!picked ? (
          <div className="fade-in">
            <div className="choice-grid">
              {crops.map(({ id, label, icon }) => (
                <ChoiceCard
                  key={id}
                  title={label}
                  icon={<PixelSprite grid={icon} scale={4} />}
                  onClick={() => pick(id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="fade-in">
            <div className="chinnu-pop">
              <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
            </div>
            <button type="button" className="btn-main" onClick={() => go("map")}>
              {t.map.title} <span aria-hidden="true">&#9654;</span>
            </button>
          </div>
        )}
      </div>
    </MarsScene>
  );
}
