import sourcesData from '../data/sources.json';
import { SourceChunk } from './types';

const sources: SourceChunk[] = sourcesData as SourceChunk[];

// Common English stopwords
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'what', 'where', 'who', 'how',
  'does', 'do', 'can', 'i', 'my', 'you', 'your', 'please', 'tell', 'me', 'about'
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

export function searchSources(query: string, maxResults: number = 4): SourceChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = sources.map(chunk => {
    let score = 0;
    const fullText = (chunk.content + ' ' + chunk.section + ' ' + chunk.documentTitle).toLowerCase();

    // Exact phrase match bonus
    if (query.trim().length > 3 && fullText.includes(query.trim().toLowerCase())) {
      score += 25;
    }

    // Token frequency & section weighting
    for (const token of queryTokens) {
      if (chunk.section.toLowerCase().includes(token)) {
        score += 10;
      }
      if (chunk.documentTitle.toLowerCase().includes(token)) {
        score += 5;
      }
      // Word boundary match
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      const matches = (fullText.match(regex) || []).length;
      score += matches * 3;
    }

    return { chunk, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.chunk);
}

export function getChunkBySourceAndPage(source: string, page: number): SourceChunk[] {
  return sources.filter(s => s.source.toLowerCase() === source.toLowerCase() && s.page === page);
}
