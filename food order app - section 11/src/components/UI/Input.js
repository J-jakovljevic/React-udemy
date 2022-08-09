import classes from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => {        // we are using refs instead of using useState bcs we don't wanna update
                                                        // any state until the form is submitted bcs form has many text inputs
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    )
});

export default Input;