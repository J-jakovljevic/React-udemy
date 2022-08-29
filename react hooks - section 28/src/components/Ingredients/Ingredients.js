import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
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
      setUserIngredients(loadedIngredients);
    })
  }, []);

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
    setUserIngredients(prevIngredients => {
      return prevIngredients.filter(ingredient => ingredient.id !== id);
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
