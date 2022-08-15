import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({     // we don't need useCallback bcs we're using this function inside of enterTaskHandler, not inside of useEffect 
                          // which means this'll be called when this function runs (which happens when the form is subbmited), not whenever
                          // this component is reevaluated (which happens with useEffect)
      url: 'https://react-hooks-d2ebf-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {text: taskText}
    }, createTask.bind(null, taskText)    // we use bind() to "preconfigure" which arguments that function should receive when it's eventually getting called
    );
};

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
