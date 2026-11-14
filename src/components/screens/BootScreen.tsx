"use client";

import Image from "next/image";
import { useGame } from "@/lib/game/store";
import { STRINGS } from "@/lib/i18n/strings";

export default function BootScreen() {
  const lang = useGame((s) => s.lang);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  return (
    <button
      type="button"
      className="boot-screen"
      onClick={() => go("boarding")}
      aria-label={t.boot.tap}
      style={{
        backgroundImage: "url(/assets/bg-space.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="boot-mascot">
        <Image
          src="/assets/mascot.png"
          alt="Junior astronaut"
          width={275}
          height={600}
          priority
        />
      </div>
      <div className="boot-copy">
        <h1 className="boot-title">{t.boot.title}</h1>
        <p className="boot-sub">{t.boot.sub}</p>
        <span className="boot-tap">{t.boot.tap}</span>
      </div>
      <p className="boot-credit">{t.boot.credit}</p>
    </button>
  );
}
