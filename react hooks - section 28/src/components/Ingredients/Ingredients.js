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
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp();

  useEffect(() => {
    if(!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: "DELETE", id: reqExtra });   //in this case reqExtra is id
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra}})   //in this case reqExtra is ingredient which is added
    }
     
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []); 

  // whenever this component rebuilds, this function'll be recreated again and again -> solution: useCallback
  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      "https://react-hooks-update-3b031-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]); 

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
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

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
