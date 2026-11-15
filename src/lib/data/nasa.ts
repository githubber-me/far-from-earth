import type { Lang } from "@/lib/game/types";

export const INSIGHT_WEATHER = {
  highC: -23,
  lowC: -95,
  pressurePa: 700,
  wind: { en: "light winds", kn: "ತಿಳಿ ಗಾಳಿ" } as Record<Lang, string>,
};

export const SOLAR_EVENT = {
  year: 2024,
  month: { en: "May", kn: "ಮೇ" } as Record<Lang, string>,
};

export interface SourceEntry {
  name: string;
  url: string;
  use: Record<Lang, string>;
}

export const SOURCES: SourceEntry[] = [
  {
    name: "NASA JPL: May 2024 solar storm",
    url: "https://www.jpl.nasa.gov/news/nasa-watches-mars-light-up-during-epic-solar-storm/",
    use: {
      en: "NASA observed a solar storm at Mars in May 2024. Our fictional scenario combines radiation and dust-related challenges; its resource effects are simplified game rules.",
      kn: "ಬಿರುಗಾಳಿ ಹಂತದ ಸೋಲಾರ್ ಫ್ಲೇರ್ ಘಟನೆ, 2024 ಮೇ ತಿಂಗಳ ನಿಜವಾದ ಸೌರ ಬಿರುಗಾಳಿಯನ್ನು ಆಧರಿಸಿದೆ. ಇಪ್ಪತ್ತು ವರ್ಷಗಳಲ್ಲಿನ ಅತಿ ದೊಡ್ಡದು.",
    },
  },
  {
    name: "NASA InSight (Mars Weather)",
    url: "https://mars.nasa.gov/insight/weather/",
    use: {
      en: "InSight measured Martian weather. The numbers in this game are illustrative teaching values, not a traceable daily record.",
      kn: "ಇನ್‌ಸೈಟ್ ಮಂಗಳದ ಹವಾಮಾನ ಅಳೆಯಿತು. ಆಟದ ಅಂಕಿಗಳು ಕಲಿಕೆಯ ಮಾದರಿ, ದಿನಾಂಕಿತ ದಾಖಲೆ ಅಲ್ಲ.",
    },
  },
  {
    name: "NASA OSDR (Open Science Data Repository)",
    url: "https://osdr.nasa.gov/",
    use: {
      en: "The Science Card is based on the NASA Twins Study, which followed astronaut Scott Kelly for a year in space.",
      kn: "ಸೈನ್ಸ್ ಕಾರ್ಡ್ ನಾಸಾ ಟ್ವಿನ್ಸ್ ಸ್ಟಡಿ ಆಧರಿಸಿದೆ. ಆಸ್ಟ್ರೋನಾಟ್ ಸ್ಕಾಟ್ ಕೆಲ್ಲಿ ಒಂದು ವರ್ಷ ಬಾಹ್ಯಾಕಾಶದಲ್ಲಿ ಕಳೆದಾಗ ಅವರ ಅಧ್ಯಯನ ನಡೆಯಿತು.",
    },
  },
  {
    name: "NASA Perseverance Rover (Jezero Crater)",
    url: "https://science.nasa.gov/mission/mars-2020-perseverance/",
    use: {
      en: "The outpost is set in Jezero Crater, where the Perseverance rover is exploring right now.",
      kn: "ಔಟ್‌ಪೋಸ್ಟ್ ಜೆಜೆರೊ ಕ್ರೇಟರ್‌ನಲ್ಲಿದೆ. ಪರ್ಸಿವರೆನ್ಸ್ ರೋವರ್ ಈಗ ಅಲ್ಲೇ ಶೋಧ ನಡೆಸುತ್ತಿದೆ.",
    },
  },
  {
    name: "Sarvam AI (Bulbul TTS)",
    url: "https://www.sarvam.ai/",
    use: {
      en: "Dhruva's voice is synthesized with Sarvam AI text to speech, in Kannada and English.",
      kn: "ಧ್ರುವನ ಧ್ವನಿ ಸರ್ವಮ್ AI ಟೆಕ್ಸ್ಟ್ ಟು ಸ್ಪೀಚ್‌ನಿಂದ, ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸೃಷ್ಟಿಯಾಗಿದೆ.",
    },
  },
  {
    name: "ElevenLabs",
    url: "https://elevenlabs.io/",
    use: {
      en: "Chinnu the rover-bot's voice is synthesized with ElevenLabs.",
      kn: "ರೋವರ್-ಬಾಟ್ ಚಿನ್ನುವಿನ ಧ್ವನಿ ಎಲೆವೆನ್‌ಲ್ಯಾಬ್ಸ್‌ನಿಂದ ಸೃಷ್ಟಿಯಾಗಿದೆ.",
    },
  },
];
