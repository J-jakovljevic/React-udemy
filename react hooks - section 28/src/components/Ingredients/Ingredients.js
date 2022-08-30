import React, { useReducer, useCallback, useMemo, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients; // replacing old with new ingrediants
    case "ADD":
      return [...currentIngredients, action.ingredient]; // old ingr. + new item
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there");
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []); // initially currentIngredients is []; dispatch is random name for function which'll go through actions
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier } = useHttp();
  //  const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(); // empty useState is same as null or undefined

  // we don't need useEffect bcs we already fetching ingredients in search component

  useEffect(() => {
    if(!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: "DELETE", id: reqExtra });   //in this case reqExtra is id
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra}})   //in this case reqExtra is ingredient which is added
    }
     
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []); // we have no dependency bcs setUserIngredients is special dependency bcs of useState

  // whenever this component rebuilds, this function'll be recreated again and again -> solution: useCallback
  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      "https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      'ADD_INGREDIENT'
    );
    //  setIsLoading(true);
    /* dispatchHttp({type: 'SEND'});
    fetch('https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}  // informing firebase that we have incoming json data
    }).then(response => {                     // this runs only when fetch request is done
   //  setIsLoading(false);    // we got our response
       dispatchHttp({type: 'RESPONSE'});
      return response.json();          // this'll extract the body and convert it from json to js; returns promise so 
    }).then(responseData => {    // we need this; responseData is object from database
   /*   setUserIngredients(prevIngredients => [ 
        ...prevIngredients,        // old array 
        {id: responseData.name,   // + new element
        ...ingredient}
      ]);
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
    }); */
  }, []); // ingredient isn't dependency bcs it's local(internal), dispatchHttp is managed by react and it won't change

  const removeIngredientHandler = useCallback(
    (id) => {
      sendRequest(
        `https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
        "DELETE",
         null,
         id,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {
    //setError(null);
    //  dispatchHttp({type: 'CLEAR'});
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
