# Super Intelligence (SI) disclosure

**Created by Anthahkarana.** SI refers to artificial-intelligence tools used during production.

| Material | Tool and use | Disclosure location |
| --- | --- | --- |
| Code | OpenAI Codex substantially assisted implementation, interface design, debugging, tests and media assembly scripts. | This file, `package.json`, HTML metadata and `/disclosure`. |
| Text | OpenAI Codex assisted educational copy, narration scripts and English/Kannada translation drafts. | `/disclosure` and `public/si-disclosure.json`. Kannada still needs native-language editorial review. |
| Game models | OpenAI Codex assisted illustrative weather values, crop needs, resource effects and scoring. These are fictional teaching rules, not NASA observations or engineering predictions. | Comments in `src/lib/game/mission.ts` and `src/lib/data/nasa.ts`, app notices, and the disclosure manifest. |
| Artwork | OpenAI image generation created the illustrated environments and character images. | Each published SVG contains a visible **SI-GENERATED ARTWORK** strip and embedded description/metadata; `public/assets/si-manifest.json` lists the assets. Cropped scenes also carry a UI label. |
| Audio | Sarvam AI synthesizes Dhruva and the demo voice. ElevenLabs synthesizes existing Chinnu lines. These are synthetic voices, not recordings of NASA staff or astronauts. | `/disclosure`, demo text, MP3 ID3 metadata, TTS response headers and the public manifest. |
| Video | FFmpeg assembles actual application captures containing generated artwork with Sarvam narration. A video-generation model was not used. | Persistent **SI-GENERATED MEDIA** label in every frame, provider attribution, MP4 metadata and `/demo`. |
| Certificate | Code assembles the certificate with generated character artwork. | Visible SI disclosure is drawn into each exported certificate. |

The original artwork pixels are preserved in `assets/source/`, outside the public website. Published SVG frames embed those pixels with a readable disclosure strip. Original source files are retained for editing and are **not** the labeled submission exports. Use `public/assets/*.svg` or `public/assets/generated/*.svg` for artwork submissions.

The application is independently developed. Generated materials are not official NASA imagery and do not imply NASA authorship or endorsement. NASA reference resources remain separately linked in the Sources screen.

## Reproducible exports

- `node scripts/disclose-artwork.mjs` regenerates labeled SVGs from retained source art.
- The `/api/tts` route adds ID3 disclosure metadata to audio responses and caches.
- `node scripts/disclose-audio.cjs` adds the same metadata to existing demo narration without resynthesis.
- `python3 scripts/render-demo.py` produces the permanently labeled film and captions.

Public machine-readable provenance: `/si-disclosure.json` and `/assets/si-manifest.json`.
