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
    name: "NASA DONKI (Space Weather Database)",
    url: "https://kauai.ccmc.gsfc.nasa.gov/DONKI/",
    use: {
      en: "The solar flare event in the storm phase is based on the real May 2024 solar storm, the strongest in twenty years.",
      kn: "ಬಿರುಗಾಳಿ ಹಂತದ ಸೋಲಾರ್ ಫ್ಲೇರ್ ಘಟನೆ, 2024 ಮೇ ತಿಂಗಳ ನಿಜವಾದ ಸೌರ ಬಿರುಗಾಳಿಯನ್ನು ಆಧರಿಸಿದೆ. ಇಪ್ಪತ್ತು ವರ್ಷಗಳಲ್ಲಿನ ಅತಿ ದೊಡ್ಡದು.",
    },
  },
  {
    name: "NASA InSight (REMS Mars Weather)",
    url: "https://mars.nasa.gov/insight/weather/",
    use: {
      en: "Sol Report temperatures and pressure are real archived readings from the InSight lander on Mars.",
      kn: "ಸಾಲ್ ರಿಪೋರ್ಟ್‌ನ ತಾಪಮಾನ ಮತ್ತು ಒತ್ತಡ, ಮಂಗಳದ ಮೇಲಿನ ಇನ್‌ಸೈಟ್ ಲ್ಯಾಂಡರ್‌ನ ನಿಜವಾದ ಆರ್ಕೈವ್ ಮಾಪನಗಳು.",
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
