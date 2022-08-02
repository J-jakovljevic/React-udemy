import "./ExpenseForm.css";
import React, { useState } from "react";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(""); // po default-u input polje je prazno
  const [enteredAmount, setEnteredAmount] = useState(""); // kada se slusa promena sa input polja, uvek ce biti string, bez obzira sto polje cuva brojeve ili datum
  const [enteredDate, setEnteredDate] = useState("");

  /*  const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: ''
    });*/

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    /*   setUserInput({
        ...userInput,       // ne smemo da izgubimo ostala dva polja
        enteredTitle: event.target.value,
       })    --> nije dobar nacin jer se kopiraju stare vrednosti za ostala dva polja */

    /*    setUserInput((prevState) => {  // f-ja koja garantuje da ce dobaviti apdejtovane vrednosti
            return {...prevState, enteredTitle: event.target.value}
       });*/
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    /*   setUserInput({
            ...userInput,
            enteredAmount: event.target.value
        })*/
    /*    setUserInput((prevState) => {  // f-ja koja garantuje da ce dobaviti apdejtovane vrednosti
            return {...prevState, enteredAmount: event.target.value}
       });*/
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    /*   setUserInput({
        ...userInput,
        enteredDate: event.target.value
    }) */
    /*   setUserInput((prevState) => {  // f-ja koja garantuje da ce dobaviti apdejtovane vrednosti
        return {...prevState, enteredDate: event.target.value}
   });*/
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate) // enteredDate koji je string se konvertuje u date
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
