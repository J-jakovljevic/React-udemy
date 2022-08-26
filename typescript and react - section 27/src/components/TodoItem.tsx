import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ text: string, onRemoveTodo: () => void }> = (props) => {   // inside <> goes {} bcs we're making our props which are object, 
                                                            // bcs in return statement we have access onlly to props.children
    return <li className={classes.item} onClick={props.onRemoveTodo}>{props.text}</li>
};

export default TodoItem; 
