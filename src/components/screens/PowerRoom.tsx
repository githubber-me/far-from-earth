"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { POWER_MAX, useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import type { PowerAlloc } from "@/lib/game/types";
import {
  CHINNU,
  PixelSprite,
  SHIELD_ICON,
  SUN_ICON,
  DOME_ICON,
  HEART_ICON,
} from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";

type Stage = "clean" | "allocate" | "done";

const PANEL_COUNT = 8;

export default function PowerRoom() {
  const lang = useGame((s) => s.lang);
  const visits = useGame((s) => s.visits);
  const alloc = useGame((s) => s.alloc);
  const setAlloc = useGame((s) => s.setAlloc);
  const setCaption = useGame((s) => s.setCaption);
  const applyDelta = useGame((s) => s.applyDelta);
  const bumpStat = useGame((s) => s.bumpStat);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const firstVisit = visits.power <= 1;

  const [stage, setStage] = useState<Stage>(firstVisit ? "clean" : "allocate");
  const [dust, setDust] = useState<number[] | null>(null);
  const [locked, setLocked] = useState(false);
  const barkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (stage === "clean" && dust === null) {
      setDust(
        Array.from({ length: PANEL_COUNT }, (_, i) =>
          Math.min(95, 35 + ((i * 37) % 61)),
        ),
      );
    }
  }, [stage, dust]);

  const lines = useMemo<NarrationLine[]>(() => {
    if (!firstVisit) return [];
    return [
      { id: "power.dhruva1", speaker: "dhruva", text: t.power.dhruva1 },
      { id: "power.dhruva2", speaker: "dhruva", text: t.power.dhruva2 },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstVisit, lang]);

  useNarration(lines, `power-${firstVisit ? "first" : "again"}-${lang}`);

  const cleaned = dust ? dust.filter((d) => d === 0).length : 0;
  const avgClean = dust ? (cleaned / PANEL_COUNT) * 100 : 0;
  const pool = Math.min(POWER_MAX, 6 + Math.round((avgClean / 100) * 6));

  function brushPanel(i: number) {
    if (!dust || dust[i] === 0) return;
    const next = [...dust];
    next[i] = Math.max(0, next[i] - 40);
    setDust(next);
    if (next[i] === 0) bumpStat("panelsCleaned");
    if (next.every((d) => d === 0)) {
      setCaption({ speaker: "dhruva", text: t.taskPower.doneAll });
      setTimeout(() => setStage("allocate"), 900);
    }
  }

  useEffect(() => {
    if (stage === "allocate" && firstVisit) {
      const current = useGame.getState().resources.power;
      applyDelta({ power: pool - current });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [stage]);

  const systems: { key: keyof PowerAlloc; label: string; icon: string[] }[] = [
    { key: "life", label: t.power.life, icon: HEART_ICON },
    { key: "green", label: t.power.green, icon: DOME_ICON },
    { key: "shield", label: t.power.shield, icon: SHIELD_ICON },
  ];

  const used = alloc.life + alloc.green + alloc.shield;
  const free = pool - used;

  function adjust(key: keyof PowerAlloc, delta: number, silent = false) {
    if (locked) return;
    const value = alloc[key] + delta;
    if (value < 0 || value > POWER_MAX) return;
    if (delta > 0 && free < 1) return;
    const next: PowerAlloc = { ...alloc, [key]: value };
    setAlloc(next);
    if (silent) return;
    if (barkTimer.current) clearTimeout(barkTimer.current);
    barkTimer.current = setTimeout(() => {
      const barkText =
        next.green <= 2
          ? t.power.barkCold
          : next.shield >= 6
            ? t.power.barkShield
            : next.life <= 2
              ? t.power.barkAir
              : t.power.barkBalanced;
      setCaption({ speaker: "dhruva", text: barkText });
    }, 400);
  }

  function lock() {
    setLocked(true);
    setCaption({
      speaker: "chinnu",
      text: free === 0 && alloc.shield >= 4 ? t.chinnu.powerGood : t.chinnu.powerBad,
    });
    setStage("done");
  }

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-power.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.map.power}</h2>

        {stage === "clean" && dust && (
          <div className="fade-in panel-game">
            <p className="task-instruct">{t.taskPower.instruct}</p>
            <div className="panel-grid">
              {dust.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  className={`panel-cell ${d === 0 ? "panel-clean" : ""}`}
                  onClick={() => brushPanel(i)}
                  aria-label={`panel ${i + 1} ${d === 0 ? t.taskPower.clean : t.taskPower.dusty}`}
                >
                  <span className="panel-dust" style={{ "--dust": String(d / 100) } as CSSProperties} />
                </button>
              ))}
            </div>
            <p className="panel-progress font-pixel">
              {cleaned}/{PANEL_COUNT} · {pool}/{POWER_MAX} {t.taskPower.pool}
            </p>
          </div>
        )}

        {stage === "allocate" && (
          <div className="fade-in alloc-wrap">
            <div className="alloc-rows">
              {systems.map(({ key, label, icon }) => (
                <div key={key} className="alloc-row">
                  <PixelSprite grid={icon} scale={3} />
                  <div className="alloc-mid">
                    <span className="alloc-label">{label}</span>
                    <div className="alloc-bar">
                      <div
                        className="alloc-fill"
                        style={{ "--fill": String(alloc[key] / POWER_MAX) } as CSSProperties}
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
              {free} / {pool} {t.power.units}
            </p>
            <button type="button" className="btn-main" onClick={lock} disabled={free > 0}>
              {t.power.btnLock}
            </button>
          </div>
        )}

        {stage === "done" && (
          <div className="fade-in">
            <div className="chinnu-pop">
              <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
            </div>
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
