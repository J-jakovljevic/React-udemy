import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || "button"}  /* props.type ce prihvatiti type button-a spolja, tj sa mesta gde se Button komponenta koristi (AddUser.js) 
                                        ukoliko type nije definisan spolja, bice tipa "button" */
      onClick={props.onClick}
    >
        {props.children}            {/* props.children daje ono sto se nalazi unutar Button tagova u AddUser.js-u */ }
    </button>
  );
};

export default Button;
