import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  // we don't need useEffect bcs we already fetching ingredients in search component

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);   // we have no dependency bcs setUserIngredients is special dependency bcs of useState

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}  // informing firebase that we have incoming json data
    }).then(response => {                     // this runs only when fetch request is done
      return response.json();          // this'll extract the body and convert it from json to js; returns promise so 
    }).then(responseData => {    // we need this; responseData is object from database
      setUserIngredients(prevIngredients => [ 
        ...prevIngredients,        // old array 
        {id: responseData.name,   // + new element
        ...ingredient}
      ]);
    });
  };

  const removeIngredientHandler = (id) => {
    fetch(`https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
    {
      method: 'DELETE'
    }).then(response => {
      setUserIngredients(prevIngredients => {
        return prevIngredients.filter(ingredient => ingredient.id !== id);
      })
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
