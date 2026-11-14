"use client";

import { useMemo } from "react";
import { allStationsDone, useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import type { StationId } from "@/lib/game/types";
import {
  CHINNU,
  DOME_ICON,
  HEART_ICON,
  PixelSprite,
  SUN_ICON,
  THERMO_ICON,
} from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";

export default function StationMap() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const visits = useGame((s) => s.visits);
  const visit = useGame((s) => s.visit);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);
  const ready = allStationsDone(visits);

  const lines = useMemo<NarrationLine[]>(() => {
    if (ready) {
      return [{ id: "map.ready", speaker: "dhruva", text: t.map.stormReady }];
    }
    if (visits.power > 0 || visits.greenhouse > 0 || visits.life > 0 || visits.sol > 0) {
      return [{ id: "map.warn", speaker: "dhruva", text: t.sol.dhruvaDustWarn }];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, visits, lang]);

  useNarration(lines, `map-${ready}-${visits.power}${visits.greenhouse}${visits.life}${visits.sol}-${lang}`);

  const stations: { id: StationId; label: string; icon: string[] }[] = [
    { id: "power", label: t.map.power, icon: SUN_ICON },
    { id: "greenhouse", label: t.map.greenhouse, icon: DOME_ICON },
    { id: "life", label: t.map.life, icon: HEART_ICON },
    { id: "sol", label: t.map.sol, icon: THERMO_ICON },
  ];

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-outpost.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.map.title}</h2>
        <p className="map-commander">{fmt(t.map.commander, { name: who })}</p>

        <div className="station-grid">
          {stations.map(({ id, label, icon }) => {
            const done = visits[id] > 0;
            return (
              <button
                key={id}
                type="button"
                className={`station-card ${done ? "station-done" : ""}`}
                onClick={() => {
                  visit(id);
                  go(id);
                }}
              >
                <PixelSprite grid={icon} scale={4} />
                <span className="station-name">{label}</span>
                {done ? (
                  <span className="station-badge">
                    {t.map.done} {visits[id] > 1 ? `x${visits[id]}` : ""}
                  </span>
                ) : (
                  <span className="station-visit">{t.map.visit}</span>
                )}
              </button>
            );
          })}
        </div>

        {!ready && <p className="storm-note font-pixel">{t.map.stormWarning}</p>}

        {ready && (
          <button type="button" className="btn-storm" onClick={() => go("storm")}>
            {t.map.btnStorm} <span aria-hidden="true">&#9889;</span>
          </button>
        )}

        <div className="map-chinnu">
          <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
        </div>
      </div>
    </MarsScene>
  );
}
