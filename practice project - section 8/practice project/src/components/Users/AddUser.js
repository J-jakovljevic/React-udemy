import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import React, { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const [eneteredUsername, setEnteredUsername] = useState("");
  const [eneteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      eneteredUsername.trim().length === 0 ||
      eneteredAge.trim().length === 0
    ) {
        setError({
            title: 'Invalid input',
            message: 'Please enter a valid name and age (non-empty values).'
        })
      return;
    }
    if (+eneteredAge < 1) {     // + pretvara string u number
        setError({
            title: 'Invalid age',
            message: 'Please enter a valid age ( > 0 ).'
        })
      return;
    }
    props.onAddUser(eneteredUsername, eneteredAge);
    setEnteredAge("");
    setEnteredUsername("");
  };

  const errorHandler = () => {
    setError(null);         // null se tretira kao falsy vrednost i zbog toga se errorModal ne prikazuje
  }

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={eneteredUsername}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={eneteredAge}
          />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
