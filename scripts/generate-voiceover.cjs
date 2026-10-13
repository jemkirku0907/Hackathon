const fs = require('fs');
const path = require('path');

// Read API key from .env
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/ELEVENLABS_API_KEY=(.+)/);
if (!match) {
  console.error('ELEVENLABS_API_KEY not found in .env!');
  process.exit(1);
}
const apiKey = match[1].trim();

// Target output folder
const outputDir = path.resolve(__dirname, '../public/audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Voice: Liam (TX3LPaxmHKxFdv7VOQHJ) - Energetic, modern tech launch voice
// Or Charlie (IKne3meq5aSn9XLyUdCD)
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';

const SCENES = [
  {
    id: 'scene1',
    name: 'Opening Hook',
    text: 'Introducing TAGA-asK AI, the verified AI knowledge assistant built exclusively for the University of Makati community.'
  },
  {
    id: 'scene2',
    name: 'Introducing Chatbot',
    text: 'Say goodbye to endless handbook searching. TAGA-asK AI gives you instant, verified answers to all your campus questions in real time.'
  },
  {
    id: 'scene3',
    name: 'File and Image Upload',
    text: 'Have a syllabus, schedule, or announcement? Just attach your images or documents, and ask directly with your own files.'
  },
  {
    id: 'scene4',
    name: 'Verified Sources & Citations',
    text: 'Need to know where the CIT office is located? Every answer is strictly grounded in official university documents, complete with verifiable page citations.'
  },
  {
    id: 'scene5',
    name: 'Campus Map Pin Visualizer',
    text: 'Never get lost on campus. Tap View on Campus Map to pinpoint your classroom, department, or office with an interactive visual pin.'
  },
  {
    id: 'scene6',
    name: 'More Campus Features',
    text: 'Explore Deans List scholarship token fee exemptions, CCIS admission retention policies, and university administration details in seconds.'
  },
  {
    id: 'scene7',
    name: 'Closing',
    text: 'Ask smarter. Find answers. Stay connected with UMak. TAGA-asK AI, developed with pride by DoError in.'
  }
];

async function generateAllVoiceovers() {
  console.log('Generating voiceover for all 7 scenes using ElevenLabs...');

  for (let i = 0; i < SCENES.length; i++) {
    const scene = SCENES[i];
    const outputFile = path.join(outputDir, `${scene.id}.mp3`);
    console.log(`[${i + 1}/${SCENES.length}] Synthesizing ${scene.name} (${scene.id}.mp3)...`);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: scene.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.52,
            similarity_boost: 0.85,
            style: 0.15,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to generate ${scene.id}:`, response.status, errorText);
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(outputFile, buffer);
      console.log(`✓ Saved ${scene.id}.mp3 (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error generating ${scene.id}:`, err);
    }
  }

  console.log('All voiceovers generated successfully in public/audio!');
}

generateAllVoiceovers();
