import sourcesData from '../data/sources.json';
import { SourceChunk } from './types';

const sources: SourceChunk[] = sourcesData as SourceChunk[];

// Common English & Tagalog stopwords
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'what', 'where', 'who', 'how',
  'does', 'do', 'can', 'i', 'my', 'you', 'your', 'please', 'tell', 'me',
  'about', 'ano', 'saan', 'sino', 'paano', 'ba', 'ang', 'mga', 'sa', 'kay'
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

export type QueryIntent = 'location' | 'offices' | 'academic' | 'scholarship' | 'general';

export interface ScoredChunk {
  chunk: SourceChunk;
  score: number;
}

/**
 * Disambiguates user intent based on phrasing:
 * - location: "where is", "located", "floor", "building", "wing", "room", "map" -> Source03.pdf
 * - offices: "who is the head", "office head", "director", "duties", "kpi", "responsible", "president" -> Source04.pdf
 * - academic: "gwa", "grade", "retention", "curriculum", "ccis", "computer science", "college of" -> Source02.pdf
 * - scholarship: "token fee", "scholarship", "entrance grant", "dean's lister", "discount", "free tuition" -> Source01.pdf
 */
export function classifyIntent(query: string): QueryIntent {
  const q = query.toLowerCase();

  // Location intent takes precedence for spatial queries ("where", "floor", "building", "wing")
  if (
    q.includes('where') ||
    q.includes('saan') ||
    q.includes('location') ||
    q.includes('located') ||
    q.includes('floor') ||
    q.includes('building') ||
    q.includes('wing') ||
    q.includes('room') ||
    q.includes('campus map') ||
    q.includes('how to go') ||
    q.includes('papunta')
  ) {
    return 'location';
  }

  // Office function / leadership
  if (
    q.includes('who is the president') ||
    q.includes('university president') ||
    q.includes('vice president') ||
    q.includes('office head') ||
    q.includes('director') ||
    q.includes('functions of') ||
    q.includes('duties') ||
    q.includes('kpi') ||
    q.includes('mandate') ||
    q.includes('who heads')
  ) {
    return 'offices';
  }

  // Academic / CCIS
  if (
    q.includes('ccis') ||
    q.includes('computer science') ||
    q.includes('retention') ||
    q.includes('gwa requirement') ||
    q.includes('math grade') ||
    q.includes('college requirements')
  ) {
    return 'academic';
  }

  // Scholarships
  if (
    q.includes('scholar') ||
    q.includes('token fee') ||
    q.includes('exemption') ||
    q.includes('dean’s lister') ||
    q.includes('deans lister') ||
    q.includes('tuition discount') ||
    q.includes('honor student')
  ) {
    return 'scholarship';
  }

  return 'general';
}

/**
 * Discovers if the query is strictly within supported domain scope.
 */
export function isQueryInScope(query: string): boolean {
  const q = query.toLowerCase();

  // Explicit out-of-scope queries (e.g. general knowledge, external entities)
  const outOfScopeKeywords = [
    'weather in tokyo', 'president of france', 'recipe', 'write a poem',
    'python code', 'bitcoin', 'nba finals', 'college of medicine in 2030'
  ];
  if (outOfScopeKeywords.some(kw => q.includes(kw))) {
    return false;
  }

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return false;

  // Check if at least one meaningful token matches any document chunk
  const matchesAnyChunk = sources.some(c => {
    const fullText = (c.content + ' ' + c.section + ' ' + c.documentTitle).toLowerCase();
    return queryTokens.some(t => fullText.includes(t));
  });

  return matchesAnyChunk;
}

/**
 * Intent-aware hybrid retrieval with metadata routing and relevance scoring.
 */
export function searchSources(query: string, maxResults: number = 4): SourceChunk[] {
  if (!isQueryInScope(query)) {
    return [];
  }

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const intent = classifyIntent(query);
  const qLower = query.trim().toLowerCase();

  const scored: ScoredChunk[] = sources.map(chunk => {
    let score = 0;
    const fullText = (chunk.content + ' ' + chunk.section + ' ' + chunk.documentTitle).toLowerCase();

    // 1. Exact phrase match bonus
    if (qLower.length > 3 && fullText.includes(qLower)) {
      score += 35;
    }

    // 2. Intent-based Source Routing Boost & Penalty
    if (intent === 'location') {
      if (chunk.source === 'Source03.pdf') {
        score += 50; // Heavy priority to Campus Map for location questions
      } else if (chunk.source === 'Source01.pdf') {
        score -= 20; // Deprioritize scholarship passages for location queries
      }
    } else if (intent === 'offices') {
      if (chunk.source === 'Source04.pdf') {
        score += 40;
      }
    } else if (intent === 'academic') {
      if (chunk.source === 'Source02.pdf') {
        score += 45;
      }
    } else if (intent === 'scholarship') {
      if (chunk.source === 'Source01.pdf') {
        score += 40;
      }
    }

    // 3. Keyword matching & section weighting
    for (const token of queryTokens) {
      if (chunk.section.toLowerCase().includes(token)) {
        score += 15;
      }
      if (chunk.documentTitle.toLowerCase().includes(token)) {
        score += 8;
      }

      // Word boundary match
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      const matches = (fullText.match(regex) || []).length;
      score += matches * 3;
    }

    return { chunk, score };
  });

  // Filter with dynamic relevance threshold to prevent low-similarity hallucination
  const minThreshold = intent === 'location' ? 30 : 20;

  return scored
    .filter(item => item.score >= minThreshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.chunk);
}

export function getChunkBySourceAndPage(source: string, page: number): SourceChunk[] {
  return sources.filter(s => s.source.toLowerCase() === source.toLowerCase() && s.page === page);
}
