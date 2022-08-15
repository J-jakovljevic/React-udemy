const redux = require('redux');

//reducer function  
const counterReducer = (state = { counter: 0 }, action) => {      // has 2 arg. => old state, action that was dispatched;
    if (action.type === 'increment') {
        return {                                    // returns new state object
            counter: state.counter + 1
        };
    }

    if (action.type === 'decrement') {
        return {                                    // returns new state object
            counter: state.counter - 1
        };
    }
   
    return state;
}; 

const store = redux.createStore(counterReducer);   // store needs to know which reducer is responsible for changing that store

const counterSubscriber = () => {
    const latestState = store.getState();       // getState is a method which is available on the store
                                                // gives us a latest snapshot after it was updated
    console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({type: 'increment'});
store.dispatch({type: 'decrement'});