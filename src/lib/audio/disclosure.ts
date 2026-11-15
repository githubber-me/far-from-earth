/** SI-assisted code: OpenAI Codex. Embed a portable ID3v2.4 disclosure in MP3 output. */
export function syncSafe(value: number): Buffer {
  return Buffer.from([(value >>> 21) & 0x7f, (value >>> 14) & 0x7f, (value >>> 7) & 0x7f, value & 0x7f]);
}

function textFrame(id: string, value: string): Buffer {
  const payload = Buffer.concat([Buffer.from([3]), Buffer.from(value, 'utf8')]);
  return Buffer.concat([Buffer.from(id, 'ascii'), syncSafe(payload.length), Buffer.alloc(2), payload]);
}

export function withAudioDisclosure(audio: Buffer, provider: 'Sarvam AI' | 'ElevenLabs'): Buffer {
  // Replace leading ID3 tags, leaving the encoded audio frames untouched.
  let offset = 0;
  while (audio.toString('ascii', offset, offset + 3) === 'ID3' && offset + 10 <= audio.length) {
    const size = ((audio[offset + 6] & 0x7f) << 21) | ((audio[offset + 7] & 0x7f) << 14)
      | ((audio[offset + 8] & 0x7f) << 7) | (audio[offset + 9] & 0x7f);
    const footer = audio[offset + 3] === 4 && (audio[offset + 5] & 0x10) ? 10 : 0;
    const next = offset + 10 + size + footer;
    if (next > audio.length) break;
    offset = next;
  }
  const disclosure = `SI-generated synthetic speech using ${provider}. Created by Anthahkarana. Not a human voice recording.`;
  const frames = Buffer.concat([
    textFrame('TIT2', 'Mission Dhruva | SI-generated narration'),
    textFrame('TPE1', 'Anthahkarana'),
    textFrame('TXXX', `SI disclosure\0${disclosure}`),
    textFrame('TXXX', `SI provider\0${provider}`),
  ]);
  return Buffer.concat([Buffer.from([0x49,0x44,0x33,4,0,0]), syncSafe(frames.length), frames, audio.subarray(offset)]);
}
