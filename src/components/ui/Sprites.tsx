"use client";

import type { CSSProperties, ReactNode } from "react";

const COLORS: Record<string, string> = {
  W: "#e8e4f0",
  B: "#221a33",
  G: "#7cc7dd",
  O: "#e07b39",
  M: "#9c6b4f",
  m: "#5a4636",
  L: "#f2e6c8",
  g: "#57b25a",
  d: "#2f7a34",
  r: "#d9453f",
  y: "#f2c14e",
  b: "#9fd8e8",
  Y: "#f2c14e",
  K: "#3a2c22",
};

export function PixelSprite({
  grid,
  scale = 4,
  className,
  style,
}: {
  grid: string[];
  scale?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const h = grid.length;
  const w = Math.max(...grid.map((row) => row.length));
  const rects: ReactNode[] = [];
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const ch = grid[y][x];
      if (ch === " " || ch === ".") continue;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={1}
          height={1}
          fill={COLORS[ch] ?? "#ff00ff"}
        />,
      );
    }
  }
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}

export const ASTRONAUT = [
  "   WWWWW   ",
  "  WWWWWWW  ",
  "  WBBBBBW  ",
  "  WBGBGBW  ",
  "  WWWWWWW  ",
  " MWOOOOOWM ",
  " MWOOOOOWM ",
  " MWWWWWWWM ",
  "  WWWWWWW  ",
  "  WWW.WWW  ",
  "  WO   OW  ",
  "  WO   OW  ",
  "  WW   WW  ",
  "  BB   BB  ",
];

export const ASTRONAUT_CELEBRATE = [
  "   WWWWW  O",
  "  WWWWWWW O",
  "  WBBBBBW O",
  "  WBGBGBW  ",
  "  WWWWWWW  ",
  " MWOOOOOWM ",
  " MWOOOOOWM ",
  " MWWWWWWWM ",
  "  WWWWWWW  ",
  "  WWW.WWW  ",
  "  WO   OW  ",
  "  WO   OW  ",
  "  WW   WW  ",
  "  BB   BB  ",
];

export const CHINNU = [
  "     Y      ",
  "  MMMMMMMM  ",
  "  MLLLLLLM  ",
  "  MLBLLBLM  ",
  "  MMMMMMMM  ",
  "  MM    MM  ",
  " BMM    MMB ",
  " BBB    BBB ",
];

export const CHINNU_SLEEPY = [
  "            ",
  "  MMMMMMMM  ",
  "  MLLLLLLM  ",
  "  MLBLLBLM  ",
  "  MMMMMMMM  ",
  "  MM    MM  ",
  " BMM    MMB ",
  " BBB    BBB ",
];

export const CHINNU_HIDING = [
  "     Y      ",
  "  MMMMMMMM  ",
  "  MLLLLLLM  ",
  "  MLBLLBLM  ",
  "  MMMMMMMM  ",
  "  M      M  ",
  "  M      M  ",
  "  MMMMMMMM  ",
];

export const ROCKET = [
  "    WW     ",
  "   WWW     ",
  "   WGW     ",
  "   WGW     ",
  "   WWW     ",
  "  WWWWW    ",
  "  WOWOW    ",
  "  WWWWW    ",
  " WWWWWWW   ",
  "OW W W WO  ",
  "OW     WO  ",
  "YY     YY  ",
  " Y      Y  ",
];

export function plantSprite(
  crop: "tomatoes" | "potatoes" | "sunflowers",
  stage: 0 | 1 | 2,
): string[] {
  const pot = ["  mmmmmm  ", "  mmmmmm  "];
  if (stage === 0) {
    return ["    gg    ", "   g  g   ", "    dd    ", ...pot];
  }
  if (crop === "tomatoes") {
    return [
      "  grgrg   ",
      " gggggg g ",
      " r gg r   ",
      "  gggg    ",
      "    dd    ",
      "    dd    ",
      ...pot,
    ];
  }
  if (crop === "potatoes") {
    return [
      " gg  gg   ",
      " gggggg   ",
      " gggggg   ",
      "  gggg    ",
      "    dd    ",
      "    dd    ",
      ...pot,
    ];
  }
  return [
    "   yyyy   ",
    "  yyYYyy  ",
    "  yyBBYY  ",
    "   yyyy   ",
    "    dd    ",
    "    dd    ",
    ...pot,
  ];
}

export const PLANT_FROZEN = [
  "  b  bb    ",
  " bbbb b    ",
  "  bbbb     ",
  "   bb      ",
  "   db      ",
  "   bb      ",
  "  mmmmmm   ",
  "  mmmmmm   ",
];

export const SUN_ICON = [
  "    Y      ",
  " Y  YY  Y  ",
  "  YYYYY    ",
  " YYYYYYY   ",
  " YYWYYYY   ",
  " YYYYYYY   ",
  "  YYYYY    ",
  " Y  YY  Y  ",
  "    Y      ",
];

export const DOME_ICON = [
  "   gggg    ",
  "  gggggg   ",
  " gg    gg  ",
  " g  gg  g  ",
  " g  dd  g  ",
  " mmmmmmmm  ",
  " mmmmmmmm  ",
];

export const HEART_ICON = [
  "  rr  rr   ",
  " rrrr rrr  ",
  " rrrrrrrr  ",
  " rrrrrrrr  ",
  "  rrrrrr   ",
  "   rrrr    ",
  "    rr     ",
];

export const THERMO_ICON = [
  "    bb     ",
  "    BW     ",
  "    BW     ",
  "    BW     ",
  "    BW     ",
  "    BW     ",
  "   bbbb    ",
  "   bbbb    ",
];

export const STAR_ICON = [
  "    y     ",
  "   yyy    ",
  "  yyyyy   ",
  " yyyyyyy  ",
  "  yyyyy   ",
  "   yyy    ",
  "    y     ",
];

export const SHIELD_ICON = [
  "  LLLLLL   ",
  " LLLLLLLL  ",
  " LLLLLLLL  ",
  "  LLLLLL   ",
  "   LLLL    ",
  "    LL     ",
];

export const ANTENNA_ICON = [
  "     Y     ",
  "    Y Y    ",
  "   Y   Y   ",
  "  Y     Y  ",
  "     m     ",
  "     m     ",
  "    mmm    ",
];
