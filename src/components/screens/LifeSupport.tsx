"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import type { WaterPolicy } from "@/lib/game/types";
import { CHINNU, PixelSprite } from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ChoiceCard } from "@/components/ui/ChoiceCards";

export default function LifeSupport() {
  const lang = useGame((s) => s.lang);
  const water = useGame((s) => s.water);
  const setWater = useGame((s) => s.setWater);
  const setCaption = useGame((s) => s.setCaption);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  const [chosen, setChosen] = useState<WaterPolicy | null>(water);

  const lines = useMemo<NarrationLine[]>(() => {
    if (water) return [];
    return [
      { id: "life.dhruva1", speaker: "dhruva", text: t.life.dhruva1 },
      { id: "life.dhruva2", speaker: "dhruva", text: t.life.dhruva2 },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [water, lang]);

  useNarration(lines, `life-${water ? "done" : "new"}-${lang}`);

  const options: { id: WaterPolicy; title: string; desc: string }[] = [
    { id: "comfort", title: t.life.comfort, desc: t.life.comfortDesc },
    { id: "balanced", title: t.life.balanced, desc: t.life.balancedDesc },
    { id: "savers", title: t.life.savers, desc: t.life.saversDesc },
  ];

  function choose(id: WaterPolicy) {
    setWater(id);
    setChosen(id);
    setCaption({ speaker: "chinnu", text: t.chinnu.water });
  }

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-life.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.map.life}</h2>

        {!chosen ? (
          <div className="choice-grid">
            {options.map(({ id, title, desc }) => (
              <ChoiceCard key={id} title={title} desc={desc} onClick={() => choose(id)} />
            ))}
          </div>
        ) : (
          <div className="fade-in">
            <div className="chinnu-pop">
              <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
            </div>
            <p className="chosen-note">{options.find((o) => o.id === chosen)?.title}</p>
            <button type="button" className="btn-main" onClick={() => go("map")}>
              {t.map.title} <span aria-hidden="true">&#9654;</span>
            </button>
          </div>
        )}
      </div>
    </MarsScene>
  );
}
