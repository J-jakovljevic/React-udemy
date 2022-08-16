import classes from './Counter.module.css';
import { counterActions } from '../store';
import { useSelector, useDispatch } from 'react-redux/es/exports';   // useStore gives access to the store, but useSelector allows us to 
                                                                             // automatically select a part of our state managed by the store 
                                                                     
const Counter = () => {
  const dispatch = useDispatch();   // returns a function which will dispatch an action against redux store
  const show = useSelector(state => state.showCounter);
  const counter = useSelector(state => state.counter);     // useSelector() determines which piece of data we wanna extract from our store
  // parameters: (function receive the state managed by redux => returns the part of state which we wanna extract)

  // redux automatically set up a subscription to the store for this component -> that means the component will be
  // automatically updated and receive the latest counter whenever redux store change

  const incrementHandler = () => {
    dispatch(counterActions.increment());   // it goes with () bcs when executed we get a full action object automatically created
                                           // The only way to update the state is to call store.dispatch() and pass in an action object.
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10));  // redux will create actions object { type: SOME_ID, payload: 10 }    
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  }; 

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increase by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/*
class Counter extends Component {
  incrementHandler() {
    // in counter comp. in his props we have prop named increment (in mapDispatchToProps)
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {

  }

  render() {
    return (
      <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{this.props.counter}</div>   {/* this.props bcs of mapStateToProps 
      <div>
        <button onClick={this.incrementHandler.bind(this)}>Increment</button>
        <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
      </div>
      <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
    </main>
    )
  }
}

const mapStateToProps = state => {     // function that maps redux state to props
  return {                            // returns object where keys'll be available as props in the receiving component (counter comp.)
    counter: state.counter           // counter is name up to u
  }
}

// function which is used to store dispatch functions in props (in Counter comp. we have certain props which we can execute as a function
// which will then - when executed - dispatch an action to redux store)
const mapDispatchToProps = dispatch => {
  return {
      increment: () => dispatch({ type: 'increment' }),  // keys are props names which we can use in counter comp.
      decrement: () => dispatch({ type: 'decrement' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);    // we execute the connect function, then it returns a new function which 
                                                                        //we execute -> to that returned function we pass counter
*/