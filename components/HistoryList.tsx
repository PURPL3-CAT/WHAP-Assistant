import React from 'react';
import { HistoryItem, ResultItem } from '../types';

type HistoryListProps = {
  history: HistoryItem[];
  setQuestions: (questions: string) => void;
  setResults: (results: ResultItem[]) => void;
  deleteHistoryItem: (index: number) => void;
};

const HistoryList: React.FC<HistoryListProps> = ({ history, setQuestions, setResults, deleteHistoryItem }) => {
  const groupedHistory = history.reduce((acc, item) => {
    const unit = item.results[0]?.unit || 'Unclassified';
    if (!acc[unit]) {
      acc[unit] = [];
    }
    acc[unit].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      {Object.entries(groupedHistory).map(([unit, items]) => (
        <div key={unit} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{unit}</h3>
          {items.map((item, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center">
              <div 
                className="cursor-pointer flex-grow"
                onClick={() => {setQuestions(item.questions); setResults(item.results);}}
              >
                <p className="font-semibold">{item.questions.split('\n')[0]}...</p>
              </div>
              <button 
                onClick={() => deleteHistoryItem(history.indexOf(item))}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;