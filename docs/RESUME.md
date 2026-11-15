> Historical build notes. See README.md and docs/demo/README.md for the current learning redesign and demo.

# Mission: Dhruva Build Status

Current state of the NASA Space Apps 2026 Junior Astronaut game.
Everything compiles clean (`npx tsc --noEmit`) and the full playthrough is verified end to end.

## Shipped

- Next.js 16 + React 19 + Tailwind 4 + Zustand at repo root; `npm run dev` on :3000
- Full journey: boot, boarding, transit, arrival, free-order map, storm, recovery, ceremony, sources
- Bilingual EN + KN everywhere, name capture with Latin to Kannada transliteration, live language toggle
- Voices: Dhruva via Sarvam bulbul:v4-flash (aparna_en_companion + chaitra_kn_conversation), Chinnu via ElevenLabs eleven_v3 (voice FGY2WhTYpPnrIDTdsKH5), 11 approved lines. `/api/tts` proxies both, disk cache at os tmpdir
- Gamification: live resource HUD (power o2 food dose) with floating deltas, panel cleaning in Power Room, watering rhythm game in Greenhouse, pipe puzzle in Life Support, pack-for-tonight choice in Sol Report, three timed storm waves, mission stats in Ceremony
- Art pipeline: Codex imagegen storybook style. Backgrounds as .webp (54 to 176KB) on every screen, character stickers with alpha for Chinnu, Gerald, three astronaut poses; certificate draws astronaut and Chinnu art
- Skills installed: grill-me, hallmark at .agents/skills (sloplint: 0 FAIL)

## Standing rules

- No em dashes in repo or game text
- Chinnu spoken lines (ElevenLabs) are user gated and locked
- Dhruva content and Kannada quality are agent gated
- No auth, no storage except language preference in localStorage
- Mobile first

## Known nexts

1. Vercel deploy (keys are server side, ready)
2. Optional 3D diorama at arrival and storm (react-three-fiber), spec approved but deferred
3. Optional: downloadable certificate share card, more waves per run for replay depth
