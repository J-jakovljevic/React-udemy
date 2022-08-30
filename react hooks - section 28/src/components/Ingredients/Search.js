import React, { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/http';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;   // object destructuring -> {name of the keys in that object which we want to extract, in which we want to store and separate variables } = object we want to destructor or from which we want to extract
                                      // here, we know that onLoadIngredients exists as a key in props (bcs of line 24)
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

    // if we want useEffect to have a return value, it's always a function
    useEffect(() => {
      const timer = setTimeout(() => {
        if (enteredFilter === inputRef.current.value) {
          const query =
            enteredFilter.length === 0
              ? ''
              : `?orderBy="title"&equalTo="${enteredFilter}"`;
          sendRequest(
            'https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query,
            'GET'
          );
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }, [enteredFilter, inputRef, sendRequest]);
  
    useEffect(() => {   // handling response
      if (!isLoading && !error && data) {
        const loadedIngredients = []; //then we got some response
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          });
        }
        onLoadIngredients(loadedIngredients);
      }
    }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
