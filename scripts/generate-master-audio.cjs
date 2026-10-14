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

const outDir = path.resolve(__dirname, '../video/public/audio/master');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Voice: Liam (TX3LPaxmHKxFdv7VOQHJ)
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';

const LINES = [
  {
    id: 'm_scene1_intro',
    text: 'Introducing TAGA-asK AI, your UMak AI companion.'
  },
  {
    id: 'm_scene2_problem',
    text: 'May tanong ka, pero sino ang sasagot? Waiting hours in Facebook groups with zero replies.'
  },
  {
    id: 'm_scene3_solution',
    text: 'Meet TAGA-asK AI. Ask a question, and get answers grounded in UMak documents, with sources.'
  },
  {
    id: 'm_scene4_demo',
    text: 'Ask where the CIT is in the Admin Building. TAGA-asK AI answers: Second Floor, South Wing. And it shows where that answer came from. Source zero three, page one.'
  },
  {
    id: 'm_scene5_features',
    text: 'Attach an image or a PDF and ask about it. Or open the campus map to find the right building, floor, and wing.'
  },
  {
    id: 'm_scene6_security',
    text: 'Built-in rate limiting helps reduce excessive requests and bot spam. And sign-in is limited to UMak email accounts.'
  },
  {
    id: 'm_scene7_outro',
    text: 'Less waiting, easier access to information. Ask smarter, stay connected with UMak.'
  }
];

async function generate() {
  console.log('Generating master promo narration tracks...');
  const only = process.argv.slice(2);
  for (const item of LINES) {
    if (only.length && !only.includes(item.id)) continue;
    const outFile = path.join(outDir, `${item.id}.mp3`);
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
            stability: 0.55,
            similarity_boost: 0.85,
            style: 0.12
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
  console.log('All master narration files generated successfully!');
}

generate();
