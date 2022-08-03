import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import Card from '../UI/Card';
import React, { useState } from "react";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  return (
    <div>
      <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {props.items.map(  /* dinamicko prikazivanje -> namapira se svaki expense iz liste items na expense item jsx element */
        (expense) => (
          <ExpenseItem
            key={expense.id}   /* pomocu ovoga ne dolazi do onog problema oko prepisivanja elemenata */
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        )
      )}
    {/*  <Card className="expenses">
        <ExpenseItem
          title={props.items[0].title}
          amount={props.items[0].amount}
          date={props.items[0].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.items[1].title}
          amount={props.items[1].amount}
          date={props.items[1].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.items[2].title}
          amount={props.items[2].amount}
          date={props.items[2].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.items[3].title}
          amount={props.items[3].amount}
          date={props.items[3].date}
        ></ExpenseItem>
      </Card> */}
      </Card>
    </div> 
        ); 
};

export default Expenses;
