import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ResultItem } from '../types';

type ResultsListProps = {
  results: ResultItem[];
  setQuestions: (question: string) => void;
};

const ResultsList: React.FC<ResultsListProps> = ({ results, setQuestions }) => {
  return (
    <div className="space-y-4">
      {results.map((item, index) => (
        <div
          key={index}
          className="p-4 border border-gray-300 rounded-md dark:border-gray-600"
        >
          {item.unit && (
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 block">
              {item.unit}
            </span>
          )}
          <strong className="block mb-2 text-lg">Q: {item.question}</strong>
          <ReactMarkdown className="text-gray-700 dark:text-gray-300 mb-2">
            {item.answer}
          </ReactMarkdown>
          {item.keywords && item.keywords.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold">Key Terms:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {item.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          {item.suggestedQuestions && item.suggestedQuestions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Suggested Follow-up Questions:</h4>
              <ul className="list-disc pl-5">
                {item.suggestedQuestions.map((q, i) => (
                  <li
                    key={i}
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={() => setQuestions(q)}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
