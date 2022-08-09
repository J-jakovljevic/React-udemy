import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>   {/* onClick sa leve strane jednakosti je ugradjeno, a sa desne strane je nase */}
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> 3</span>
    </button>
  );
};

export default HeaderCartButton;
