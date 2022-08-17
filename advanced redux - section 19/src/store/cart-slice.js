import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [],
        totalQuantity: 0
     },
    reducers: {
        addItemToCart(state, action) {      // we need action bcs we're managing with data
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if(!existingItem) {
                state.items.push({      // not allowed with redux, but with redux toolkit it is
                    itemId: newItem.id,
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
        removeItemFromCart() {}
    }
})

export default cartSlice;