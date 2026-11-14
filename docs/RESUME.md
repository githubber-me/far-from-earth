# Mission: Dhruva Build Status

Checkpointed state of the NASA Space Apps 2026 Junior Astronaut game.
Everything in this list is done and compiles clean (`npx tsc --noEmit`).

## Done

- Next.js 16 + React 19 + Tailwind 4 + Zustand scaffolded at repo root
- API keys live in `.env.local` (gitignored): `SARVAM_API_KEY`, `ELEVENLABS_API_KEY`
- TTS tested and working:
  - Dhruva (narrator): Sarvam `bulbul:v4-flash`, speakers `aparna_en_companion` (EN) and `chaitra_kn_conversation` (KN)
  - Chinnu (sidekick): ElevenLabs `eleven_v3`, voice `FGY2WhTYpPnrIDTdsKH5` (Laura)
  - Audition wavs in `/private/var/folders/qg/1rrmyc1527xc52nk9k3hd1bc0000gn/T/opencode/tts-tests/`
- `src/app/api/tts/route.ts`: unified proxy with disk cache in `.cache/tts/` (gitignored)
- Full bilingual script (EN + KN) in `src/lib/i18n/strings.ts`, all lines approved
- Latin to Kannada name transliteration in `src/lib/i18n/transliterate.ts`
- Real NASA data + source citations in `src/lib/data/nasa.ts`
- Game state store in `src/lib/game/store.ts` (station visits, choices, storm logic)
- Narration queue + captions in `src/lib/audio/speech.ts`
- Canvas certificate generator in `src/lib/game/certificate.ts`
- Pixel sprite system in `src/components/ui/Sprites.tsx` (astronaut, Chinnu, plants, icons)
- Scene backgrounds + caption bar + choice cards in `src/components/ui/`
- Screens complete: Boot, Boarding, Transit, Arrival, StationMap, PowerRoom, Greenhouse, LifeSupport, SolReport
- Mascot chroma keyed at `public/assets/mascot.png`
- grill-me skill installed at `.agents/skills/grill-me`

## Remaining

1. Screens still to write in `src/components/screens/`:
   - `Storm.tsx` (red alert scene, Dhruva lines + Chinnu sneeze/hide, the 3 trade-off choices)
   - `Recovery.tsx` (choice matched outcome, Twins Study science card, Chinnu recover line)
   - `Ceremony.tsx` (stars, badges, certificate download via `downloadCertificate`, replay, sources)
   - `Sources.tsx` (list from `SOURCES` in nasa.ts)
2. `src/components/Game.tsx`: phase router + HUD (lang toggle, voice toggle) + CaptionBar mount
3. `src/app/page.tsx`: render Game (currently still default scaffold page)
4. `src/app/layout.tsx`: swap Geist fonts for Press Start 2P + Noto Sans Kannada, set metadata title
5. `src/app/globals.css`: all game styles (scene classes, sprites animations, caption bar, buttons, station grid, storm effects). Currently default scaffold CSS
6. Run `npm run dev`, full playthrough test in browser, EN/KN toggle, TTS live check
7. README for judges (run instructions, dataset table, no em dashes)
8. Git commit

## Standing rules

- No em dashes anywhere in the repo or game text
- Chinnu's 11 lines are locked verbatim (see chat approval, user corrected some)
- Dhruva content and all Kannada quality gated by the agent, not the user
- No auth, no data storage, mobile first, finite 8 minute journey
- Certificate is canvas PNG, client side, bilingual

## How to resume

Open a coding agent in this repo and say: "Resume building Mission: Dhruva from docs/RESUME.md". `npm run dev` works today (shows default scaffold page). `npx tsc --noEmit` passes.
