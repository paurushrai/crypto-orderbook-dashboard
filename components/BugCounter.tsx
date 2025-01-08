import React, { useState } from 'react';

export default function BuggyCounter() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(prevCounter => {
      // Intentionally throw an error when counter reaches 5
      if (prevCounter === 4) {
        throw new Error('Counter reached 5! This is a demo error.');
      }
      return prevCounter + 1;
    });
  };

  return (
    <div className="text-center">
      <p className="text-xl mb-4">Counter: {counter}</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Increment Counter
      </button>
      <p className="text-sm text-gray-600 mt-2">
        (Will throw error at count 5)
      </p>
    </div>
  );
}