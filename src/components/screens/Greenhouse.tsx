"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import type { Crop } from "@/lib/game/types";
import {
  CHINNU,
  PixelSprite,
  plantSprite,
  PLANT_FROZEN,
} from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ChoiceCard } from "@/components/ui/ChoiceCards";

type Stage = "pick" | "water" | "done";

const POTS = 4;

export default function Greenhouse() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const crop = useGame((s) => s.crop);
  const setCrop = useGame((s) => s.setCrop);
  const setCaption = useGame((s) => s.setCaption);
  const applyDelta = useGame((s) => s.applyDelta);
  const bumpStat = useGame((s) => s.bumpStat);
  const stormChoice = useGame((s) => s.stormChoice);
  const visits = useGame((s) => s.visits);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<Stage>(crop ? "water" : "pick");
  const [growth, setGrowth] = useState<number[]>(Array(POTS).fill(0));
  const waterNeeded = POTS;
  const watered = growth.filter((g) => g > 0).length;
  const trackRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const [dropTravel, setDropTravel] = useState(300);

  useEffect(() => {
    if (stage === "water" && trackRef.current) {
      setDropTravel(trackRef.current.clientWidth - 14);
    }
  }, [stage]);

  const lines = useMemo<NarrationLine[]>(() => {
    if (crop) {
      return [
        { id: "greenhouse.grow", speaker: "dhruva", text: fmt(t.greenhouse.dhruvaGrow, { name: who }) },
      ];
    }
    return [
      { id: "greenhouse.dhruva1", speaker: "dhruva", text: t.greenhouse.dhruva1 },
      { id: "greenhouse.dhruva2", speaker: "dhruva", text: fmt(t.greenhouse.dhruva2, { name: who }) },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop, lang]);

  useNarration(lines, `greenhouse-${crop ? "have" : "none"}-${lang}`);

  const crops: { id: Crop; label: string; icon: string[] }[] = [
    { id: "tomatoes", label: t.greenhouse.tomatoes, icon: plantSprite("tomatoes", 2) },
    { id: "potatoes", label: t.greenhouse.potatoes, icon: plantSprite("potatoes", 2) },
    { id: "sunflowers", label: t.greenhouse.sunflowers, icon: plantSprite("sunflowers", 2) },
  ];

  function pick(id: Crop) {
    setCrop(id);
    setCaption({ speaker: "chinnu", text: t.chinnu.gerald });
    setStage("water");
  }

  function pour() {
    const drop = dropRef.current;
    const zone = zoneRef.current;
    const track = trackRef.current;
    if (!drop || !zone || !track) return;
    const d = drop.getBoundingClientRect();
    const z = zone.getBoundingClientRect();
    const inZone = d.left + d.width / 2 >= z.left && d.left + d.width / 2 <= z.left + z.width;
    const pot = growth.findIndex((g) => g === 0);
    if (pot === -1) return;
    setGrowth((prev) => {
      const next = [...prev];
      next[pot] = Math.min(2, next[pot] + 1);
      return next;
    });
    if (inZone) {
      applyDelta({ food: 8 });
      bumpStat("plantsWatered");
      setCaption({ speaker: "chinnu", text: t.taskGreen.good });
    } else {
      applyDelta({ food: 1 });
      setCaption({ speaker: "chinnu", text: t.taskGreen.splash });
    }
  }

  const frozen = stormChoice === "shields";

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-greenhouse.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.map.greenhouse}</h2>

        <div className="plant-stage">
          {frozen ? (
            <PixelSprite grid={PLANT_FROZEN} scale={5} className="sprite-bob" />
          ) : (
            <div className="pot-row">
              {growth.map((g, i) => (
                <div key={i} className={`pot ${g > 0 ? "pot-grown" : ""}`}>
                  <PixelSprite
                    grid={plantSprite(crop ?? "tomatoes", g as 0 | 1 | 2)}
                    scale={4}
                  />
                </div>
              ))}
            </div>
          )}
          <span className="gerald-tag">
            {lang === "kn" ? "\u0c9c\u0cc6\u0cb0\u0cbe\u0cb2\u0ccd\u0ca1\u0ccd" : "Gerald"}
          </span>
        </div>

        {stage === "pick" && (
          <div className="fade-in">
            <div className="choice-grid">
              {crops.map(({ id, label, icon }) => (
                <ChoiceCard key={id} title={label} icon={<PixelSprite grid={icon} scale={4} />} onClick={() => pick(id)} />
              ))}
            </div>
          </div>
        )}

        {stage === "water" && !frozen && (
          <div className="fade-in water-game">
            <p className="task-instruct">{t.taskGreen.instruct}</p>
            <div className="water-track" ref={trackRef}>
              <div className="water-zone" ref={zoneRef} />
              <div className="water-drop" ref={dropRef} style={{ "--drop-travel": `${dropTravel}px` } as React.CSSProperties} />
            </div>
            <div className="water-actions">
              <button type="button" className="btn-main" onClick={pour} disabled={watered >= waterNeeded}>
                {t.taskGreen.waterBtn}
              </button>
              <span className="panel-progress font-pixel">
                {watered}/{waterNeeded} {t.taskGreen.waterTag}
              </span>
            </div>
            {watered >= waterNeeded && (
              <div className="fade-in">
                <p className="task-instruct">{t.taskGreen.allGrown}</p>
                <button type="button" className="btn-main" onClick={() => setStage("done")}>
                  {t.hud.continue}
                </button>
              </div>
            )}
          </div>
        )}

        {(stage === "done" || frozen) && (
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
