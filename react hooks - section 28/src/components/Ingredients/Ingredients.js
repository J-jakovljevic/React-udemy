import React, { useState, useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;   // replacing old with new ingrediants
    case 'ADD':
      return [...currentIngredients, action.ingredient];    // old ingr. + new item
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
}

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);    // initially currentIngredients is []; dispatch is random name for function which'll go through actions
//  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); // empty useState is same as null or undefined

  // we don't need useEffect bcs we already fetching ingredients in search component

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
   // setUserIngredients(filteredIngredients);
   dispatch({type: 'SET', ingredients: filteredIngredients});
  }, []);   // we have no dependency bcs setUserIngredients is special dependency bcs of useState

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}  // informing firebase that we have incoming json data
    }).then(response => {                     // this runs only when fetch request is done
      setIsLoading(false);    // we got our response
      return response.json();          // this'll extract the body and convert it from json to js; returns promise so 
    }).then(responseData => {    // we need this; responseData is object from database
   /*   setUserIngredients(prevIngredients => [ 
        ...prevIngredients,        // old array 
        {id: responseData.name,   // + new element
        ...ingredient}
      ]);*/
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
    });
  };

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
    {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false);  // we got response -> we're not loading anymore
   /*   setUserIngredients(prevIngredients => {
        return prevIngredients.filter(ingredient => ingredient.id !== id);
      })*/
      dispatch({type: 'DELETE', id: id});   // id on the right side is from removeIngredientHandler
    }).catch(error => {
      setError('Something went wrong!');
      setIsLoading(false);
    })
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
