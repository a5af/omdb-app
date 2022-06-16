import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import CommonCrewSearch from './components/CommonCrewSearch';

const API = 'http://localhost:3000/';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar API={API} />

        <CommonCrewSearch API={API} />
      </header>
    </div>
  );
}

export default App;
