import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback(tasksObj => {    // transforming all tasks from object which we get back from firebase into structure for frontend 
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
  
    setTasks(loadedTasks);
  }, []);          // setTasks is not dependency bcs it's state update function (line 8), which guarantee to never change
  
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(    // sendRequest: alias
  transformTasks);    // we have to be sure these objects are not be recreated everytime app function runs -> we do that with callBack()

  useEffect(() => {
    fetchTasks({ url: 'https://react-hooks-d2ebf-default-rtdb.europe-west1.firebasedatabase.app/tasks.json' });
  }, [fetchTasks]);     // bcs of this dependency we now have to use callBack in use-http.js 

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
