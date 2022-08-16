import { createStore } from 'redux';

// counterReducer = (existing state with default value, action)
const counterReducer = (state = { counter: 0 }, action) => {
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

    return state;       // unchanged state
}

const store = createStore(counterReducer);

export default store;