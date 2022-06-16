import styles from './CommonCrewSearch.module.css';

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setResults } from '../features/search/searchSlice';

const CommonCrewSearch = ({ API }: { API: string }) => {
  const [film1Query, setFilm1Query] = useState('');
  const [film2Query, setFilm2Query] = useState('');

  const [results, setResults] = useState({});
  const ref = useRef<HTMLInputElement>();

  const fetchCrewApi = `${API}common/crew`;
  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    const response = await fetch(fetchCrewApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        film1: film1Query,
        film2: film2Query,
      }),
    });

    const responseJSON = await response.json();
    setResults(responseJSON);
  };

  const handleKey1 = async (ev: any) => {
    setFilm1Query(ev.target.value);
  };

  const handleKey2 = async (ev: any) => {
    setFilm2Query(ev.target.value);
  };

  return (
    <div className={styles.CommonCrewSearch}>
      Common Crew
      <header className={styles.CommonCrewSearchHeader}>
        <input
          className={styles.CommonCrewSearchInput}
          onKeyUp={handleKey1}
          placeholder={'Enter a film title'}
        ></input>

        <input
          className={styles.CommonCrewSearchInput}
          onKeyUp={handleKey2}
          placeholder={'Enter another film title'}
        ></input>

        <button
          disabled={film1Query == '' || film2Query == ''}
          className={styles.CommonCrewSearchSubmit}
          onClick={handleSubmit}
        >
          Send
        </button>
      </header>
      <div className={styles.Results}>{JSON.stringify(results)}</div>
    </div>
  );
};

export default CommonCrewSearch;
