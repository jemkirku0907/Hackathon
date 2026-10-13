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

// Target outputs for both vertical and video assets
const outputDir = path.resolve(__dirname, '../public/audio/enhanced');
const videoOutputDir = path.resolve(__dirname, '../video/public/audio/enhanced');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(videoOutputDir)) fs.mkdirSync(videoOutputDir, { recursive: true });

// Voice: Liam (TX3LPaxmHKxFdv7VOQHJ)
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';

const LINES = [
  {
    id: 'enh_scene1_intro',
    text: 'Introducing TAGA-asK AI — the verified AI companion built for the University of Makati community.'
  },
  {
    id: 'enh_scene2_problem',
    text: 'Ever asked a question in a student group, only to wait hours with zero replies? May tanong ka, pero minsan, walang sumasagot.'
  },
  {
    id: 'enh_scene3_app_cit',
    text: 'Enter TAGA-asK AI. Ask where the CIT office is located, and get an instant answer: Second Floor, South Wing, Admin Building, with verified page citations.'
  },
  {
    id: 'enh_scene4a_attach',
    text: 'Have a class schedule, form, or announcement? Attach images and documents directly to query your own files in seconds.'
  },
  {
    id: 'enh_scene4b_map',
    text: 'Lost on campus? The interactive campus map visualizer pinpoints the exact building, floor, and wing in real time.'
  },
  {
    id: 'enh_scene4c_academic',
    text: 'Check Deans List token fee exemptions, CCIS retention policies, and university contacts — completely grounded in official documents.'
  },
  {
    id: 'enh_scene5_matters',
    text: 'Less waiting, easier access to information. No more scrolling through unanswered forum posts.'
  },
  {
    id: 'enh_scene6_outro',
    text: 'Every Tagak, just ask. Ask smarter, find answers, and stay connected with UMak at taga-askai.vercel.app.'
  }
];

async function generate() {
  console.log('Generating enhanced promo narration files...');
  for (const item of LINES) {
    const outFile1 = path.join(outputDir, `${item.id}.mp3`);
    const outFile2 = path.join(videoOutputDir, `${item.id}.mp3`);
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
      fs.writeFileSync(outFile1, buffer);
      fs.writeFileSync(outFile2, buffer);
      console.log(`Saved ${item.id}.mp3 (${buffer.length} bytes) to both audio dirs`);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('Done generating enhanced promo voiceovers!');
}

generate();
