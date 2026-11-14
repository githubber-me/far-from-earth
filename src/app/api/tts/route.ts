import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import type { NextRequest } from "next/server";

// Outside the project tree: file writes here do not churn the dev watcher
const CACHE_DIR = path.join(os.tmpdir(), "mission-dhruva-tts");

const SARVAM_SPEAKERS = {
  en: "aparna_en_companion",
  kn: "chaitra_kn_conversation",
} as const;

const CHINNU_VOICE_ID = "FGY2WhTYpPnrIDTdsKH5";

interface TtsBody {
  id?: string;
  speaker?: "dhruva" | "chinnu";
  lang?: "en" | "kn";
  text?: string;
}

function cacheKey(body: TtsBody): string {
  const raw = `${body.speaker}|${body.lang}|${body.text}`;
  const hash = createHash("sha1").update(raw).digest("hex").slice(0, 16);
  const id = (body.id ?? "line").replace(/[^a-zA-Z0-9.-]/g, "_").slice(0, 48);
  return `${id}-${hash}.mp3`;
}

async function synthSarvam(text: string, lang: "en" | "kn"): Promise<Buffer> {
  const key = process.env.SARVAM_API_KEY;
  if (!key) throw new Error("SARVAM_API_KEY is not configured");
  const res = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      language_code: lang === "kn" ? "kn-IN" : "en-IN",
      speaker: SARVAM_SPEAKERS[lang],
      model: "bulbul:v4-flash",
      speech_sample_rate: 24000,
      output_audio_codec: "mp3",
      enable_preprocessing: true,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Sarvam error ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = (await res.json()) as { audios?: string[] };
  const b64 = (data.audios ?? []).join("");
  if (!b64) throw new Error("Sarvam returned no audio");
  return Buffer.from(b64, "base64");
}

async function synthElevenLabs(text: string): Promise<Buffer> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error("ELEVENLABS_API_KEY is not configured");
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${CHINNU_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_v3",
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`ElevenLabs error ${res.status}: ${detail.slice(0, 300)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function POST(req: NextRequest) {
  let body: TtsBody;
  try {
    body = (await req.json()) as TtsBody;
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  const text = (body.text ?? "").slice(0, 1500).trim();
  const speaker = body.speaker === "chinnu" ? "chinnu" : "dhruva";
  const lang = body.lang === "kn" ? "kn" : "en";
  if (!text) return new Response("text required", { status: 400 });

  const file = path.join(CACHE_DIR, cacheKey({ ...body, speaker, lang, text }));
  const headers = {
    "Content-Type": "audio/mpeg",
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  try {
    const cached = await readFile(file);
    return new Response(new Uint8Array(cached), { headers });
  } catch {
    // cache miss, synthesize below
  }

  try {
    const audio =
      speaker === "dhruva"
        ? await synthSarvam(text, lang)
        : await synthElevenLabs(text);
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(file, audio).catch(() => undefined);
    return new Response(new Uint8Array(audio), { headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : "tts failed";
    return new Response(message, { status: 502 });
  }
}
