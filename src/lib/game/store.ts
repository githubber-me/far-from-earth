"use client";

import { create } from "zustand";
import type {
  Crop,
  Lang,
  Phase,
  PowerAlloc,
  StationId,
  StormChoice,
  WaterPolicy,
} from "./types";

export const POWER_MAX = 12;

export interface Resources {
  power: number;
  o2: number;
  food: number;
  dose: number;
}

export interface Delta {
  id: number;
  key: keyof Resources;
  amount: number;
}

export interface MissionStats {
  panelsCleaned: number;
  plantsWatered: number;
  pipesSolved: number;
  stormPulses: StormChoice[];
}

interface GameState {
  lang: Lang;
  name: string;
  nameKn: string;
  phase: Phase;
  visits: Record<StationId, number>;
  crop: Crop | null;
  water: WaterPolicy | null;
  alloc: PowerAlloc;
  stormChoice: StormChoice | null;
  voiceOn: boolean;
  caption: { speaker: "dhruva" | "chinnu"; text: string } | null;

  resources: Resources;
  deltas: Delta[];
  stats: MissionStats;
  gearShielded: boolean;

  setLang: (lang: Lang) => void;
  setName: (name: string, nameKn: string) => void;
  go: (phase: Phase) => void;
  visit: (station: StationId) => void;
  setCrop: (crop: Crop) => void;
  setWater: (water: WaterPolicy) => void;
  setAlloc: (alloc: PowerAlloc) => void;
  setStormChoice: (choice: StormChoice) => void;
  toggleVoice: () => void;
  setCaption: (caption: GameState["caption"]) => void;
  applyDelta: (delta: Partial<Resources>) => void;
  clearDelta: (id: number) => void;
  bumpStat: (key: keyof Omit<MissionStats, "stormPulses">) => void;
  recordPulse: (choice: StormChoice) => void;
  setGearShielded: (value: boolean) => void;
  reset: () => void;
}

const initialVisits: Record<StationId, number> = {
  power: 0,
  greenhouse: 0,
  life: 0,
  sol: 0,
};

const initialResources: Resources = {
  power: 9,
  o2: 72,
  food: 38,
  dose: 4,
};

let deltaSeq = 0;

function clampResource(key: keyof Resources, value: number): number {
  if (key === "power") return Math.min(POWER_MAX, Math.max(0, value));
  return Math.min(100, Math.max(0, value));
}

export const useGame = create<GameState>((set) => ({
  lang: "en",
  name: "",
  nameKn: "",
  phase: "boot",
  visits: { ...initialVisits },
  crop: null,
  water: null,
  alloc: { life: 4, green: 4, shield: 4 },
  stormChoice: null,
  voiceOn: false,
  caption: null,

  resources: { ...initialResources },
  deltas: [],
  stats: { panelsCleaned: 0, plantsWatered: 0, pipesSolved: 0, stormPulses: [] },
  gearShielded: false,

  setLang: (lang) => set({ lang }),
  setName: (name, nameKn) => set({ name, nameKn }),
  go: (phase) => set({ phase, caption: null }),
  visit: (station) =>
    set((s) => ({ visits: { ...s.visits, [station]: 1 } })),
  setCrop: (crop) => set({ crop }),
  setWater: (water) => set({ water }),
  setAlloc: (alloc) => set({ alloc }),
  setStormChoice: (stormChoice) => set({ stormChoice }),
  toggleVoice: () => set((s) => ({ voiceOn: !s.voiceOn })),
  setCaption: (caption) => set({ caption }),
  applyDelta: (delta) =>
    set((s) => {
      const resources = { ...s.resources };
      const added: Delta[] = [];
      for (const [key, amount] of Object.entries(delta) as [
        keyof Resources,
        number,
      ][]) {
        if (!amount) continue;
        resources[key] = clampResource(key, resources[key] + amount);
        const actual = resources[key] - s.resources[key];
        if (actual) added.push({ id: ++deltaSeq, key, amount: actual });
      }
      return { resources, deltas: [...s.deltas, ...added] };
    }),
  clearDelta: (id) =>
    set((s) => ({ deltas: s.deltas.filter((d) => d.id !== id) })),
  bumpStat: (key) =>
    set((s) => ({ stats: { ...s.stats, [key]: s.stats[key] + 1 } })),
  recordPulse: (choice) =>
    set((s) => {
      const stormPulses = [...s.stats.stormPulses, choice];
      const counts = new Map<StormChoice, number>();
      for (const c of stormPulses) counts.set(c, (counts.get(c) ?? 0) + 1);
      const stormChoice = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      return { stats: { ...s.stats, stormPulses }, stormChoice };
    }),
  setGearShielded: (gearShielded) => set({ gearShielded }),
  reset: () =>
    set({
      phase: "boot",
      visits: { ...initialVisits },
      crop: null,
      water: null,
      alloc: { life: 4, green: 4, shield: 4 },
      stormChoice: null,
      caption: null,
      resources: { ...initialResources },
      deltas: [],
      stats: {
        panelsCleaned: 0,
        plantsWatered: 0,
        pipesSolved: 0,
        stormPulses: [],
      },
      gearShielded: false,
    }),
}));

export function allStationsDone(visits: Record<StationId, number>): boolean {
  return (
    visits.power > 0 &&
    visits.greenhouse > 0 &&
    visits.life > 0 &&
    visits.sol > 0
  );
}

export function starsFor(choice: StormChoice | null, dose = 100): number {
  if (dose >= 70) return 1;
  if (choice === "shields") return 3;
  if (choice === "greenhouse") return 2;
  if (choice === "comms") return 2;
  return 1;
}
