export type ResultItem = {
  question: string;
  answer: string;
  unit?: string;
  keywords?: string[];
  suggestedQuestions?: string[];
};

export type HistoryItem = {
  questions: string;
  results: ResultItem[];
};
