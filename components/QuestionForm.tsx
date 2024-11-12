import React from 'react';

type QuestionFormProps = {
  questions: string;
  setQuestions: (questions: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  questions,
  setQuestions,
  handleSubmit,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label
        htmlFor="questions"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Enter your questions (one per line):
      </label>
      <textarea
        id="questions"
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
        required
        className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Get Answers'}
      </button>
    </form>
  );
};

export default QuestionForm;
