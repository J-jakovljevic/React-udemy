import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const todos = [         // isn't anymore array of strings, it's array of todo objects
    new Todo('Learn React'),
    new Todo('Learn TypeScript')
  ];

  return (
    <div>
      <Todos items={todos}/>
    </div>
  );
}

export default App;
