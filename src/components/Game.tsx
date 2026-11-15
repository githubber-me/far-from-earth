"use client";

import { Brand } from "@/components/ui/Brand";
import { words } from "@/lib/game/mission";
import { useEffect } from "react";
import { useGame } from "@/lib/game/store";
import { narrator } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import { CaptionBar } from "@/components/ui/Subtitles";
import BootScreen from "@/components/screens/BootScreen";
import BoardingScreen from "@/components/screens/BoardingScreen";
import TransitScreen from "@/components/screens/TransitScreen";
import ArrivalScreen from "@/components/screens/ArrivalScreen";
import StationMap from "@/components/screens/StationMap";
import PowerRoom from "@/components/screens/PowerRoom";
import Greenhouse from "@/components/screens/Greenhouse";
import LifeSupport from "@/components/screens/LifeSupport";
import SolReport from "@/components/screens/SolReport";
import Storm from "@/components/screens/Storm";
import Recovery from "@/components/screens/Recovery";
import Ceremony from "@/components/screens/Ceremony";
import Sources from "@/components/screens/Sources";
import { HudResources } from "@/components/ui/HudResources";
import { allStationsDone } from "@/lib/game/store";

function VoiceOnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 9h4l5-4v14l-5-4H3z" />
      <path d="M16 8c1.5 1 1.5 7 0 8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M19 5c3 2.5 3 11.5 0 14" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function VoiceOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 9h4l5-4v14l-5-4H3z" />
      <path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function Game() {
  const phase = useGame((s) => s.phase);
  const go = useGame((s) => s.go);
  const lang = useGame((s) => s.lang);
  const setLang = useGame((s) => s.setLang);
  const voiceOn = useGame((s) => s.voiceOn);
  const toggleVoice = useGame((s) => s.toggleVoice);
  const visits = useGame((s) => s.visits);
  const stats = useGame((s) => s.stats);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("md-lang");
      if (saved === "kn" || saved === "en") setLang(saved);
    } catch {
      // private mode, keep default
    }
  }, [setLang]);

  useEffect(() => {
    document.documentElement.lang = lang === "kn" ? "kn" : "en";
    try {
      window.localStorage.setItem("md-lang", lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    narrator.setEnabled(voiceOn);
  }, [voiceOn]);

  useEffect(() => { window.scrollTo(0, 0); }, [phase]);

  const t = STRINGS[lang];
  const sol = stats.stormPulses.length > 0 ? "03" : allStationsDone(visits) ? "02" : "01";

  const screen = (() => {
    switch (phase) {
      case "boot":
        return <BootScreen />;
      case "boarding":
        return <BoardingScreen />;
      case "transit":
        return <TransitScreen />;
      case "arrival":
        return <ArrivalScreen />;
      case "map":
        return <StationMap />;
      case "power":
        return <PowerRoom />;
      case "greenhouse":
        return <Greenhouse />;
      case "life":
        return <LifeSupport />;
      case "sol":
        return <SolReport />;
      case "storm":
        return <Storm />;
      case "recovery":
        return <Recovery />;
      case "ceremony":
        return <Ceremony />;
      case "sources":
        return <Sources />;
      default:
        return <BootScreen />;
    }
  })();

  return (
    <div className="game-root">
      {phase !== "boot" && (
        <div className="hud">
          <div className="hud-top">
            <Brand />
            <div className="hud-tele">
              <span>
                {t.hud.solDay} {sol}
              </span>
              <span className="hud-tele-sep" aria-hidden="true" />
              <span>Jezero station</span>
            </div>
            <div className="hud-actions">
              {(["power", "greenhouse", "life", "sol"].includes(phase) && visits[phase as keyof typeof visits] > 0) && <button className="hud-btn" onClick={() => go("map")}>{words(lang,"Outpost","ನೆಲೆ")} ↗</button>}
              <button
                type="button"
                className="hud-btn hud-lang"
                onClick={() => setLang(lang === "en" ? "kn" : "en")}
              >
                {lang === "en" ? "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1" : "EN"}
              </button>
              <button
                type="button"
                className="hud-btn"
                onClick={toggleVoice}
                aria-pressed={voiceOn}
              >
                {voiceOn ? <VoiceOnIcon /> : <VoiceOffIcon />}
                <span>{voiceOn ? t.hud.voiceOn : t.hud.voiceOff}</span>
              </button>
            </div>
          </div>
          {!["boarding", "arrival", "sources"].includes(phase) && <HudResources />}
          <a className="hud-si-disclosure" href="/disclosure">{words(lang, "SI-generated art & voices · Disclosure", "SI-ಸೃಷ್ಟಿತ ಚಿತ್ರ ಮತ್ತು ಧ್ವನಿ · ವಿವರಗಳು")}</a>
        </div>
      )}
      <div key={phase} className={`phase-view phase-${phase}`}>{screen}</div>
      <CaptionBar />
    </div>
  );
}
