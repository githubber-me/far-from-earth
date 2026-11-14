"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/game/store";
import { useNarration, type NarrationLine } from "@/lib/audio/speech";
import { STRINGS } from "@/lib/i18n/strings";
import type { WaterPolicy } from "@/lib/game/types";
import { CHINNU, PixelSprite } from "@/components/ui/Sprites";
import { MarsScene } from "@/components/ui/Scene";
import { ChoiceCard } from "@/components/ui/ChoiceCards";

type Stage = "pipes" | "choice" | "done";

type PipeType = "straight" | "curve";
interface Cell {
  type: PipeType;
  rot: number;
}

// Board: 2 rows x 3 cols. Inlet from the west of (0,0), outlet east of (2,0).
// Solution: (0,0) straight E, (1,0) curve S+W, (1,1) curve N+E, (2,1) curve W+N, (2,0) curve S+E.
const SOLUTION: { r: number; c: number; type: PipeType }[] = [
  { r: 0, c: 0, type: "straight" },
  { r: 0, c: 1, type: "curve" },
  { r: 1, c: 1, type: "curve" },
  { r: 1, c: 2, type: "curve" },
  { r: 0, c: 2, type: "curve" },
];

function openDirs(type: PipeType, rot: number): string[] {
  const dirs = ["N", "E", "S", "W"];
  const base = type === "straight" ? [dirs[3], dirs[1]] : [dirs[0], dirs[1]];
  return base.map((d) => dirs[(dirs.indexOf(d) + rot) % 4]);
}

const OPPOSITE: Record<string, string> = { N: "S", S: "N", E: "W", W: "E" };

function isSolved(cells: Cell[][]): boolean {
  // walk the flow from the west inlet
  let r = 0;
  let c = 0;
  let dir = "W";
  let guard = 0;
  const visited = new Set<string>();
  while (guard++ < 20) {
    if (r < 0 || r > 1 || c < 0 || c > 2) return false;
    const key = `${r},${c},${dir}`;
    if (visited.has(key)) return false;
    visited.add(key);
    const cell = cells[r][c];
    const opens = openDirs(cell.type, cell.rot);
    if (!opens.includes(dir)) return false;
    const exit = opens.find((o) => o !== dir)!;
    if (r === 0 && c === 2 && exit === "E") return true;
    const step: Record<string, [number, number]> = { N: [-1, 0], S: [1, 0], E: [0, 1], W: [0, -1] };
    const [dr, dc] = step[exit];
    r += dr;
    c += dc;
    dir = OPPOSITE[exit];
  }
  return false;
}

const INITIAL: Cell[][] = [
  [
    { type: "straight", rot: 1 },
    { type: "curve", rot: 0 },
    { type: "curve", rot: 0 },
  ],
  [
    { type: "curve", rot: 2 },
    { type: "curve", rot: 3 },
    { type: "curve", rot: 1 },
  ],
];

export default function LifeSupport() {
  const lang = useGame((s) => s.lang);
  const water = useGame((s) => s.water);
  const setWater = useGame((s) => s.setWater);
  const setCaption = useGame((s) => s.setCaption);
  const applyDelta = useGame((s) => s.applyDelta);
  const bumpStat = useGame((s) => s.bumpStat);
  const go = useGame((s) => s.go);
  const t = STRINGS[lang];

  const [stage, setStage] = useState<Stage>(water ? "choice" : "pipes");
  const [cells, setCells] = useState<Cell[][]>(INITIAL);
  const [solved, setSolved] = useState(false);
  const [solvedPath, setSolvedPath] = useState<Set<string>>(new Set());

  const lines = useMemo<NarrationLine[]>(() => {
    if (water) return [];
    return [
      { id: "life.dhruva1", speaker: "dhruva", text: t.life.dhruva1 },
      { id: "life.dhruva2", speaker: "dhruva", text: t.life.dhruva2 },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [water, lang]);

  useNarration(lines, `life-${water ? "done" : "new"}-${lang}`);

  function knownSolutionCheck(next: Cell[][]): string[] {
    // walk and collect path cells when solved
    let r = 0, c = 0, dir = "W";
    const path: string[] = [];
    let guard = 0;
    while (guard++ < 20) {
      if (r < 0 || r > 1 || c < 0 || c > 2) return [];
      const cell = next[r][c];
      const opens = openDirs(cell.type, cell.rot);
      if (!opens.includes(dir)) return [];
      path.push(`${r},${c}`);
      const exit = opens.find((o) => o !== dir)!;
      if (r === 0 && c === 2 && exit === "E") return path;
      const step: Record<string, [number, number]> = { N: [-1, 0], S: [1, 0], E: [0, 1], W: [0, -1] };
      const [dr, dc] = step[exit];
      r += dr;
      c += dc;
      dir = OPPOSITE[exit];
    }
    return [];
  }

  function rotate(r: number, c: number) {
    if (solved) return;
    const next = cells.map((row) => row.map((cell) => ({ ...cell })));
    next[r][c].rot = (next[r][c].rot + 1) % 4;
    setCells(next);
    const path = knownSolutionCheck(next);
    if (path.length > 0) {
      setSolved(true);
      setSolvedPath(new Set(path));
      applyDelta({ o2: 15 });
      bumpStat("pipesSolved");
      setCaption({ speaker: "dhruva", text: t.taskLife.solved });
      setTimeout(() => setStage("choice"), 1200);
    }
  }

  const options: { id: WaterPolicy; title: string; desc: string }[] = [
    { id: "comfort", title: t.life.comfort, desc: t.life.comfortDesc },
    { id: "balanced", title: t.life.balanced, desc: t.life.balancedDesc },
    { id: "savers", title: t.life.savers, desc: t.life.saversDesc },
  ];

  function choose(id: WaterPolicy) {
    setWater(id);
    applyDelta(id === "comfort" ? { o2: 4 } : id === "savers" ? { o2: -4 } : {});
    setCaption({ speaker: "chinnu", text: t.chinnu.water });
    setStage("done");
  }

  return (
    <MarsScene className="screen-pad" bg="/assets/bg-life.webp">
      <div className="screen-content">
        <h2 className="screen-title font-pixel">{t.map.life}</h2>

        {stage === "pipes" && (
          <div className="fade-in pipe-game">
            <p className="task-instruct">{t.taskLife.instruct}</p>
            <div className="pipe-board">
              {cells.map((row, r) =>
                row.map((cell, c) => (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    className={`pipe-cell ${solvedPath.has(`${r},${c}`) ? "pipe-flow" : ""}`}
                    style={{ transform: `rotate(${cell.rot * 90}deg)` }}
                    onClick={() => rotate(r, c)}
                    aria-label={`${t.taskLife.rotate} ${r}-${c}`}
                  >
                    <svg viewBox="0 0 40 40" aria-hidden="true">
                      {cell.type === "straight" ? (
                        <path d="M0 20 H40" stroke="currentColor" strokeWidth="8" />
                      ) : (
                        <path d="M20 0 Q20 20 40 20" stroke="currentColor" strokeWidth="8" fill="none" />
                      )}
                    </svg>
                  </button>
                )),
              )}
              <span className="pipe-end pipe-in" aria-hidden="true" />
              <span className="pipe-end pipe-out" aria-hidden="true" />
            </div>
            <p className="panel-progress font-pixel">{t.taskLife.rotate}</p>
          </div>
        )}

        {stage === "choice" && (
          <div className="fade-in choice-grid">
            {options.map(({ id, title, desc }) => (
              <ChoiceCard key={id} title={title} desc={desc} onClick={() => choose(id)} />
            ))}
          </div>
        )}

        {stage === "done" && (
          <div className="fade-in">
            <div className="chinnu-pop">
              <PixelSprite grid={CHINNU} scale={4} className="sprite-bob" />
            </div>
            <p className="chosen-note">{options.find((o) => o.id === water)?.title}</p>
            <button type="button" className="btn-main" onClick={() => go("map")}>
              {t.map.title} <span aria-hidden="true">&#9654;</span>
            </button>
          </div>
        )}
      </div>
    </MarsScene>
  );
}
