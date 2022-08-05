import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {                              // pomocu ove f-je se dugme za login disable-uje i enabluje direktno prilikom menjanja pass ili username-a
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
    setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
  }, 500);                                     // ceka se da korisnik prestane sa kucanjem najmanje 500ms kako bi tek onda proverio da li uneti username postoji,
                                              // a to se radi zbog optimizacije kako ne bi vrsio proveru posle svakog unetog karaktera 
    return () => {                            // cleanup f-ja koja se pokrece svaki put pre izvrsenja ove gore f-je
      console.log('CLEANUP');
      clearTimeout(identifier);              // f-ja koja je ugradjena u browser
    };    
  },
  [setFormIsValid, enteredEmail, enteredPassword]);  // u dependecies se dodaje ono sto ide u sideEffect f-ji
                                                    // pokrenuce sideEffect f-ju ako je setFormIsValid true ili enteredEmail ili enteredPass promenjeni

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
