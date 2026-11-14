export type Lang = "en" | "kn";

export type Phase =
  | "boot"
  | "boarding"
  | "transit"
  | "arrival"
  | "map"
  | "power"
  | "greenhouse"
  | "life"
  | "sol"
  | "storm"
  | "recovery"
  | "ceremony"
  | "sources";

export type StationId = "power" | "greenhouse" | "life" | "sol";

export type Crop = "tomatoes" | "potatoes" | "sunflowers";

export type WaterPolicy = "comfort" | "balanced" | "savers";

export type StormChoice = "shields" | "greenhouse" | "comms";

export type BadgeId = "shields" | "gerald" | "comms" | "explorer";

export interface PowerAlloc {
  life: number;
  green: number;
  shield: number;
}
