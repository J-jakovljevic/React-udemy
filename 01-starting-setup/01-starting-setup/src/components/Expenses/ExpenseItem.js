import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import React, { useState } from 'react'; // pomocu zagrada se navodi ime ugradjene f-je iz react biblioteke 

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title); // react funkcija koja mora biti pozvana direktno u funkciji komponente
                        // props.title je promenljiva u kojoj ce promene dovesti do ponovnog poziva ove funkcije, 
                       // jer react te pozive izvrsava samo jednom pa je potrebno da mu se dodatno naglasi
                       // useState vraca niz [title je trenutna vr, dok je setTitle f-ja pomocu koje se ta vr menja]

  const clickHandler = () => {
    setTitle('Updated!');
    console.log(title);
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date}/>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
        <button onClick={clickHandler}>Change title</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;
