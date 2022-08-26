import React, { useState } from 'react';

import Todo from '../models/todo';

type TodosContextObjects = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObjects>({
    items: [],
    addTodo: () => {},
    removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);   // ts can't infer which types of values should be accepted in that array,
                                                   // so we must emphasize that this state will manage an array of todos

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    // concat'll create a new array which contains newTodo (bcs we shouldn't mutate existing array) which'll be used as a new state by react
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
      // we're updating the state based on previous state
      setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.id !== todoId);
      });
  };

  const contextValue: TodosContextObjects = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler
  };

    return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>
}

export default TodosContextProvider;