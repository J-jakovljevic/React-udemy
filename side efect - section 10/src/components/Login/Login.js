import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// moze da se pise izvan login komponente jer ne interaguje ni sa cim unutar login komponente
const emailReducer = (state, action) => {       // drugi arg je f-ja koja ce pozvati akciju koja ce biti consumed by prvi arg
  if(action.type === 'USER_INPUT') {      // ono sto saljemo kao action ce biti objekat jer smo tako postavili u 54. liniji, a taj objekat ima type polje
    return { value: action.val, isValid: action.val.includes('@') };
  }  
  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };    // za INPUT_BLUR ne menjamo value, pa ovde preuzimamo najnoviju vrednost pomocu state.value 
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {     
  if(action.type === 'USER_INPUT') {     
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }  
  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };   
  }
  return { value: '', isValid: false };
};


const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
 // const [emailIsValid, setEmailIsValid] = useState();
//  const [enteredPassword, setEnteredPassword] = useState('');
 // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
     value: '',                // initial state for emailState
     isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

   // prednost izdvajanja isValid-a je ta sto se useEffect ne pokrece ako se samo vrednost input polja promeni, a validacija ostane ista (true)
   const { isValid: emailIsValid } = emailState;         // object destructuring - koristi se da bi se izvukao property iz objekta
   const { isValid: passwordIsValid } = passwordState;  // isValid property smestamo u alijas pod proizvoljnim nazivom, sto je ustvari konstanta


  useEffect(() => {                              // pomocu ove f-je se dugme za login disable-uje i enabluje direktno prilikom menjanja pass ili username-a
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
    setFormIsValid(emailIsValid && passwordIsValid);
  }, 500);                                     // ceka se da korisnik prestane sa kucanjem najmanje 500ms kako bi tek onda proverio da li uneti username postoji,
                                           //   a to se radi zbog optimizacije kako ne bi vrsio proveru posle svakog unetog karaktera 
    return () => {                            // cleanup f-ja koja se pokrece svaki put pre izvrsenja ove gore f-je
      console.log('CLEANUP');
      clearTimeout(identifier);              // f-ja koja je ugradjena u browser
    };    
  },
  [emailIsValid, passwordIsValid]);  // u dependecies se dodaje ono sto ide u sideEffect f-ji
                                 //  pokrenuce sideEffect f-ju ako su emailIsValid ili passwordIsValid promenjeni

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
