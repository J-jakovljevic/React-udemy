import { useState, useEffect } from "react";

let globalState = {};   // if we define it inside of custom hook, it would be for each component, but we need to share same data in all components
let listeners = [];    // bcs we're going to have couple of places in the app where we'll be able to listen to changes in that state
                       // and it's a list of functions which we're gonna call to update components that're using this hook  
let actions = {};

export const useStore = () => {                         // custom hook
    const setState = useState(globalState)[1];         // we're interesed just in second argument

    const dispatch = (actionIdentifier, payload) => {       // payload can be string, number...
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};       // global state = old data + new data

        for(const listener of listeners) {
               listener(globalState);            // informing listener about new state
        }
    }

    useEffect(() => {
        listeners.push(setState);       // every comp. will get it's own setState function

        return () => {                  // cleanup function 
            listeners = listeners.filter(li => li !== setState);    // keeping all listeners that are != .... 
        };
    }, [setState]);     // useEffect'll run once bcs useState guarantee that setState never changes

    return [globalState, dispatch];
};

// function for changing/seting actions
export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = {...globalState, ...initialState};   // global state = global state + initial state
    }

    actions = {...actions, ...userActions};
}