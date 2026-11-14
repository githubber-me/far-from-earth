"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
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

const WAVE_MS = 9000;
const WAVES: { key: string; cls: string }[] = [
  { key: "wave1", cls: "wave-1" },
  { key: "wave2", cls: "wave-2" },
  { key: "wave3", cls: "wave-3" },
];

export default function Storm() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const setStormChoice = useGame((s) => s.setStormChoice);
  const recordPulse = useGame((s) => s.recordPulse);
  const applyDelta = useGame((s) => s.applyDelta);
  const gearShielded = useGame((s) => s.gearShielded);
  const setCaption = useGame((s) => s.setCaption);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<"alert" | "waves">("alert");
  const [waveIdx, setWaveIdx] = useState(0);
  const [pct, setPct] = useState(1);
  const resolvedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lines = useMemo<NarrationLine[]>(() => {
    if (stage === "alert") {
      return [
        { id: "storm.dhruva1", speaker: "dhruva", text: fmt(t.storm.dhruva1, { name: who }) },
        { id: "chinnu.sneeze", speaker: "chinnu", text: t.chinnu.sneeze },
        { id: "chinnu.hide", speaker: "chinnu", text: t.chinnu.hide },
      ];
    }
    return [{ id: "storm.dhruva2", speaker: "dhruva", text: t.storm.dhruva2 }];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, lang]);

  useNarration(lines, `storm-${stage}-${lang}`);

  useEffect(() => {
    if (stage !== "waves") return;
    resolvedRef.current = false;
    setPct(1);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      const left = 1 - (Date.now() - start) / WAVE_MS;
      setPct(Math.max(0, left));
      if (left <= 0 && !resolvedRef.current) {
        resolvedRef.current = true;
        clearInterval(timerRef.current!);
        resolve(null);
      }
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, waveIdx]);

  function resolve(choice: StormChoice | null) {
    if (resolvedRef.current && choice !== null) return;
    resolvedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    const doseScale = gearShielded ? 0.7 : 1;
    const brace = choice === null;
    const picked: StormChoice = brace ? "shields" : choice;
    const delta =
      picked === "shields"
        ? brace
          ? { dose: Math.round(3 * doseScale), food: -6, power: -1 }
          : { dose: Math.round(6 * doseScale), food: -10, power: -2 }
        : picked === "greenhouse"
          ? { dose: Math.round(14 * doseScale), food: 12, power: -2 }
          : { dose: Math.round(9 * doseScale), food: -4, power: -3 };
    applyDelta(delta);
    recordPulse(picked);
    if (waveIdx >= WAVES.length - 1) {
      setTimeout(() => go("recovery"), 1200);
      setWaveIdx(WAVES.length);
    } else {
      setWaveIdx((w) => w + 1);
    }
  }

  function choose(choice: StormChoice) {
    if (resolvedRef.current) return;
    resolve(choice);
  }

  const waveKey = waveIdx < WAVES.length ? WAVES[waveIdx].key : null;

  return (
    <MarsScene storm className="screen-pad" bg="/assets/bg-storm.webp">
      <div className="screen-content">
        <h2 className="screen-title screen-title-alert font-pixel">{t.storm.title}</h2>

        {stage === "alert" && (
          <>
            <div className="storm-visual">
              <img
                src="/assets/astronaut-brave.webp"
                alt="The kid astronaut bracing bravely"
                className="astro-art sprite-bob"
              />
              <PixelSprite grid={CHINNU_HIDING} scale={5} className="sprite-shake" />
            </div>
            <ContinueButton
              label={lang === "kn" ? "\u0cae\u0cc1\u0c82\u0ca6\u0cc1\u0cb5\u0cb0\u0cbf\u0cb8\u0cb2\u0cc1 \u0c9f\u0ccd\u0caf\u0cbe\u0caa\u0ccd \u0cae\u0cbe\u0ca1\u0cbf" : "Tap to continue"}
              onClick={() => setStage("waves")}
            />
          </>
        )}

        {stage === "waves" && waveKey && (
          <div className="fade-in wave-block">
            <div className={`wave-timer ${WAVES[waveIdx].cls}`}>
              <div className="wave-fill" style={{ "--fill": String(pct) } as CSSProperties} />
            </div>
            <h3 className="wave-name font-pixel">{t.stormPulse[waveKey as keyof typeof t.stormPulse]}</h3>
            <div className="choice-grid">
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
            <p className="wave-brace">{t.stormPulse.brace}</p>
          </div>
        )}
      </div>
    </MarsScene>
  );
}
