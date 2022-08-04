import classes from './Card.module.css';

const Card = (props) => {
    return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;      // props.children daje ono sto se nalazi unutar tagova card komponente
};

export default Card;