
export interface Source {
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
}

export interface SearchResult {
  id: string;
  text: string;
  score: number;
  source: Source;
}

export interface QueryResponse {
  answer: string;
  results: SearchResult[];
  query: string;
}

export interface SearchFilters {
  startYear?: number;
  endYear?: number;
  sourceTypes: string[];
}

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: string;
  response?: QueryResponse;
}
