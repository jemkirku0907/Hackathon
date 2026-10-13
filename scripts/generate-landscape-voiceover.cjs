const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/ELEVENLABS_API_KEY=(.+)/);
if (!match) {
  console.error('API key not found');
  process.exit(1);
}
const apiKey = match[1].trim();

// Target output
const outputDir = path.resolve(__dirname, '../public/audio/landscape');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Voice: Liam (TX3LPaxmHKxFdv7VOQHJ) - Energetic, punchy, identical to tech product launch in reference
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';

const LINES = [
  { id: 'ls_scene1', text: 'Watch this. Official UMak documents only. Everything here is strictly verified.' },
  { id: 'ls_scene2', text: 'Pointed at university guidelines, four verified sources cover scholarships, college admissions, campus maps, and offices.' },
  { id: 'ls_scene3', text: 'Attach a syllabus, schedule, or announcement image. TAGA-asK AI analyzes your own files in seconds.' },
  { id: 'ls_scene4', text: 'Where is the CIT office located? Admin Building, Second Floor, South Wing. Source03, page 1. Exact, verifiable citations.' },
  { id: 'ls_scene5', text: 'Tap View on Campus Map. The interactive pin visualizer highlights the building, floor, and wing in real time.' },
  { id: 'ls_scene6', text: 'Check Deans List token fee exemptions, CCIS 85 percent retention rules, or office contacts in one place.' },
  { id: 'ls_scene7', text: 'Why TAGA-asK AI? Zero hallucinations, strictly grounded, interactive campus map, and protected with UMak authentication.' },
  { id: 'ls_scene8', text: 'TAGA-asK AI. Your UMak AI Companion.' }
];

async function generate() {
  console.log('Generating landscape narration files...');
  for (const item of LINES) {
    const outFile = path.join(outputDir, `${item.id}.mp3`);
    console.log(`Synthesizing ${item.id}...`);
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: item.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.85,
            style: 0.15
          }
        })
      });
      if (!res.ok) {
        console.error('Error:', res.status, await res.text());
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(outFile, buffer);
      console.log(`Saved ${item.id}.mp3 (${buffer.length} bytes)`);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('Done generating landscape voiceovers!');
}

generate();
