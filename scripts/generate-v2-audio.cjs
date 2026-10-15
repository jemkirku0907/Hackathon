// Generates V2 promo audio: security narration + cinematic SFX + music bed via ElevenLabs.
// Usage: node scripts/generate-v2-audio.cjs
const fs = require('fs');
const path = require('path');

const env = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const apiKey = (env.match(/ELEVENLABS_API_KEY=(.+)/) || [])[1]?.trim();
if (!apiKey) throw new Error('ELEVENLABS_API_KEY missing in .env');

const OUT = path.join(__dirname, '..', 'video', 'public', 'audio', 'v2');
fs.mkdirSync(OUT, { recursive: true });
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ'; // Liam — same narrator as existing stems

const NARRATION = [
  {
    id: 'v2_security',
    text: 'Behind the scenes, built-in rate limiting helps prevent bot spam and excessive requests, keeping access more controlled and responsible.',
  },
  {
    id: 'v2_security_close',
    text: 'Smart answers. More responsible access.',
  },
];

const SFX = [
  { id: 'sfx_impact', text: 'Deep cinematic logo impact boom with a short sub-bass hit and airy shimmer tail, clean, trailer style, no music', duration: 3.0 },
  { id: 'sfx_impact_soft', text: 'Soft gentle cinematic logo reveal impact, warm low thump with soft shimmering chime tail, subtle and elegant', duration: 3.0 },
  { id: 'sfx_whoosh', text: 'Smooth soft airy whoosh transition, modern UI motion graphics swoosh, short and clean', duration: 1.2 },
  { id: 'sfx_rise', text: 'Short rising cinematic shimmer riser building tension into a reveal, airy and clean', duration: 2.5 },
  { id: 'sfx_shield', text: 'Futuristic digital shield activation, soft energy ring hum with gentle electronic pulse, clean UI sound', duration: 2.0 },
  { id: 'sfx_pop', text: 'Soft subtle UI card pop, gentle bubbly click for a notification card appearing, very short', duration: 0.6 },
  { id: 'sfx_deny', text: 'Soft muted digital blocked notification tone, low gentle double blip, not harsh', duration: 0.8 },
];

async function tts(item) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: item.text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.85, style: 0.15 },
    }),
  });
  if (!res.ok) throw new Error(`TTS ${item.id}: ${res.status} ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function sfx(item) {
  const res = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: item.text, duration_seconds: item.duration, prompt_influence: 0.5 }),
  });
  if (!res.ok) throw new Error(`SFX ${item.id}: ${res.status} ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function music() {
  // Try the music endpoint first; fall back to a loopable ambient bed from sound-generation.
  try {
    const res = await fetch('https://api.elevenlabs.io/v1/music', {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt:
          'Modern premium tech product commercial background music, uplifting inspiring ambient electronic, soft pulsing synths, light piano, gentle build, warm and optimistic, no vocals, ends with a natural resolved final chord',
        music_length_ms: 80000,
      }),
    });
    if (res.ok) return { buf: Buffer.from(await res.arrayBuffer()), kind: 'music' };
    console.warn('Music endpoint unavailable:', res.status, (await res.text()).slice(0, 300));
  } catch (e) {
    console.warn('Music endpoint error:', e.message);
  }
  const buf = await sfx({
    id: 'music_bed',
    text: 'Seamless loop of soft uplifting ambient electronic tech background music pad, warm synth chords, gentle pulse, no drums, no vocals',
    duration: 22,
  });
  return { buf, kind: 'loop' };
}

(async () => {
  const only = process.argv[2];
  for (const item of NARRATION) {
    if (only && only !== item.id) continue;
    const b = await tts(item);
    fs.writeFileSync(path.join(OUT, `${item.id}.mp3`), b);
    console.log('saved', item.id, b.length);
  }
  for (const item of SFX) {
    if (only && only !== item.id) continue;
    try {
      const b = await sfx(item);
      fs.writeFileSync(path.join(OUT, `${item.id}.mp3`), b);
      console.log('saved', item.id, b.length);
    } catch (e) {
      console.error(e.message);
    }
  }
  if (!only || only === 'music') {
    const m = await music();
    fs.writeFileSync(path.join(OUT, `music_bed.mp3`), m.buf);
    console.log('saved music_bed', m.kind, m.buf.length);
  }
})();
