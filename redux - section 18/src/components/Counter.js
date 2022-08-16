import classes from './Counter.module.css';
import { useSelector } from 'react-redux/es/exports';  // useStore gives access to the store, but useSelector allows us to 
                                                      // automatically select a part of our state managed by the store 
const Counter = () => {
  const toggleCounterHandler = () => {}; 
  const counter = useSelector(state => state.counter);     // useSelector() determines which piece of data we wanna extract from our store
  // parameters: (function receive the state managed by redux => returns the part of state which we wanna extract)

  // redux automatically set up a subscription to the store for this component -> that means the component will be
  // automatically updated and receive the latest counter whenever redux store change
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
