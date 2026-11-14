"use client";

import { useEffect } from "react";
import { useGame } from "@/lib/game/store";

export type Speaker = "dhruva" | "chinnu";

export interface NarrationLine {
  id: string;
  speaker: Speaker;
  text: string;
}

export function stripTags(text: string): string {
  return text.replace(/\[[^\]]*\]/g, "").trim();
}

class Narrator {
  private queue: NarrationLine[] = [];
  private playing = false;
  private generation = 0;
  private audio: HTMLAudioElement | null = null;
  private enabled = true;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) this.cancel();
  }

  speak(line: NarrationLine) {
    if (!this.enabled) return;
    this.queue.push(line);
    if (!this.playing) queueMicrotask(() => this.pump());
  }

  cancel() {
    this.generation += 1;
    this.queue = [];
    this.playing = false;
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
  }

  private async pump() {
    if (this.playing) return;
    const gen = this.generation;
    this.playing = true;
    while (this.queue.length > 0 && gen === this.generation) {
      const line = this.queue.shift()!;
      useGame.getState().setCaption({
        speaker: line.speaker,
        text: stripTags(line.text),
      });
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: line.id,
            speaker: line.speaker,
            lang: useGame.getState().lang,
            text: line.text,
          }),
        });
        if (!res.ok) throw new Error(`tts failed: ${res.status}`);
        const blob = await res.blob();
        if (gen !== this.generation) break;
        const url = URL.createObjectURL(blob);
        await this.playUrl(url, gen);
        URL.revokeObjectURL(url);
      } catch {
        // Voice is a bonus; captions always carry the line.
        // Give the line some reading time before moving on.
        await delay(1200);
      }
    }
    if (gen === this.generation) {
      this.playing = false;
    }
  }

  private playUrl(url: string, gen: number): Promise<void> {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      this.audio = audio;
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      void audio.play().catch(() => resolve());
      if (gen !== this.generation) {
        audio.pause();
        resolve();
      }
    });
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const narrator = new Narrator();

/**
 * Drives narration for a screen. Restarts whenever the key changes,
 * so a language toggle replays the same lines in the new language.
 */
export function useNarration(lines: NarrationLine[], key: string) {
  const voiceOn = useGame((s) => s.voiceOn);
  const setCaption = useGame((s) => s.setCaption);

  useEffect(() => {
    narrator.cancel();
    queueMicrotask(() => setCaption(null));
    if (!voiceOn) {
      const first = lines[0];
      if (first) {
        queueMicrotask(() =>
          setCaption({ speaker: first.speaker, text: stripTags(first.text) }),
        );
      }
      return;
    }
    for (const line of lines) narrator.speak(line);
    return () => {
      narrator.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, voiceOn]);
}
