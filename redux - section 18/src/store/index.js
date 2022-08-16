import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: 'counter',      // name of slice
    initialState: initialCounterState,
    reducers: {          // object of all reducers this slice needs
        increment(state) {       // we don't need to check if (action.type === 'increment') and we don't need param. action, so it doesn't exists here
            state.counter++;    // with this we're trying to edit existing state, but redux toolkit doesn't allow that to us
                               //  bcs he clones existing state, creates new object and override the state which we're editing
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {   // we need action bcs we're managing with data
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

const initialAuthState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;