import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from './store/cart-slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible); // ui is from store/index.js
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // it's not allowed useEffect(aync() => {},[]) because when you mark a function with async it will implicitly return a promise.
  // So when it comes to running the clean up function returned from useEffect you'll also be implicitly returning a promise, which isn't allowed as this can cause race conditions.
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]); // method will reexecutes whenever cart changes

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
