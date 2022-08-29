import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;   // object destructuring -> {name of the keys in that object which we want to extract, in which we want to store and separate variables } = object we want to destructor or from which we want to extract
                                      // here, we know that onLoadIngredients exists as a key in props (bcs of line 24)
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;   // title is the filed from which we want to filter 
    fetch('https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query)
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = [];
      for(const key in responseData) {
        loadedIngredients.push({
          id: key,  // random string we have in firebase
          title: responseData[key].title, // responseData is nested for every key
          amount: responseData[key].amount
        })
      }
       onLoadIngredients(loadedIngredients);   // we expect onLoadIngredients() in Ingredients.js
    })
  }, [enteredFilter, onLoadIngredients]);  // useEffect runs everytime this fields change

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
