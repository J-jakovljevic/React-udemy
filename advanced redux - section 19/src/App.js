import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible); // ui is from store/index.js
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // it's not allowed useEffect(aync() => {},[]) because when you mark a function with async it will implicitly return a promise.
  // So when it comes to running the clean up function returned from useEffect you'll also be implicitly returning a promise, which isn't allowed as this can cause race conditions.
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
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

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {      // this blocks sending cart data (function below) when the app starts
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
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
