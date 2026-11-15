# Mission Dhruva: learning redesign and film

Created by Anthahkarana.

## Play

Run `npm run dev`, open http://localhost:3000. The separate film player is at `/demo`.

The learning loop is prediction → experiment → observation → reflection. Four preparation activities feed a three-wave storm. Power allocation, water policy, shelter preparation and the food you grow change the result. The debrief asks learners to transfer their experiment reasoning to an Earth garden.

The artwork and resource model are fictional teaching material. Weather numbers are illustrative, not live NASA measurements. The sources screen links the underlying research separately. Progress stays in memory; only the language preference is saved.

## Demo

`public/demo/mission-dhruva.mp4` is a 1920×1080 narrated walkthrough composed from six actual browser captures, with Sarvam Bulbul narration, chapter titles, fades and English captions. It is a screen-capture montage, not a continuous real-time playthrough. The game itself was manually played through to the certificate screen.

- Script: `docs/demo/narration.json`
- Sarvam audio generation: `node scripts/generate-demo-audio.mjs` (requires the running app and its existing server-side `SARVAM_API_KEY`)
- Assembly: `python3 scripts/render-demo.py` (FFmpeg and Pillow)
- Captions: `public/demo/captions.vtt`
- Artwork prompts and provenance: `docs/demo/asset-prompts.md`

## Verification

- `node scripts/test-mission.cjs`: crop requirements, resource trade-offs, preparation effects and outcome scoring.
- `npx tsc --noEmit`
- `npm run build`
- Browser: onboarding, all four stations, three storm waves, incorrect/correct reflection answers, final score; desktop and mobile landing layouts.

The Kannada UI remains available. A native-language editorial review is still recommended before a classroom release.
