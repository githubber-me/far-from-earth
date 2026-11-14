"use client";

import { useGame } from "@/lib/game/store";

export function CaptionBar() {
  const caption = useGame((s) => s.caption);
  const lang = useGame((s) => s.lang);
  if (!caption) return null;
  const isDhruva = caption.speaker === "dhruva";
  const label = isDhruva
    ? lang === "kn"
      ? "\u0ca7\u0ccd\u0cb0\u0cc1\u0cb5"
      : "Dhruva"
    : lang === "kn"
      ? "\u0c9a\u0cbf\u0ca8\u0ccd\u0ca8\u0cc1"
      : "Chinnu";
  return (
    <div className="caption-bar" role="status">
      <div className="caption-inner">
        <span
          className={`caption-speaker ${isDhruva ? "caption-dhruva" : "caption-chinnu"}`}
        >
          {label}
        </span>
        <p className="caption-text">{caption.text}</p>
      </div>
    </div>
  );
}
