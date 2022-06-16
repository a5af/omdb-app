import './ResultsDisplay.css';
import React, { useEffect, useState } from 'react';

const ResultsDisplay = () => {
  const [results, setResults] = useState('');

  // Retrieve the results from store
  // const results = useSelector();

  useEffect(() => {});
  return (
    <div className="ResultsDisplay">
      <header className="ResultsDisplay-header">Results</header>
    </div>
  );
};

export default ResultsDisplay;
