const fs = require('fs');
const path = require('path');

const sourcesData = require('../data/sources.json');

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[“”"']/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function verifyCitation(citation) {
  const pageChunks = sourcesData.filter(
    s => s.source.toLowerCase() === citation.source.toLowerCase().trim() && s.page === Number(citation.page)
  );

  if (pageChunks.length === 0) return false;

  const normalizedQuote = normalizeText(citation.quote);
  return pageChunks.some(chunk => {
    return normalizeText(chunk.content).includes(normalizedQuote);
  });
}

function tokenize(text) {
  const stopWords = new Set(['what', 'where', 'who', 'is', 'the', 'in', 'at', 'of', 'for', 'a', 'an']);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopWords.has(t));
}

function search(query) {
  const queryTokens = tokenize(query);
  return sourcesData
    .map(chunk => {
      let score = 0;
      const fullText = (chunk.content + ' ' + chunk.section + ' ' + chunk.documentTitle).toLowerCase();
      if (fullText.includes(query.toLowerCase())) score += 20;
      queryTokens.forEach(t => {
        if (chunk.section.toLowerCase().includes(t)) score += 10;
        if (chunk.documentTitle.toLowerCase().includes(t)) score += 5;
        const matches = (fullText.match(new RegExp('\\b' + t + '\\b', 'g')) || []).length;
        score += matches * 3;
      });
      return { chunk, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.chunk);
}

// TEST 1: Scholarship retrieval
const test1 = search("Who is automatically a scholar at UMak?");
console.log("Test 1 (Scholarship):", test1.length > 0 && test1[0].source === "Source01.pdf" ? "PASS" : "FAIL");

// TEST 2: College requirements retrieval
const test2 = search("BS Computer Science Math grade requirement");
console.log("Test 2 (Requirements):", test2.length > 0 && test2[0].source === "Source02.pdf" ? "PASS" : "FAIL");

// TEST 3: Campus location retrieval
const test3 = search("Where is the Center for Information Technology located in Admin building?");
console.log("Test 3 (Campus Map):", test3.length > 0 && test3.some(c => c.source === "Source03.pdf") ? "PASS" : "FAIL");

// TEST 4: Office head retrieval
const test4 = search("Who is the University President Elyxzur Ramos Prof X?");
console.log("Test 4 (Offices):", test4.length > 0 && test4[0].source === "Source04.pdf" ? "PASS" : "FAIL");

// TEST 5: Citation verification test (Positive)
const test5 = verifyCitation({
  source: "Source04.pdf",
  page: 1,
  quote: "The President is also called “Prof. X”"
});
console.log("Test 5 (Citation Positive):", test5 ? "PASS" : "FAIL");

// TEST 6: Citation verification test (Negative / Fabricated quote)
const test6 = verifyCitation({
  source: "Source04.pdf",
  page: 1,
  quote: "The President graduated from Harvard University in 2020"
});
console.log("Test 6 (Citation Negative/Fabricated):", !test6 ? "PASS" : "FAIL");
