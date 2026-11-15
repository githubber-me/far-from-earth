# Mission Dhruva

**Created by Anthahkarana.**

A bilingual science adventure for children ages 7–12. Keep a fictional Mars outpost alive by predicting, experimenting and learning from consequences.

## Play

```bash
npm install
npm run dev
```

Open [the game](http://localhost:3000) or [the narrated mission film](http://localhost:3000/demo). No account is required. Mission progress stays in memory; the language preference is stored locally.

## The learning loop

1. **Predict and test:** share 12 energy units between life support, crops and shelter. A fixed budget makes every allocation a trade-off.
2. **Experiment:** choose a crop, read its requirements and run three growing cycles with six water units. Light and water both affect the harvest.
3. **Solve:** reconnect a water recycling loop and choose a conservation policy.
4. **Prepare:** read the scenario's weather and solar-storm alert, then select supplies.
5. **Apply:** face three untimed storm waves. Preparation and allocations change the consequences; each decision shows its result.
6. **Reflect:** connect what happened to a garden on Earth, then collect a personalized certificate.

Stations count as complete after their activity is finished. Completed activities cannot be used to farm resources. Stars reflect the final air, exposure, food and energy reserves.

## Science and fiction

The outpost, artwork and resource rules are fictional learning models. Weather values are illustrative, not live or traceable archived NASA readings. Radiation and dust storms are distinct hazards; the scenario combines them for systems-thinking exercises. Real research links are provided in the sources screen.

## Voices and demo

Optional in-game Dhruva narration uses Sarvam; existing Chinnu lines use ElevenLabs. Configure `SARVAM_API_KEY` and `ELEVENLABS_API_KEY` in `.env.local` for those voices. The game works without audio. Keys remain on the server.

The included 90-second, 1080p film uses actual captured game screens with Sarvam narration, chapter titles, fades and English captions. It is a narrated capture montage, not a continuous gameplay recording. See [production notes](docs/demo/README.md), [narration](docs/demo/narration.json) and [artwork prompts](docs/demo/asset-prompts.md).

## Verify

```bash
node scripts/test-mission.cjs
npx tsc --noEmit
npm run build
```

Built with Next.js, React, TypeScript, Zustand and native component CSS. Fonts: Space Grotesk and Noto Sans Kannada. The English playthrough and responsive layouts were checked in the browser; Kannada copy should receive native-language editorial review before classroom release.

## SI disclosures

See [SI_DISCLOSURE.md](SI_DISCLOSURE.md) and the public `/disclosure` page. Published artwork and the demo carry visible SI labels; MP3/MP4 exports include embedded metadata. The machine-readable inventory is `public/si-disclosure.json`. Original artwork is retained outside `public/`; share the labeled SVG exports.
