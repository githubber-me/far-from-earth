"use client";

import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { displayName, fmt, STRINGS } from "@/lib/i18n/strings";
import { CHINNU, PixelSprite, ROCKET } from "@/components/ui/Sprites";
import { SpaceScene } from "@/components/ui/Scene";
import { ChoiceCard, ContinueButton } from "@/components/ui/ChoiceCards";

type Stage = "launch" | "secret" | "pick" | "sending" | "reply";

const WAIT_MS = 10000;

export default function TransitScreen() {
  const lang = useGame((s) => s.lang);
  const name = useGame((s) => s.name);
  const nameKn = useGame((s) => s.nameKn);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];
  const who = displayName(lang, name, nameKn);

  const [stage, setStage] = useState<Stage>("launch");
  const [message, setMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const lines = useMemo<NarrationLine[]>(() => {
    const out: NarrationLine[] = [];
    if (stage === "launch") {
      out.push({ id: "transit.launch", speaker: "dhruva", text: fmt(t.transit.dhruvaLaunch, { name: who }) });
    }
    if (stage === "secret") {
      out.push({ id: "transit.secret", speaker: "dhruva", text: t.transit.dhruvaSecret });
    }
    if (stage === "reply") {
      out.push({ id: "transit.reply", speaker: "dhruva", text: t.transit.dhruvaReply });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, lang]);

  useNarration(lines, `transit-${stage}-${lang}`);

  useEffect(() => {
    if (stage === "launch") {
      const timer = setTimeout(() => setStage("secret"), 4200);
      return () => clearTimeout(timer);
    }
    if (stage === "secret") {
      const timer = setTimeout(() => setStage("pick"), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [stage]);

  useEffect(() => {
    if (stage !== "sending") return undefined;
    setProgress(0);
    const started = Date.now();
    const tick = setInterval(() => {
      const pct = Math.min(1, (Date.now() - started) / WAIT_MS);
      setProgress(pct);
      if (pct >= 1) {
        clearInterval(tick);
        setStage("reply");
      }
    }, 100);
    return () => clearInterval(tick);
  }, [stage]);

  const showChinnu = stage === "sending" && progress > 0.45;

  return (
    <SpaceScene className="screen-pad">
      <div className="screen-content">
        <PixelSprite
          grid={ROCKET}
          scale={stage === "sending" ? 4 : 6}
          className={stage === "sending" ? "rocket-flight" : "sprite-bob"}
        />

        {stage === "launch" && <p className="stage-note font-pixel">...</p>}

        {stage === "pick" && (
          <div className="fade-in">
            <h2 className="screen-title">{t.transit.sendTitle}</h2>
            <div className="choice-grid">
              {[
                t.transit.msg1,
                t.transit.msg2,
                t.transit.msg3,
              ].map((msg) => (
                <ChoiceCard
                  key={msg}
                  title={msg}
                  onClick={() => {
                    setMessage(msg);
                    setStage("sending");
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === "sending" && (
          <div className="fade-in signal-block">
            <p className="signal-message">{message}</p>
            <p className="stage-note">{t.transit.waiting}</p>
            <div className="signal-track">
              <div className="signal-fill" style={{ width: `${progress * 100}%` }} />
            </div>
            {showChinnu && (
              <div className="chinnu-pop fade-in">
                <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
                <p className="chinnu-line">{t.chinnu.stowaway}</p>
              </div>
            )}
          </div>
        )}

        {stage === "reply" && (
          <div className="fade-in">
            <div className="earth-reply">
              <p className="reply-text">{message}</p>
              <p className="reply-text reply-answer">
                {lang === "kn" ? "ನಾವು ನಿಮ್ಮ ಮೇಲೆ ಹೆಮ್ಮೆ ಪಡುತ್ತೇವೆ!" : "We are so proud of you!"}
              </p>
            </div>
            <ContinueButton label={t.transit.btnContinue} onClick={() => go("arrival")} />
          </div>
        )}
      </div>
    </SpaceScene>
  );
}
