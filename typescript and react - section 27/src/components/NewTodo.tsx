import React, { useRef } from "react";

import classes from './NewTodo.module.css';

const NewTodo: React.FC<{onAddTodo: (text: string) => void}> = (props) => {
    const todoTextInputRef = useRef<HTMLInputElement>(null);  // typescript needs to make it clear it'll be connected to the input element
                                                         // in () is starting value
    const submitHandler = (event: React.FormEvent) => {     // event need to has a type
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;    // "!" means that we're sure that input field isn't null, when we're not sure it goes "?"
    
        if(enteredText.trim().length === 0) {
            // throw an error
            return;
        }

        props.onAddTodo(enteredText);
    } 

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo text</label>
            <input type="text" id="text" ref={todoTextInputRef}/>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo;