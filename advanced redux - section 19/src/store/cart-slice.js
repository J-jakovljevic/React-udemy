import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [],
        totalQuantity: 0,
        changed: false
     },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
          },
        addItemToCart(state, action) {      // we need action bcs we're managing with data
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;

            if(!existingItem) {
                state.items.push({      // not allowed with redux, but with redux toolkit it is
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++;       // not allowed with redux, but with redux toolkit it is
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {      // action helps us to identify the item that should be removed
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;

            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);   // we keep all items whose ids are != the id we're removing
            } else {                     // if we have more than one item
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
            
            
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;