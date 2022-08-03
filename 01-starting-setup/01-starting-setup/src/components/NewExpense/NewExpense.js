import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import React, { useState } from 'react';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);  // false u smislu da forma ne treba da bude prikazana

  const startEditingHandler = () => { // f-ja se poziva kada je dugme kliknuto
    setIsEditing(true);
  }

  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log(expenseData);
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && <button onClick={startEditingHandler}>Add new expense</button>} {/* dugme ce se  prikazati ako se ne edituje*/}
      {isEditing && <ExpenseForm onSaveExpenseData = {saveExpenseDataHandler} onCancel={stopEditingHandler}/>}
    </div>
  );
};

export default NewExpense;
