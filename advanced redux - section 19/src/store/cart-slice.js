import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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
            state.totalQuantity++;

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

            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);   // we keep all items whose ids are != the id we're removing
            } else {                     // if we have more than one item
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
            
            
        }
    }
})

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "pending",
              title: "Sending...",
              message: "Sending cart data!",
            })
    );

   const sendRequest = async () => {
    const response = await fetch(
        "https://react-http-17999-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT", // put method will override the existing data, instead of post method which would add new data to a list of data
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
   }

   try {
    await sendRequest();

    dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
   } catch (error) {
    dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
   }
}
}

export const cartActions = cartSlice.actions;

export default cartSlice;