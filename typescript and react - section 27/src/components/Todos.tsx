import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import classes from './Todos.module.css';
import { TodosContext } from "../store/todos-context";

//const Todos: React.FC<{items: Todo[]; onRemoveTodo2: (id: string) => void }> = (props) => {     // fc makes it clear that this here is a function that acts as a functional component;
                                                         //fc type is generic and the value we're plugging in is our own props object where we 
                                                        // describe our own props for this specific functional component; it's generic bcs
                                                        // different functional components have different props definitions
                                                        //items: string[] -> we merge our prop object definition with base prop obj. def.
 const Todos: React.FC = () => {    // we're using context now so we don't need props and props definition
    const todosCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map((item) => (
                <TodoItem key={item.id} text={item.text} onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)} />     // bind predefines a function for future execution
                                                                                                                      // setting first argument which onRemoveTodo will receive later
            ))}     
        </ul>
    )
}

export default Todos;