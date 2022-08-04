import Button from '../UI/Button';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import React, { useState } from 'react';

const AddUser = (props) => {
   const [eneteredUsername, setEnteredUsername]  = useState('');
   const [eneteredAge, setEnteredAge]  = useState('');

   const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
   };

   const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
};

  const addUserHandler = (event) => {
    event.preventDefault();
    if(eneteredUsername.trim().length === 0 || eneteredAge.trim().length === 0) {
        return;
    }
    if(+eneteredAge < 1) {     // + pretvara string u number
        return;
    }
    props.onAddUser(eneteredUsername, eneteredAge);
    setEnteredAge('');
    setEnteredUsername('');
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={usernameChangeHandler} value={eneteredUsername}/>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" onChange={ageChangeHandler} value={eneteredAge}/>
        <Button type="submit">Add user</Button>
      </form>
    </Card>
  );
};

export default AddUser;
