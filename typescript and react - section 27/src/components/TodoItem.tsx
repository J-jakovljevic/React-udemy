const TodoItem: React.FC<{ text: string }> = (props) => {   // inside <> goes {} bcs we're making our props which are object, 
                                                            // bcs in return statement we have access onlly to props.children
    return <li>{props.text}</li>
};

export default TodoItem; 
