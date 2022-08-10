// cilj ove komponente je da upravlja contexom i da ga obezbedi svim komponentama koje zele pristup contextu
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// moze van jer nece koristiti nista sto je unutar f-je ove komponente
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // grupisemo iteme za isto meso zajedno    
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
  return defaultCartState;
};

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

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
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
