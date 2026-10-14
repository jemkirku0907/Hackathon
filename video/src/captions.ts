export interface TimedWord {
  word: string;
  start: number; // local frame in scene
  end: number;
}

export interface CaptionPhrase {
  badge: string;
  badgeColor?: string;
  startFrame: number;
  endFrame: number;
  words: TimedWord[];
}

export const SCENE_CAPTIONS: Record<string, CaptionPhrase[]> = {
  scene1: [
    {
      badge: 'UMAK AI COMPANION',
      startFrame: 0,
      endFrame: 150,
      words: [
        { word: 'Introducing', start: 12, end: 32 },
        { word: 'TAGA-asK', start: 33, end: 54 },
        { word: 'AI,', start: 55, end: 68 },
        { word: 'your', start: 70, end: 82 },
        { word: 'UMak', start: 83, end: 100 },
        { word: 'AI', start: 101, end: 114 },
        { word: 'companion.', start: 115, end: 145 },
      ],
    },
  ],
  scene2: [
    {
      badge: 'THE PROBLEM',
      startFrame: 0,
      endFrame: 210,
      words: [
        { word: 'May', start: 10, end: 20 },
        { word: 'tanong', start: 21, end: 35 },
        { word: 'ka,', start: 36, end: 52 },
        { word: 'pero', start: 54, end: 68 },
        { word: 'sino', start: 69, end: 82 },
        { word: 'ang', start: 83, end: 94 },
        { word: 'sasagot?', start: 95, end: 120 },
        { word: 'Waiting', start: 125, end: 138 },
        { word: 'hours', start: 139, end: 150 },
        { word: 'in', start: 151, end: 160 },
        { word: 'Facebook', start: 161, end: 176 },
        { word: 'groups', start: 177, end: 188 },
        { word: 'with', start: 189, end: 195 },
        { word: 'zero', start: 196, end: 202 },
        { word: 'replies.', start: 203, end: 210 },
      ],
    },
  ],
  scene3: [
    {
      badge: 'THE SOLUTION',
      startFrame: 0,
      endFrame: 150,
      words: [
        { word: 'Meet', start: 8, end: 20 },
        { word: 'TAGA-asK', start: 21, end: 42 },
        { word: 'AI.', start: 43, end: 55 },
        { word: 'Ask', start: 58, end: 68 },
        { word: 'a', start: 69, end: 74 },
        { word: 'question,', start: 75, end: 88 },
        { word: 'and', start: 89, end: 95 },
        { word: 'get', start: 96, end: 104 },
        { word: 'answers', start: 105, end: 115 },
        { word: 'grounded', start: 116, end: 126 },
        { word: 'in', start: 127, end: 132 },
        { word: 'sources.', start: 133, end: 150 },
      ],
    },
  ],
  scene4: [
    {
      badge: 'VERIFIED CITATION',
      startFrame: 0,
      endFrame: 220,
      words: [
        { word: 'Ask', start: 10, end: 20 },
        { word: 'where', start: 21, end: 32 },
        { word: 'the', start: 33, end: 40 },
        { word: 'CIT', start: 41, end: 56 },
        { word: 'is', start: 57, end: 65 },
        { word: 'in', start: 66, end: 74 },
        { word: 'the', start: 75, end: 82 },
        { word: 'Admin', start: 83, end: 98 },
        { word: 'Building.', start: 99, end: 118 },
        { word: 'TAGA-asK', start: 122, end: 144 },
        { word: 'AI', start: 145, end: 158 },
        { word: 'answers:', start: 159, end: 175 },
        { word: 'Second', start: 176, end: 188 },
        { word: 'Floor,', start: 189, end: 200 },
        { word: 'South', start: 201, end: 210 },
        { word: 'Wing.', start: 211, end: 220 },
      ],
    },
    {
      badge: 'EXACT SOURCE 03',
      startFrame: 220,
      endFrame: 420,
      words: [
        { word: 'And', start: 228, end: 238 },
        { word: 'it', start: 239, end: 246 },
        { word: 'shows', start: 247, end: 260 },
        { word: 'where', start: 261, end: 274 },
        { word: 'that', start: 275, end: 284 },
        { word: 'answer', start: 285, end: 298 },
        { word: 'came', start: 299, end: 312 },
        { word: 'from:', start: 313, end: 328 },
        { word: 'Source', start: 334, end: 354 },
        { word: 'zero', start: 355, end: 372 },
        { word: 'three,', start: 373, end: 390 },
        { word: 'page', start: 391, end: 404 },
        { word: 'one.', start: 405, end: 420 },
      ],
    },
  ],
  scene5: [
    {
      badge: 'CAMPUS TOOLS',
      startFrame: 0,
      endFrame: 150,
      words: [
        { word: 'Attach', start: 12, end: 28 },
        { word: 'an', start: 29, end: 36 },
        { word: 'image', start: 37, end: 52 },
        { word: 'or', start: 53, end: 60 },
        { word: 'a', start: 61, end: 67 },
        { word: 'PDF', start: 68, end: 85 },
        { word: 'and', start: 86, end: 94 },
        { word: 'ask', start: 95, end: 110 },
        { word: 'about', start: 111, end: 124 },
        { word: 'it.', start: 125, end: 145 },
      ],
    },
    {
      badge: 'CAMPUS MAP',
      startFrame: 150,
      endFrame: 300,
      words: [
        { word: 'Or', start: 155, end: 165 },
        { word: 'open', start: 166, end: 180 },
        { word: 'the', start: 181, end: 188 },
        { word: 'campus', start: 189, end: 204 },
        { word: 'map', start: 205, end: 220 },
        { word: 'to', start: 221, end: 230 },
        { word: 'find', start: 231, end: 244 },
        { word: 'the', start: 245, end: 252 },
        { word: 'right', start: 253, end: 264 },
        { word: 'building,', start: 265, end: 278 },
        { word: 'floor,', start: 279, end: 288 },
        { word: 'and', start: 289, end: 294 },
        { word: 'wing.', start: 295, end: 300 },
      ],
    },
  ],
  scene6: [
    {
      badge: 'RATE LIMITING',
      startFrame: 0,
      endFrame: 130,
      words: [
        { word: 'Built-in', start: 12, end: 28 },
        { word: 'rate', start: 29, end: 40 },
        { word: 'limiting', start: 41, end: 55 },
        { word: 'helps', start: 56, end: 68 },
        { word: 'reduce', start: 69, end: 82 },
        { word: 'excessive', start: 83, end: 96 },
        { word: 'requests', start: 97, end: 108 },
        { word: 'and', start: 109, end: 115 },
        { word: 'bot', start: 116, end: 122 },
        { word: 'spam.', start: 123, end: 130 },
      ],
    },
    {
      badge: 'UMAK ONLY SIGN-IN',
      startFrame: 130,
      endFrame: 240,
      words: [
        { word: 'And', start: 136, end: 146 },
        { word: 'sign-in', start: 147, end: 164 },
        { word: 'is', start: 165, end: 174 },
        { word: 'limited', start: 175, end: 190 },
        { word: 'to', start: 191, end: 198 },
        { word: 'UMak', start: 199, end: 212 },
        { word: 'email', start: 213, end: 224 },
        { word: 'accounts.', start: 225, end: 240 },
      ],
    },
  ],
  scene7: [
    {
      badge: 'LESS WAITING',
      startFrame: 0,
      endFrame: 120,
      words: [
        { word: 'Less', start: 15, end: 30 },
        { word: 'waiting,', start: 31, end: 50 },
        { word: 'easier', start: 52, end: 68 },
        { word: 'access', start: 69, end: 84 },
        { word: 'to', start: 85, end: 92 },
        { word: 'information.', start: 93, end: 120 },
      ],
    },
    {
      badge: 'ASK SMARTER',
      startFrame: 120,
      endFrame: 240,
      words: [
        { word: 'Ask', start: 125, end: 140 },
        { word: 'smarter,', start: 141, end: 162 },
        { word: 'stay', start: 165, end: 180 },
        { word: 'connected', start: 181, end: 200 },
        { word: 'with', start: 201, end: 210 },
        { word: 'UMak.', start: 211, end: 235 },
      ],
    },
  ],
};
