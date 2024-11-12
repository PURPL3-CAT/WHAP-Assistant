import { useState, useEffect } from 'react';
import { whapFacts } from '../utils/whapFacts';
import { randomInt } from 'crypto';

const WhapLoader = () => {
  const [fact, setFact] = useState(
    whapFacts[Math.floor(Math.random() * (whapFacts.length + 1))]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFact(whapFacts[Math.floor(Math.random() * whapFacts.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-center">{fact}</p>
    </div>
  );
};

export default WhapLoader;
