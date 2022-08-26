import React from "react";
import Todo from "../models/todo";

const Todos: React.FC<{items: Todo[]}>= (props) => {     // fc makes it clear that this here is a function that asks as a functional component
                                                         //fc type is generic and the value we're plugging in is our own props object where we 
                                                        // describe our own props for this specific functional component; it's generic bcs
                                                        // different functional components have different props definitions
                                                        //items: string[] -> we merge our prop object definition with base prop obj. def. 
    return (
        <ul>
            {props.items.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default Todos;