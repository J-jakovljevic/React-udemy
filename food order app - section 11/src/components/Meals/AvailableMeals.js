import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
 // useEffect(async () => {   
 //    await fetch('https://react-http-17999-default-rtdb.europe-west1.firebasedatabase.app/meals.json').then();

    // we can't use async function inside of useEffect -> we get error which says:
    /* Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
        useEffect(() => {
          async function fetchData() {
            // You can await here
            const response = await MyAPI.getData(someId);
            // ...
          }
          fetchData();
        }, [someId]); // Or [] if effect doesn't need props or state
        */
   //  
   const [meals, setMeals] = useState([]);

   useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-17999-default-rtdb.europe-west1.firebasedatabase.app/meals.json').then();
      const responseData = await response.json();   

      const loadedMeals = [];   // responseData is object, but we want array

      for (const key in responseData) {
        loadedMeals.push({         // pushing new objects into empty array
          id: key,                // data we're working with in front : data we get back from json
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      setMeals(loadedMeals);
    };

    fetchMeals();
   }, []);

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
