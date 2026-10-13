export interface SourceChunk {
  id: string;
  source: 'Source01.pdf' | 'Source02.pdf' | 'Source03.pdf' | 'Source04.pdf';
  documentTitle: string;
  page: number;
  section: string;
  content: string;
}

export interface Citation {
  source: string;
  page: number;
  quote: string;
  claim: string;
  verified?: boolean;
}

export interface ChatResponse {
  answer: string;
  in_sources: boolean;
  conflict: boolean;
  conflict_details?: string;
  citations: Citation[];
  verification_status: 'verified' | 'unverified' | 'not_found' | 'error';
  error?: string;
}

export interface ChatRequest {
  message: string;
  turnstileToken?: string;
}
