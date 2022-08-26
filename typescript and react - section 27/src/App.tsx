import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);   // ts can't infer which types of values should be accepted in that array,
                                                   // so we must emphasize that this state will manage an array of todos

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    // concat'll create a new array which contains newTodo (bcs we shouldn't mutate existing array) which'll be used as a new state by react
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos}/>
    </div>
  );
}

export default App;
