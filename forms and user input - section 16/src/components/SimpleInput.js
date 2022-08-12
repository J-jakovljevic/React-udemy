import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  // we can get user input via refs or useState: refs are better when we need a value
  // just once - when the form is submitted (bcs updating value with every keystroke is overkill); 
  // useState is better when we need the value on every keystroke for instant validation and if
  // we need to reset the entered input
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if(enteredNameIsValid) {
      console.log('Name input is valid!');
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if(event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();      // if form is submitted on button, a http req. is sent to server serving this website
                                // (we don't wanna to send it to server bcs we don't have server)

    setEnteredNameTouched(true);    // when the form is submitted, all inputs are touched

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

 //   nameInputRef.current.value = '';    => it works, but it's not ideal bcs we couldn't manipulate the dom, we should let react do that for us
    setEnteredName('');
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}    // will activate when this input loses focus
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
