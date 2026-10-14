const fs = require('fs');
const path = require('path');

const align = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../scratch/test_alignment.json'), 'utf8'));
const chars = align.characters;
const starts = align.character_start_times_seconds;
const ends = align.character_end_times_seconds;

const words = [];
let currentWord = '';
let wordStart = null;
let wordEnd = null;

for (let i = 0; i < chars.length; i++) {
  const c = chars[i];
  if (c === ' ' || c === '\n') {
    if (currentWord) {
      words.push({ word: currentWord, start: wordStart, end: wordEnd });
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
  words.push({ word: currentWord, start: wordStart, end: wordEnd });
}

console.log('Total words:', words.length);

const sceneMarkers = [
  'Introducing',
  'May',
  'Meet',
  'Ask',
  'Attach',
  'Built-in',
  'Less'
];

const scenes = [];
let curScene = null;

words.forEach(w => {
  const clean = w.word.replace(/[^a-zA-Z-]/g, '');
  if (sceneMarkers.includes(clean) && (!curScene || curScene.words.length > 5)) {
    if (curScene) scenes.push(curScene);
    curScene = { name: clean, words: [] };
  }
  if (curScene) curScene.words.push(w);
});
if (curScene) scenes.push(curScene);

scenes.forEach((s, idx) => {
  const first = s.words[0];
  const last = s.words[s.words.length - 1];
  console.log(`Scene ${idx+1} [${s.name}]: ${first.start.toFixed(2)}s (${Math.round(first.start*30)}f) to ${last.end.toFixed(2)}s (${Math.round(last.end*30)}f)`);
  console.log(`  Text: "${s.words.map(x=>x.word).join(' ')}"`);
});
