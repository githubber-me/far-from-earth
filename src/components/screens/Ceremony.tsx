"use client";

import { useMemo, useState } from "react";
import { starsFor, useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import { downloadCertificate } from "@/lib/game/certificate";
import { ASTRONAUT_CELEBRATE, PixelSprite, STAR_ICON } from "@/components/ui/Sprites";
import { SpaceScene } from "@/components/ui/Scene";

export default function Ceremony() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const stormChoice = useGame((s) => s.stormChoice);
  const go = useGame((s) => s.go);
  const reset = useGame((s) => s.reset);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<"award" | "cert">("award");

  const stars = starsFor(stormChoice);
  const stormBadge =
    stormChoice === "shields"
      ? t.ceremony.badgeShields
      : stormChoice === "greenhouse"
        ? t.ceremony.badgeGerald
        : stormChoice === "comms"
          ? t.ceremony.badgeComms
          : t.ceremony.badgeExplorer;
  const badges = [stormBadge, t.ceremony.badgeExplorer];

  const lines = useMemo<NarrationLine[]>(() => {
    if (stage === "award") {
      return [
        { id: "ceremony.dhruva1", speaker: "dhruva", text: fmt(t.ceremony.dhruva1, { name: who }) },
        { id: "chinnu.proud", speaker: "chinnu", text: t.chinnu.proud },
      ];
    }
    return [
      { id: "ceremony.dhruva2", speaker: "dhruva", text: t.ceremony.dhruva2 },
      { id: "ceremony.close", speaker: "dhruva", text: fmt(t.ceremony.dhruvaClose, { name: who }) },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, lang]);

  useNarration(lines, `ceremony-${stage}-${lang}`);

  function download() {
    const dateStr = new Intl.DateTimeFormat(lang === "kn" ? "kn-IN" : "en-IN", {
      dateStyle: "long",
    }).format(new Date());
    void downloadCertificate({ name: who, lang, stars, badges, dateStr });
  }

  return (
    <SpaceScene className="screen-pad">
      <div className="screen-content">
        <PixelSprite grid={ASTRONAUT_CELEBRATE} scale={5} className="sprite-bob" />

        {stage === "award" && (
          <button
            type="button"
            className="btn-main"
            onClick={() => setStage("cert")}
          >
            {t.hud.continue}
          </button>
        )}

        {stage === "cert" && (
          <div className="fade-in cert-block">
            <div className="star-row">
              {Array.from({ length: stars }).map((_, i) => (
                <PixelSprite key={i} grid={STAR_ICON} scale={4} className="sprite-twinkle" />
              ))}
            </div>
            <p className="cert-stars-note font-pixel">
              {stars}/3 {t.ceremony.starsLabel}
            </p>
            <div className="badge-row">
              {badges.map((b) => (
                <span key={b} className="badge-chip">
                  {b}
                </span>
              ))}
            </div>

            <div className="cert-actions">
              <button type="button" className="btn-main" onClick={download}>
                {t.ceremony.btnDownload}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  reset();
                }}
              >
                {t.ceremony.btnReplay}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => go("sources")}
              >
                {t.ceremony.btnSources}
              </button>
            </div>
          </div>
        )}
      </div>
    </SpaceScene>
  );
}
