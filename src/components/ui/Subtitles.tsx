"use client";

import { useGame } from "@/lib/game/store";

export function CaptionBar() {
  const caption = useGame((s) => s.caption);
  if (!caption) return null;
  const isDhruva = caption.speaker === "dhruva";
  return (
    <div className="caption-bar" role="status">
      <span
        className={`caption-speaker font-pixel ${isDhruva ? "caption-dhruva" : "caption-chinnu"}`}
      >
        {isDhruva ? "\u2726 DHRUVA" : "CHINNU"}
      </span>
      <p className="caption-text">{caption.text}</p>
    </div>
  );
}
