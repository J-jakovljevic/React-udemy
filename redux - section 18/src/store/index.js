import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

// counterReducer = (existing state with default value, action)
const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {                                    // returns new state object
            counter: state.counter + 1,
            showCounter: state.showCounter          // we set it to the value we currently have in our state bcs we don't want to change it 
        };
    }

    if (action.type === 'increase') {
        return {                                     
            counter: state.counter + action.amount,      // amount has same name as in Counter.js
            showCounter: state.showCounter 
        };
    }

    if (action.type === 'decrement') {
        return {                                    
            counter: state.counter - 1,
            showCounter: state.showCounter 
        };
    }

    if(action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            counter: state.counter
        }
    }

    return state;       // unchanged state
}

const store = createStore(counterReducer);

export default store;