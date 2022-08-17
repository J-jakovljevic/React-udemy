import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible); // ui is from store/index.js
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch(
      "https://react-http-17999-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      {
        method: "PUT", // put method will override the existing data, instead of post method which would add new data to a list of data
        body: JSON.stringify(cart),
      }, [cart] // method will reexecutes whenever cart changes
    ); 
  });
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
