import './ExpenseItem.css';

function ExpenseItem(props) { // props je objekat koji sadrzi sve vrednosti (vrednost za title, amount, date) koje dobijamo za svaki nas element  
  return (
    <div className="expense-item">
      <div>{props.date.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
