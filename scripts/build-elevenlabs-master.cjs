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

// Voice: Bella (hpp4J3VqNfWAUOO0d1Us) - Professional, Bright, Warm, Sleek Corporate Tech
const VOICE_ID = 'hpp4J3VqNfWAUOO0d1Us';

// Phonetically tuned text for natural ElevenLabs pronunciation
const TTS_TEXT = `Introducing TAGA-Ask A.I., your UMak A.I. companion.

May tanong ka, pero sino ang sasagot? Waiting hours in Facebook groups with zero replies.

Meet TAGA-Ask A.I. Ask a question, and get answers grounded in UMak documents, with sources.

Ask where the CIT is in the Admin Building. TAGA-Ask A.I. answers: Second Floor, South Wing. And it shows where that answer came from: Source zero three, page one.

Attach an image or a PDF and ask about it. Or open the campus map to find the right building, floor, and wing.

Built-in rate limiting helps reduce excessive requests and bot spam. And sign-in is limited to UMak email accounts.

Less waiting, easier access to information. Ask smarter, stay connected with UMak.`;

async function run() {
  console.log(`Calling ElevenLabs for Voice: Bella (${VOICE_ID})...`);

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: TTS_TEXT,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.52,
        similarity_boost: 0.82,
        style: 0.15,
        use_speaker_boost: true
      }
    })
  });

  if (!res.ok) {
    console.error('Error:', res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  const audioBuffer = Buffer.from(data.audio_base64, 'base64');

  // Save master voiceover to video/public/voiceover.mp3
  const outVoiceover = path.resolve(__dirname, '../video/public/voiceover.mp3');
  fs.writeFileSync(outVoiceover, audioBuffer);
  console.log(`Saved master voiceover to ${outVoiceover} (${audioBuffer.length} bytes)`);

  // Parse alignment
  const align = data.alignment;
  const chars = align.characters;
  const starts = align.character_start_times_seconds;
  const ends = align.character_end_times_seconds;

  const allWords = [];
  let currentWord = '';
  let wordStart = null;
  let wordEnd = null;

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c === ' ' || c === '\n') {
      if (currentWord) {
        // Clean display word
        let displayWord = currentWord;
        if (displayWord === 'TAGA-Ask') displayWord = 'TAGA-asK';
        if (displayWord === 'A.I.' || displayWord === 'A.I.,') displayWord = displayWord.replace('A.I.', 'AI');

        allWords.push({
          word: displayWord,
          startSec: wordStart,
          endSec: wordEnd,
          startFrame: Math.round(wordStart * 30),
          endFrame: Math.round(wordEnd * 30)
        });
        currentWord = '';
        wordStart = null;
        wordEnd = null;
      }
    } else {
      if (wordStart === null) wordStart = starts[i];
      wordEnd = ends[i];
      currentWord += c;
    }
  }

  if (currentWord) {
    let displayWord = currentWord;
    if (displayWord === 'TAGA-Ask') displayWord = 'TAGA-asK';
    if (displayWord === 'A.I.' || displayWord === 'A.I.,') displayWord = displayWord.replace('A.I.', 'AI');
    allWords.push({
      word: displayWord,
      startSec: wordStart,
      endSec: wordEnd,
      startFrame: Math.round(wordStart * 30),
      endFrame: Math.round(wordEnd * 30)
    });
  }

  console.log(`Extracted ${allWords.length} words from alignment`);

  // Define 7 scenes based on sentence endpoints
  // Scene 1: companion.
  // Scene 2: replies.
  // Scene 3: sources.
  // Scene 4: one.
  // Scene 5: wing.
  // Scene 6: accounts.
  // Scene 7: UMak.

  const sceneEndWords = [
    'companion.',
    'replies.',
    'sources.',
    'one.',
    'wing.',
    'accounts.',
    'UMak.'
  ];

  const scenes = [];
  let currentWordIndex = 0;

  const sceneMeta = [
    { id: 'scene1', name: 'Intro', label: '01 // TAGA' },
    { id: 'scene2', name: 'Problem', label: '02 // PROBLEM' },
    { id: 'scene3', name: 'Solution', label: '03 // SOLUTION' },
    { id: 'scene4', name: 'CitationDemo', label: '04 // VERIFIED CITATION' },
    { id: 'scene5', name: 'CampusTools', label: '05 // MULTIMODAL & MAP' },
    { id: 'scene6', name: 'SecurityGate', label: '06 // RATE LIMIT & ACCESS' },
    { id: 'scene7', name: 'Outro', label: '07 // OUTRO' }
  ];

  for (let s = 0; s < sceneMeta.length; s++) {
    const endWordTarget = sceneEndWords[s];
    const sceneWords = [];
    
    while (currentWordIndex < allWords.length) {
      const w = allWords[currentWordIndex];
      sceneWords.push(w);
      currentWordIndex++;
      if (w.word.toLowerCase().includes(endWordTarget.toLowerCase().replace('.', '')) || w.word.endsWith('.')) {
        if (w.word.toLowerCase().includes(endWordTarget.toLowerCase().replace('.', ''))) {
          break;
        }
      }
    }

    scenes.push({
      ...sceneMeta[s],
      words: sceneWords
    });
  }

  // Calculate clean startFrame and endFrame for each scene
  let currentFrameCursor = 0;
  for (let i = 0; i < scenes.length; i++) {
    const sc = scenes[i];
    const firstWord = sc.words[0];
    const lastWord = sc.words[sc.words.length - 1];

    const startFrame = currentFrameCursor;
    // Buffer after last word: 14 to 20 frames for transition
    let endFrame = lastWord ? lastWord.endFrame + 16 : startFrame + 90;
    if (i === scenes.length - 1) {
      // Outro gets a 2.5s hold on logo + CTA
      endFrame = (lastWord ? lastWord.endFrame : startFrame) + 75;
    }

    const durationInFrames = endFrame - startFrame;
    sc.startFrame = startFrame;
    sc.endFrame = endFrame;
    sc.durationInFrames = durationInFrames;
    sc.fullText = sc.words.map(w => w.word).join(' ');

    // Add local frames to words
    sc.words = sc.words.map(w => ({
      ...w,
      localStartFrame: Math.max(0, w.startFrame - startFrame),
      localEndFrame: Math.max(0, w.endFrame - startFrame)
    }));

    currentFrameCursor = endFrame;
  }

  const totalFrames = currentFrameCursor;
  const totalSeconds = totalFrames / 30;

  console.log(`Total Composition: ${totalFrames} frames (${totalSeconds.toFixed(1)}s)`);
  scenes.forEach(s => {
    console.log(`- ${s.id} (${s.name}): frames ${s.startFrame} -> ${s.endFrame} (${s.durationInFrames} frames) | "${s.fullText.slice(0, 45)}..."`);
  });

  const outputData = {
    fps: 30,
    totalDurationFrames: totalFrames,
    totalDurationSeconds: totalSeconds,
    voiceoverFile: 'voiceover.mp3',
    scenes,
    allWords
  };

  // Write video/public/voiceover.timings.json
  const timingsJsonPath = path.resolve(__dirname, '../video/public/voiceover.timings.json');
  fs.writeFileSync(timingsJsonPath, JSON.stringify(outputData, null, 2));
  console.log(`Saved ${timingsJsonPath}`);

  // Write video/src/voiceover-timings.ts
  const tsContent = `// Auto-generated by scripts/build-elevenlabs-master.cjs
export interface TimedWord {
  word: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
  localStartFrame: number;
  localEndFrame: number;
}

export interface SceneTiming {
  id: string;
  name: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  label: string;
  fullText: string;
  words: TimedWord[];
}

export interface VoiceoverData {
  fps: number;
  totalDurationFrames: number;
  totalDurationSeconds: number;
  voiceoverFile: string;
  scenes: SceneTiming[];
  allWords: Omit<TimedWord, 'localStartFrame' | 'localEndFrame'>[];
}

export const VOICEOVER_DATA: VoiceoverData = ${JSON.stringify(outputData, null, 2)};
`;

  const tsPath = path.resolve(__dirname, '../video/src/voiceover-timings.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`Saved ${tsPath}`);
}

run().catch(console.error);
