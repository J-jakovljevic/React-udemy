import { useState } from "react";

const SimpleInput = (props) => {
  // we can get user input via refs or useState: refs are better when we need a value
  // just once - when the form is submitted (bcs updating value with every keystroke is overkill); 
  // useState is better when we need the value on every keystroke for instant validation and if
  // we need to reset the entered input
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';   // enteredName is valid when it's not empty
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

    if(enteredNameIsValid) {    // in case we got multiple validity, etc. enteredAgeIsValid, we list it here with && enteredAgeIsValid
      formIsValid = true;
    }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();      // if form is submitted on button, a http req. is sent to server serving this website
                                // (we don't wanna to send it to server bcs we don't have server)

    setEnteredNameTouched(true);    // when the form is submitted, all inputs are touched

    if(!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

 //   nameInputRef.current.value = '';    => it works, but it's not ideal bcs we couldn't manipulate the dom, we should let react do that for us
    setEnteredName('');
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}    // will activate when this input loses focus
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
