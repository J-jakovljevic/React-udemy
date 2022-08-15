import { useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {      // parameters will be passed into this function automaticaly by react
    if(action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched };  // we're using the previous state of isTouched bcs we don't want to interrupt user's typing
    }
    if(action.type === 'BLUR') {
        return { isTouched: true, value: state.value };     // we're using the previous state of value bcs we don't need it
    }
    if(action.type === 'RESET') {
        return { isTouched: false, value: '' };
    }
    
    return initialInputState;        // returning new snapshot
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);   
    const hasError = !valueIsValid && inputState.isTouched;

   // const [enteredValue, setEnteredValue] = useState('');
  //  const [isTouched, setIsTouched] = useState(false);

  //  const valueIsValid = validateValue(enteredValue);   
//    const hasError = !valueIsValid && isTouched;
    
    const valueChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value});       // dispatch se izvrsava nad action objektom ciji arg. su unutar {}
     //   setEnteredValue(event.target.value);
      };

    const inputBlurHandler = event => {
        dispatch({type: 'BLUR'});
     //   setIsTouched(true);
    }  

    const reset = () => {
        dispatch({type: 'RESET'});
    //    setEnteredValue('');
    //    setIsTouched(false);
    }

    return { 
        value: inputState.value, 
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;