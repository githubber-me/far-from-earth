"use client";

import { missionStars } from "@/lib/game/mission";
import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import { downloadCertificate } from "@/lib/game/certificate";
import { PixelSprite, STAR_ICON } from "@/components/ui/Sprites";
import { SpaceScene } from "@/components/ui/Scene";

export default function Ceremony() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const stormChoice = useGame((s) => s.stormChoice);
  const stats = useGame((s) => s.stats);
  const resources = useGame((s) => s.resources);
  const go = useGame((s) => s.go);
  const reset = useGame((s) => s.reset);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<"award" | "cert">("cert");

  const stars = missionStars(resources);
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
    <SpaceScene className="screen-pad" bg="/assets/bg-space.webp">
      <div className="screen-content">
        <h1 className="screen-title">{lang === "en" ? "Curiosity looks good on you." : "ಕುತೂಹಲ ನಿಮಗೆ ಚೆನ್ನಾಗಿ ಹೊಂದುತ್ತದೆ."}</h1>
        <p>{lang === "en" ? "You experimented, solved problems and learned why your choices matter." : "ನೀವು ಪ್ರಯೋಗಿಸಿ, ಸಮಸ್ಯೆ ಪರಿಹರಿಸಿ, ನಿರ್ಧಾರಗಳ ಮಹತ್ವ ಕಲಿತಿರಿ."}</p>
        <div className="astronaut-row">
          <img
            src="/assets/astronaut-celebrate.webp"
            alt="The kid astronaut celebrating"
            className="astro-art sprite-bob"
          />
          <img
            src="/assets/chinnu.png"
            alt="Chinnu the rover-bot"
            className="chinnu-art sprite-bob"
          />
        </div>

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

            <p className="simulation-note">{lang === "en" ? "Stars: one for air ≥55 and exposure <40; one for food ≥35; one for power ≥3. Every mission is a chance to learn." : "ನಕ್ಷತ್ರಗಳು: ಗಾಳಿ ≥55 ಮತ್ತು ಪ್ರಭಾವ <40; ಆಹಾರ ≥35; ಶಕ್ತಿ ≥3. ಪ್ರತಿ ಯಾತ್ರೆ ಕಲಿಯುವ ಅವಕಾಶ."}</p>
            <div className="stats-card">
              <h3 className="lang-pick-title">{t.missionStats.title}</h3>
              <ul className="stats-list">
                <li>
                  {lang === "en" ? "Energy plan tested" : "ಶಕ್ತಿ ಯೋಜನೆ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ"}
                </li>
                <li>
                  {stats.plantsWatered} {t.missionStats.plants}
                </li>
                <li>
                  {stats.pipesSolved} {t.missionStats.pipes}
                </li>
                <li>
                  {stats.stormPulses.length} {t.missionStats.pulses}
                </li>
              </ul>
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
