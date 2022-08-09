import { useState } from 'react';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  // radimo u App.js sa useState zato sto ovde renderujemo cart i tu zelimo da podesavamo njenu vidljivost
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
     {cartIsShown && <Cart onClose={hideCartHandler} />}  {/* if cartIsShown = true -> prikazace Cart, u suprotnom nece */}
      <Header onShowCart={showCartHandler} />  {/* onShowCart je proizvoljno ime */}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
