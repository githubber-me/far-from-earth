"use client";

import { useEffect } from "react";
import { useGame } from "@/lib/game/store";
import { STRINGS } from "@/lib/i18n/strings";
import type { Resources } from "@/lib/game/store";
import { IconAir, IconBolt, IconDose, IconLeaf } from "./Icons";

const RESOURCE_META: {
  key: keyof Resources;
  max: number;
  icon: (style: React.CSSProperties) => React.ReactNode;
  className: string;
}[] = [
  { key: "power", max: 12, icon: (s) => <IconBolt style={s} />, className: "res-power" },
  { key: "o2", max: 100, icon: (s) => <IconAir style={s} />, className: "res-o2" },
  { key: "food", max: 100, icon: (s) => <IconLeaf style={s} />, className: "res-food" },
  { key: "dose", max: 100, icon: (s) => <IconDose style={s} />, className: "res-dose" },
];

export function HudResources() {
  const lang = useGame((s) => s.lang);
  const resources = useGame((s) => s.resources);
  const deltas = useGame((s) => s.deltas);
  const clearDelta = useGame((s) => s.clearDelta);
  const t = STRINGS[lang].hud;

  useEffect(() => {
    if (deltas.length === 0) return;
    const timers = deltas.map((d) => setTimeout(() => clearDelta(d.id), 1500));
    return () => timers.forEach(clearTimeout);
  }, [deltas, clearDelta]);

  const labels = { power: t.resPower, o2: t.resO2, food: t.resFood, dose: t.resDose };

  return (
    <div className="hud-res" aria-label="Mission resources">
      {RESOURCE_META.map(({ key, max, icon, className }) => {
        const value = resources[key];
        const pct = Math.round((value / max) * 100);
        const warn =
          key === "dose" ? value >= 50 : value <= 25;
        return (
          <div key={key} className={`res-item ${className} ${warn ? "res-warn" : ""}`}>
            <span className="res-icon">{icon({ width: 16, height: 16 })}</span>
            <span className="res-mid">
              <span className="res-label">{labels[key]}</span>
              <span className="res-bar">
                <span className="res-fill" style={{ "--fill": String(Math.max(0, Math.min(1, value / max))) } as React.CSSProperties} />
              </span>
            </span>
            <span className="res-value">{value}</span>
            <span className="res-deltas" aria-hidden="true">
              {deltas
                .filter((d) => d.key === key)
                .map((d) => (
                  <span
                    key={d.id}
                    className={`delta-float ${d.amount > 0 ? (key === "dose" ? "delta-bad" : "delta-good") : (key === "dose" ? "delta-good" : "delta-bad")}`}
                  >
                    {d.amount > 0 ? `+${d.amount}` : d.amount}
                  </span>
                ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
