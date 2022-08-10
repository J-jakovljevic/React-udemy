import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContex from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContex);

  const { items } = cartCtx;

  // reduce pretvara niz elemenata u single value (npr ako dodamo 3 itema, nece napraviti niz itema nego ce pretvoriti u value)
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;          // curNumber - variable that will hold the updated score that you get from each iteration
  }, 0);                                    // drugi argument je starting value

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    
    const timer = setTimeout(() => {                 // brisemo animaciju pomocu timeout nakon sto se izvrsi kako se ne bi pojavljivala samo prilikom prvog klika
      setBtnIsHighlighted(false);      // ako je false, onda se na 17. liniji ispisuje prazan string u drugoj {}
     }, 300);                         // 300ms jer toliko traje animacija
  
  return () => {
    clearTimeout(timer);
   };
 }, [items]);                       // useEffect ce se pokrenuti ukoliko se items promeni

  return (
    <button className={btnClasses} onClick={props.onClick}>   {/* onClick sa leve strane jednakosti je ugradjeno, a sa desne strane je nase */}
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
