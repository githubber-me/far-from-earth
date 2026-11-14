# Mission: Dhruva

A Junior Astronaut Mission Trainer for the [NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/).

An eight minute, mobile first, bilingual (English and Kannada) journey for kids ages 7 to 12. You are the commander of a Mars outpost in Jezero Crater. A warm Mission Control companion named Dhruva guides you by voice, a tiny rover-bot named Chinnu tags along, and every decision teaches a real constraint of deep space survival: no choice is free.

## Play

```bash
npm install
npm run dev
```

Open http://localhost:3000 on a phone or laptop. No account, no download, no data storage.

Requires two API keys in `.env.local` (server side only, never shipped to the browser):

```
SARVAM_API_KEY=...
ELEVENLABS_API_KEY=...
```

## What happens in the game

1. **Boarding.** The kid types their name. It is transliterated to Kannada, checked by the kid, and woven through the whole journey on screen and in Dhruva's voice.
2. **Transit.** The kid sends a message to Earth and waits ten real seconds, feeling the communication delay between Mars and home.
3. **Arrival and free exploration.** The outpost has four stations (Power, Greenhouse, Life Support, Sol Report). The kid visits them in any order and revisits whenever they like. The greenhouse plants, including a plant named Gerald, keep growing across visits.
4. **The storm.** A real solar flare event from NASA DONKI hits. The kid must triage limited battery power: shield the crew, save the greenhouse, or keep the antenna alive. Every option has a genuine cost.
5. **Recovery and ceremony.** The consequences play out gently, a real NASA science card unlocks, and the kid downloads a personalized mission certificate with their stars and badges.

There are no fail states. Outcomes are graded, choices vary per run, and every run converges on the same ceremony so every kid experiences the full mission.

## Real NASA data used

| Dataset | How it is used |
|---|---|
| [NASA DONKI, Space Weather Database](https://kauai.ccmc.gsfc.nasa.gov/DONKI/) | The storm event mirrors the real May 2024 solar storm, the strongest in twenty years |
| [NASA InSight, REMS Mars Weather](https://mars.nasa.gov/insight/weather/) | The Sol Report card shows real archived Mars temperatures and pressure |
| [NASA OSDR, Open Science Data Repository](https://osdr.nasa.gov/) | The Science Card presents the real NASA Twins Study on astronaut health |
| [NASA Perseverance Rover](https://science.nasa.gov/mission/mars-2020-perseverance/) | The outpost is set in Jezero Crater, where Perseverance operates today |

Archived real data is labeled as archived inside the game. Nothing static is presented as live.

## Bilingual by design

Every line of narration, every UI string, every science explanation exists in English and Kannada. The player picks a language at boarding and can switch anytime; the entire interface and voice re-render instantly. Names entered in Latin script are transliterated to Kannada script for the Kannada voice and screens. Space terms are explained in context, for example: sol, the Martian day.

## Voices

- **Dhruva** (Mission Control): synthesized with Sarvam AI Bulbul TTS, a motherly Kannada and English voice.
- **Chinnu** (rover-bot): synthesized with ElevenLabs, rare and playful micro-lines.

All audio is cached on disk after first synthesis, and a browser Web Speech fallback keeps the game playable if a TTS call fails.

## Tech

Next.js (App Router), React, TypeScript, Tailwind CSS, Zustand. The game engine is pure TypeScript. TTS runs through a server API route so API keys never reach the client. Pixel art sprites are drawn in code as SVG grids, no image assets needed for gameplay. The certificate is rendered on a canvas in the browser and downloaded as a PNG.

## Credits

Built for the NASA Space Apps Challenge 2026, challenge: Build a Junior Astronaut Mission Trainer. Voice APIs by Sarvam AI and ElevenLabs. Fonts: Press Start 2P and Noto Sans Kannada.
