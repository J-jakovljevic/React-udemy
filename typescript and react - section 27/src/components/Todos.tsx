import React from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from './Todos.module.css';

const Todos: React.FC<{items: Todo[]; onRemoveTodo2: (id: string) => void }>= (props) => {     // fc makes it clear that this here is a function that acts as a functional component;
                                                         //fc type is generic and the value we're plugging in is our own props object where we 
                                                        // describe our own props for this specific functional component; it's generic bcs
                                                        // different functional components have different props definitions
                                                        //items: string[] -> we merge our prop object definition with base prop obj. def. 
    return (
        <ul className={classes.todos}>
            {props.items.map((item) => (
                <TodoItem key={item.id} text={item.text} onRemoveTodo={props.onRemoveTodo2.bind(null, item.id)} />     // bind predefines a function for future execution
                                                                                                                      // setting first argument which onRemoveTodo will receive later
            ))}     
        </ul>
    )
}

export default Todos;