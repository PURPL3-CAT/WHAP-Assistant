'use client';

import { useState, useEffect } from 'react';
import WhapLoader from '../components/WhapLoader';
import QuestionForm from '../components/QuestionForm';
import ResultsList from '../components/ResultsList';
import HistoryList from '../components/HistoryList';
import { HistoryItem, ResultItem } from '../types';

export default function Home() {
  const [questions, setQuestions] = useState<string>('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('whapHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    const questionArray = questions.split('\n').filter((q) => q.trim() !== '');

    try {
      const response = await fetch(
        'https://calm-darkness-126d.sreusser12.workers.dev/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questions: questionArray }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from Worker:', data);
      setResults(data);

      // Update history
      const newHistoryItem = { questions: questions, results: data };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10 queries
      setHistory(updatedHistory);
      localStorage.setItem('whapHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('whapHistory', JSON.stringify(updatedHistory));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">WHAP Guided Reading Assistant</h1>

      <div className="w-full max-w-2xl">
        <QuestionForm
          questions={questions}
          setQuestions={setQuestions}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        {loading && <WhapLoader />}

        <ResultsList results={results} setQuestions={setQuestions} />

        <HistoryList
          history={history}
          setQuestions={setQuestions}
          setResults={setResults}
          deleteHistoryItem={deleteHistoryItem}
        />
      </div>
    </main>
  );
}
