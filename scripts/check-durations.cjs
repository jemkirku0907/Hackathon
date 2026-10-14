const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../video/public/audio/master');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp3'));

// Rough estimation from mp3 bytes (at 128 kbps = 16000 bytes/sec, or 192 kbps)
for (const file of files) {
  const stat = fs.statSync(path.join(dir, file));
  // 44.1kHz stereo 128kbps is ~16KB/s
  console.log(`${file}: ${stat.size} bytes (~${(stat.size / 16000).toFixed(2)}s at 128kbps)`);
}
