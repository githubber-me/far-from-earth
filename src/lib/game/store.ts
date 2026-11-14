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

export const POWER_TOTAL = 12;

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
  reset: () => void;
}

const initialVisits: Record<StationId, number> = {
  power: 0,
  greenhouse: 0,
  life: 0,
  sol: 0,
};

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
  voiceOn: true,
  caption: null,

  setLang: (lang) => set({ lang }),
  setName: (name, nameKn) => set({ name, nameKn }),
  go: (phase) => set({ phase }),
  visit: (station) =>
    set((s) => ({ visits: { ...s.visits, [station]: s.visits[station] + 1 } })),
  setCrop: (crop) => set({ crop }),
  setWater: (water) => set({ water }),
  setAlloc: (alloc) => set({ alloc }),
  setStormChoice: (stormChoice) => set({ stormChoice }),
  toggleVoice: () => set((s) => ({ voiceOn: !s.voiceOn })),
  setCaption: (caption) => set({ caption }),
  reset: () =>
    set({
      phase: "boot",
      visits: { ...initialVisits },
      crop: null,
      water: null,
      alloc: { life: 4, green: 4, shield: 4 },
      stormChoice: null,
      caption: null,
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

export function starsFor(choice: StormChoice | null): number {
  if (choice === "shields") return 3;
  if (choice === "greenhouse") return 2;
  if (choice === "comms") return 2;
  return 1;
}
