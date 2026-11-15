// SI disclosure: OpenAI Codex assisted this code and the fictional teaching model.
// Values below are illustrative game rules, not NASA observations or engineering predictions.
import type { Crop, Lang, PowerAlloc, StormChoice, WaterPolicy } from './types';

export const words = (lang: Lang, en: string, kn: string) => lang === 'kn' ? kn : en;

export const STATIONS = ['power', 'greenhouse', 'life', 'sol'] as const;
export const CROP_NEEDS: Record<Crop, { water: number; light: number; yield: number }> = {
  tomatoes: { water: 2, light: 4, yield: 9 },
  potatoes: { water: 1, light: 3, yield: 7 },
  sunflowers: { water: 2, light: 5, yield: 10 },
};

// Teaching models, not physical predictions. Units are explicitly game units.
export function growCrop(crop: Crop, water: number, light: number) {
  const needs = CROP_NEEDS[crop];
  const watered = water === needs.water;
  const lit = light >= needs.light;
  return { food: watered && lit ? needs.yield : watered || lit ? 3 : 0, watered, lit };
}

export function stormDelta(choice: StormChoice, wave: number, prep: {
  alloc: PowerAlloc; water: WaterPolicy | null; gearShielded: boolean;
}) {
  const { alloc, water, gearShielded } = prep;
  const dose = Math.max(1, 14 + wave * 3 - alloc.shield - (gearShielded ? 3 : 0) - (choice === 'shields' ? 7 : 0));
  const food = choice === 'greenhouse' ? 3 : -Math.max(2, 11 - alloc.green);
  const o2 = -Math.max(1, 8 - alloc.life - (water === 'savers' ? 2 : water === 'balanced' ? 1 : 0));
  const power = choice === 'comms' ? -3 : -2;
  return { power, food, o2, dose };
}

export function missionStars(resources: { power: number; food: number; o2: number; dose: number }) {
  return Number(resources.o2 >= 55 && resources.dose < 40)
    + Number(resources.food >= 35)
    + Number(resources.power >= 3);
}

export const WAVE_COPY = {
  en: [
    { title: 'The sky goes quiet.', body: 'A solar storm is approaching. Shelter systems, crops and the radio share one battery. What will you protect first?' },
    { title: 'The greenhouse cools.', body: 'Your plants need energy too. Look at the food reserve before you decide. Protecting one system leaves less for another.' },
    { title: 'One last decision.', body: 'Earth cannot send immediate help. Keep enough power for tomorrow and bring your crew through the final wave.' },
  ],
  kn: [
    { title: 'ಆಕಾಶ ಶಾಂತವಾಗಿದೆ.', body: 'ಸೌರ ಬಿರುಗಾಳಿ ಸಮೀಪಿಸುತ್ತಿದೆ. ಆಶ್ರಯ, ಬೆಳೆಗಳು ಮತ್ತು ರೇಡಿಯೋ ಒಂದೇ ಬ್ಯಾಟರಿಯನ್ನು ಬಳಸುತ್ತವೆ. ಮೊದಲು ಯಾವುದನ್ನು ರಕ್ಷಿಸುತ್ತೀರಿ?' },
    { title: 'ಹಸಿರುಮನೆ ತಣ್ಣಗಾಗುತ್ತಿದೆ.', body: 'ಗಿಡಗಳಿಗೂ ಶಕ್ತಿ ಬೇಕು. ಆಹಾರದ ಸಂಗ್ರಹ ನೋಡಿ ನಿರ್ಧರಿಸಿ. ಒಂದು ವ್ಯವಸ್ಥೆಗೆ ಹೆಚ್ಚು ಕೊಟ್ಟರೆ ಮತ್ತೊಂದಕ್ಕೆ ಕಡಿಮೆ ಉಳಿಯುತ್ತದೆ.' },
    { title: 'ಕೊನೆಯ ನಿರ್ಧಾರ.', body: 'ಭೂಮಿಯಿಂದ ತಕ್ಷಣ ಸಹಾಯ ಬರಲಾರದು. ನಾಳೆಗೆ ಶಕ್ತಿ ಉಳಿಸಿ, ತಂಡವನ್ನು ಕೊನೆಯ ಅಲೆಯಿಂದ ಪಾರುಮಾಡಿ.' },
  ],
};
