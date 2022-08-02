import './Card.css'

const Card = (props) => {
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>; // bice prosledjeno ono sto se nalazi izmedju otvorenog i zatvorenog Card taga u ExpenseItemu
}

export default Card;