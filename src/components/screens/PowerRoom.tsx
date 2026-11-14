"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { POWER_TOTAL, useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import type { PowerAlloc } from "@/lib/game/types";
import { CHINNU, PixelSprite, SHIELD_ICON, SUN_ICON, DOME_ICON, HEART_ICON } from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";

type Bark = "cold" | "shield" | "air" | "balanced" | null;

export default function PowerRoom() {
  const lang = useGame((s) => s.lang);
  const visits = useGame((s) => s.visits);
  const alloc = useGame((s) => s.alloc);
  const setAlloc = useGame((s) => s.setAlloc);
  const setCaption = useGame((s) => s.setCaption);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const firstVisit = visits.power <= 1;

  const [locked, setLocked] = useState(false);
  const [chinnuShown, setChinnuShown] = useState(false);
  const barkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lines = useMemo<NarrationLine[]>(() => {
    if (!firstVisit) return [];
    return [
      { id: "power.dhruva1", speaker: "dhruva", text: t.power.dhruva1 },
      { id: "power.dhruva2", speaker: "dhruva", text: t.power.dhruva2 },
      { id: "power.dhruva3", speaker: "dhruva", text: t.power.dhruva3 },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstVisit, lang]);

  useNarration(lines, `power-${firstVisit ? "first" : "again"}-${lang}`);

  const systems: {
    key: keyof PowerAlloc;
    label: string;
    icon: string[];
  }[] = [
    { key: "life", label: t.power.life, icon: HEART_ICON },
    { key: "green", label: t.power.green, icon: DOME_ICON },
    { key: "shield", label: t.power.shield, icon: SHIELD_ICON },
  ];

  const used = alloc.life + alloc.green + alloc.shield;
  const free = POWER_TOTAL - used;

  function adjust(key: keyof PowerAlloc, delta: number) {
    if (locked) return;
    const value = alloc[key] + delta;
    if (value < 0 || value > POWER_TOTAL) return;
    if (delta > 0 && free < 1) return;
    const next: PowerAlloc = { ...alloc, [key]: value };
    setAlloc(next);

    if (barkTimer.current) clearTimeout(barkTimer.current);
    barkTimer.current = setTimeout(() => {
      let bark: Bark = null;
      if (next.green <= 2) bark = "cold";
      else if (next.shield >= 6) bark = "shield";
      else if (next.life <= 2) bark = "air";
      else bark = "balanced";
      const barkText =
        bark === "cold"
          ? t.power.barkCold
          : bark === "shield"
            ? t.power.barkShield
            : bark === "air"
              ? t.power.barkAir
              : t.power.barkBalanced;
      setCaption({ speaker: "dhruva", text: barkText });
    }, 400);
  }

  function lock() {
    setLocked(true);
    setChinnuShown(true);
    setCaption({
      speaker: "chinnu",
      text: free === 0 && alloc.shield >= 4 ? t.chinnu.powerGood : t.chinnu.powerBad,
    });
  }

  return (
    <MarsScene className="screen-pad">
      <div className="screen-content">
        <PixelSprite grid={SUN_ICON} scale={5} className="sprite-float" />
        <h2 className="screen-title font-pixel">{t.map.power}</h2>

        <div className="alloc-rows">
          {systems.map(({ key, label, icon }) => (
            <div key={key} className="alloc-row">
              <PixelSprite grid={icon} scale={3} />
              <div className="alloc-mid">
                <span className="alloc-label">{label}</span>
                <div className="alloc-bar">
                  <div
                    className="alloc-fill"
                    style={{ "--fill": String(alloc[key] / POWER_TOTAL) } as CSSProperties}
                  />
                </div>
              </div>
              <div className="alloc-btns">
                <button
                  type="button"
                  className="alloc-btn"
                  onClick={() => adjust(key, -1)}
                  disabled={locked || alloc[key] <= 0}
                >
                  &minus;
                </button>
                <span className="alloc-value font-pixel">{alloc[key]}</span>
                <button
                  type="button"
                  className="alloc-btn"
                  onClick={() => adjust(key, 1)}
                  disabled={locked || free < 1}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="alloc-free font-pixel">
          {free} / {POWER_TOTAL} {t.power.units}
        </p>

        {!locked ? (
          <button
            type="button"
            className="btn-main"
            onClick={lock}
            disabled={free > 0}
          >
            {t.power.btnLock}
          </button>
        ) : (
          <div className="fade-in">
            {chinnuShown && (
              <div className="chinnu-pop">
                <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
              </div>
            )}
            <p className="locked-note font-pixel">{t.power.locked}</p>
            <button type="button" className="btn-main" onClick={() => go("map")}>
              {t.map.title} <span aria-hidden="true">&#9654;</span>
            </button>
          </div>
        )}
      </div>
    </MarsScene>
  );
}
