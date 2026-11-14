import type { Lang } from "@/lib/game/types";
import { STRINGS } from "@/lib/i18n/strings";

export interface CertificateInfo {
  name: string;
  lang: Lang;
  stars: number;
  badges: string[];
  dateStr: string;
}

const W = 1000;
const H = 700;

function drawStars(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#f9e7c8";
  const pts: [number, number, number][] = [
    [70, 60, 2], [180, 130, 1], [320, 50, 2], [520, 90, 1],
    [660, 40, 2], [800, 120, 1], [910, 60, 2], [120, 560, 1],
    [880, 520, 2], [940, 300, 1], [60, 300, 1], [500, 600, 1],
    [250, 620, 2], [700, 640, 1], [420, 30, 1],
  ];
  for (const [x, y, r] of pts) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMars(ctx: CanvasRenderingContext2D) {
  const cx = W - 150;
  const cy = H - 130;
  const r = 90;
  const grad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, r);
  grad.addColorStop(0, "#e0834f");
  grad.addColorStop(1, "#a34a2a");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(60,20,10,0.35)";
  for (const [dx, dy, dr] of [
    [-30, 10, 12], [20, -20, 8], [35, 25, 10], [-5, 45, 7],
  ] as const) {
    ctx.beginPath();
    ctx.arc(cx + dx, cy + dy, dr, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPixelAstronaut(ctx: CanvasRenderingContext2D) {
  // Simple pixel-art astronaut, 12 by 16 cells at 4 px each
  const grid = [
    "  WWWWWW  ",
    " WWWWWWWW ",
    " WBGWGBW  ",
    " WWWWWWWW ",
    "WWWOOWWWWW",
    "WWWWWWWWWW",
    "WWWWWWWWWW",
    " WWWW WWW ",
    " WO   OW  ",
    " WO   OW  ",
    " WWW  WWW ",
    " WW    WW ",
    " OO    OO ",
  ];
  const cell = 4;
  const x0 = 80;
  const y0 = H - 220;
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const ch = grid[y][x];
      if (ch === " ") continue;
      if (ch === "W") ctx.fillStyle = "#e8e4f0";
      if (ch === "O") ctx.fillStyle = "#e07b39";
      if (ch === "B") ctx.fillStyle = "#221a33";
      if (ch === "G") ctx.fillStyle = "#5fb3c9";
      ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
    }
  }
}

function drawBorder(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "#e07b39";
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, W - 48, H - 48);
  ctx.strokeStyle = "#5fb3c9";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, W - 80, H - 80);
}

export async function downloadCertificate(info: CertificateInfo) {
  const t = STRINGS[info.lang];
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#120c22");
  bg.addColorStop(1, "#251436");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  drawStars(ctx);
  drawMars(ctx);
  drawPixelAstronaut(ctx);
  drawBorder(ctx);

  ctx.textAlign = "center";
  ctx.fillStyle = "#e07b39";
  ctx.font = '700 30px "Noto Sans Kannada", sans-serif';
  ctx.fillText(t.boot.title.toUpperCase(), W / 2, 120);

  ctx.fillStyle = "#f9e7c8";
  ctx.font = '700 64px "Noto Sans Kannada", sans-serif';
  ctx.fillText(t.ceremony.certTitle, W / 2, 210);

  ctx.fillStyle = "#8fd3e8";
  ctx.font = '700 34px "Noto Sans Kannada", sans-serif';
  ctx.fillText(t.ceremony.certSubtitle, W / 2, 262);

  ctx.fillStyle = "#ffffff";
  ctx.font = '700 84px "Noto Sans Kannada", sans-serif';
  ctx.fillText(info.name, W / 2, 370);

  ctx.fillStyle = "#b9a7e0";
  ctx.font = '400 26px "Noto Sans Kannada", sans-serif';
  ctx.fillText(`${info.stars}/3 ${t.ceremony.starsLabel}`, W / 2, 425);
  ctx.fillText(info.badges.join(" | "), W / 2, 465);

  ctx.fillStyle = "#9c8fb8";
  ctx.font = '400 22px "Noto Sans Kannada", sans-serif';
  ctx.fillText(info.dateStr, W / 2, 530);

  ctx.fillStyle = "#6e6288";
  ctx.font = '400 18px "Noto Sans Kannada", sans-serif';
  ctx.fillText(t.boot.credit, W / 2, 620);

  const link = document.createElement("a");
  link.download = `mission-dhruva-${info.name.replace(/\s+/g, "-").toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
