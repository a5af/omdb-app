import styles from './SearchBar.module.css';

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setResults } from '../features/search/searchSlice';
import { setConstantValue } from 'typescript';

const SearchBar = ({ API }: { API: string }) => {
  const [searchQ, setSearchQ] = useState('');
  const [results, setResults] = useState({});

  const [page, setPage] = useState(1);

  const ref = useRef<HTMLInputElement>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (page && searchQ) {
      handleSubmit(false);
    }
  }, [page]);

  const handleSubmit = async (ev: any) => {
    console.log(searchQ, page);
    if (ev) {
      ev.preventDefault();
    }

    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: searchQ,
        page,
      }),
    });

    const responseJSON = await response.json();
    setResults(responseJSON);
  };

  const handleKey = async (ev: any) => {
    setSearchQ(ev.target.value);
  };

  const handlePageLast = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageNext = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.SearchBar}>
      Search by Title
      <header className={styles.SearchBarHeader}>
        <input
          className={styles.SearchBarInput}
          onKeyUp={handleKey}
          placeholder={'Enter title'}
        ></input>
        <button
          disabled={searchQ == ''}
          className={styles.SearchBarSubmit}
          onClick={handleSubmit}
        >
          Search
        </button>

        <button
          disabled={searchQ == ''}
          className={styles.SearchBarSubmit}
          onClick={handlePageLast}
        >
          last
        </button>

        <button
          disabled={searchQ == ''}
          className={styles.SearchBarSubmit}
          onClick={handlePageNext}
        >
          next
        </button>
      </header>
      <div className={styles.Results}>{JSON.stringify(results)}</div>
    </div>
  );
};

export default SearchBar;
