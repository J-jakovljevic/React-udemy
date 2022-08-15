// cilj ove komponente je da upravlja contexom i da ga obezbedi svim komponentama koje zele pristup contextu
import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// moze van jer nece koristiti nista sto je unutar f-je ove komponente
const cartReducer = (state, action) => {
  if (action.type === "ADD") { 
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(        // finxIndex trazi item u nizu
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if(existingCartItem) {
        const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,        // ako dodamo dva susija, ne treba da prikazuje dva nova itema nego da apdejtuje postojeci tako sto ce apdejtovati samo kolicinu
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    } else {
        updatedItems = state.items.concat(action.item);               // dodaje new item u array ali za razliku od push() ne menja postojeci array vec kreira novi
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  ); // cartState = state snapshot, defaultCartState = initial state

  // nalazi se ovde jer u CartProvider-u upravljamo podacima iz cart-a
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item }); // type i item su proizvoljni nazivi
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };
  // we are using provider to wrap all components that needs access to the cart
  // (in our case it's all components which are rendered in app.js)
  // Use a Provider to pass the current auth to the tree below.
  // In this example, we're passing cartContext as the current value.
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
