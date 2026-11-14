"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { fmt, STRINGS } from "@/lib/i18n/strings";
import { transliterateToKannada, looksKannada } from "@/lib/i18n/transliterate";
import { ASTRONAUT, PixelSprite } from "@/components/ui/Sprites";
import { SpaceScene } from "@/components/ui/Scene";

export default function BoardingScreen() {
  const lang = useGame((s) => s.lang);
  const setLang = useGame((s) => s.setLang);
  const setName = useGame((s) => s.setName);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  const [name, setNameField] = useState("");
  const [nameKn, setNameKnField] = useState("");
  const [pickLang, setPickLang] = useState(false);

  useEffect(() => {
    if (name && !looksKannada(name)) {
      setNameKnField(transliterateToKannada(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const lines: NarrationLine[] = [{ id: "boarding.greet", speaker: "dhruva", text: t.boarding.dhruvaGreet }];
  useNarration(lines, "boarding-greet-" + lang);

  const canBoard = name.trim().length > 0 && nameKn.trim().length > 0 && pickLang;

  return (
    <SpaceScene className="screen-pad">
      <div className="screen-content">
        <PixelSprite grid={ASTRONAUT} scale={6} className="sprite-bob" />
        <h2 className="screen-title font-pixel">{t.boarding.nameLabel}</h2>
        <input
          className="name-input"
          value={name}
          onChange={(e) => {
            setNameField(e.target.value);
            setPickLang(false);
          }}
          placeholder={t.boarding.nameLabel}
          maxLength={20}
          autoComplete="off"
        />

        {name.trim().length > 0 && (
          <div className="name-kn-block">
            <label className="name-kn-label" htmlFor="nameKn">
              {t.boarding.nameKnLabel}
            </label>
            <input
              id="nameKn"
              className="name-input name-input-kn"
              value={nameKn}
              onChange={(e) => setNameKnField(e.target.value)}
              maxLength={24}
              autoComplete="off"
            />
            <p className="name-kn-hint">{t.boarding.nameKnHint}</p>
          </div>
        )}

        <h3 className="lang-pick-title font-pixel">{t.boarding.langPick}</h3>
        <div className="lang-row">
          <button
            type="button"
            className={`lang-btn ${lang === "en" ? "lang-active" : ""}`}
            onClick={() => {
              setLang("en");
              setPickLang(true);
            }}
          >
            English
          </button>
          <button
            type="button"
            className={`lang-btn lang-btn-kn ${lang === "kn" ? "lang-active" : ""}`}
            onClick={() => {
              setLang("kn");
              setPickLang(true);
            }}
          >
            ಕನ್ನಡ
          </button>
        </div>

        <button
          type="button"
          className="btn-main"
          disabled={!canBoard}
          onClick={() => {
            setName(name.trim(), nameKn.trim());
            go("transit");
          }}
        >
          {t.boarding.btnBoard} <span aria-hidden="true">&#9654;</span>
        </button>
      </div>
    </SpaceScene>
  );
}
