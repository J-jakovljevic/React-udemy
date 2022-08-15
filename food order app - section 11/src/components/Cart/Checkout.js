import classes from './Checkout.module.css';
import { useRef } from 'react';

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    
    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredNameValue = nameInputRef.current.value;
        const enteredStreetValue = streetInputRef.current.value;
        const enteredPostalCodeValue = postalCodeInputRef.current.value;
        const enteredCityValue = cityInputRef.current.value;

        console.log(enteredNameValue);
        console.log(enteredStreetValue);
        console.log(enteredPostalCodeValue);
        console.log(enteredCityValue);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>   {/* go into cart.js, return statement */}
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;