// cilj ove komponente je da upravlja contexom i da ga obezbedi svim komponentama koje zele pristup contextu
import CartContext from "./cart-context";

const CartProvider = props => {
    const addItemToCartHandler = (item) => {};

    const removeItemFromCartHandler = (id) => {};

    const cartContext = {
        items: [],
        totalAmount: 0,
        addIdem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
       // we are using provider to wrap all components that needs access to the cart 
      // (in our case it's all components which are rendered in app.js)
     // Use a Provider to pass the current auth to the tree below.
    // In this example, we're passing cartContext as the current value.
    return <CartContext.Provider value={cartContext}>
        {props.children}     
    </CartContext.Provider>
};

export default CartProvider;