# React-udemy
Here are notes which i catched while learning React.

Refs give access to work with dom elements. We are using refs instead of using useState bcs we don't wanna update any state until the form is submitted bcs form has many text inputs.

CSS Modules let you write styles in CSS files but consume them as JavaScript objects for additional processing and safety. CSS Modules are very popular because they automatically make class and animation names unique so you don't have to worry about selector name collisions.

React context allows us to pass down and use (consume) data in whatever component we need in our React app without using props. You can think of React context as the equivalent of global variables for our React components. React context helps us avoid the problem of props drilling.
Props drilling is a term to describe when you pass props down multiple levels to a nested component, through components that don't need it.  Contex isn't good to use if out data changes a lot. It's good for low-frequency updates like changing a theme, but for other thing it's better to use redux.

export default react.memo(nameOfComponent) - react is checking new values of props from forwarded component and compare it with previous value. Just in case value is changed, component will be again executed, but in case parent component was changed and value of props of that component didn't, component won't be executed -> but that also has performance deficiencies

primitive types = numbers, string, booleans, undefined, null; first 3 are going into stack bcs their values are known in advance
reference types = objects, arrays; they are going into heap bcs their size isn't known in advace

One reason to use useCallback is to prevent a component from re-rendering unless its props have changed. The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.

class-based component is an old way of creating components which are using render function, but today we're using functional components where we're using just return statement
with class-based components, state is always an object
with functional components, state can be anything

fetch api - allows to send and receive http requests

custom hooks are used to avoid code repetition - when we have same part of code in different places, we want to separate that code in different function for itself

dependency of useState & useCallback - functions are objects too! if something is parameter of function, it doesn't need to be dependency

How to know when to use ref or useState? - Refs are better when we need a value just once - when the form is submitted (bcs updating value with every keystroke is overkill); useState is better when we need the value on every keystroke for instant validation and if we need to reset the entered input

Redux - better than contex; components are subscribed to central data and get the latest update from central data. They never directly manipulate the store data -> we use reducer function for that ( != useReducer() ). We should never change the existing state, instead we should override it by returning a new state object.

Provider is used to connect app with redux store -> for that we need to provide that store to react app. Access to redux will have only components that are wrapped with <Provider>.

useSelector() determines which piece of data we wanna extract from our store, parameters: (function receive the state managed by redux => returns the part of state which we wanna extract). Redux automatically sets up a subscription to the store for this component -> that means the component will be automatically updated and receive the latest value whenever redux store change. Import { useStore } gives access to the store, but { useSelector } allows us to automatically select a part of our state managed by the store. 

useDispatch() returns a function which will dispatch an action against redux store. 

class-based components with redux: useDispatch and useSelector are hooks and hooks are not allowed in class-based components, so we use { connect }, which allows class-based component to connect to redux. Connect also set up subscription automatically. 

 An action object can have other fields with additional information about what happened. By convention, we put that information in a field called payload. A typical action object might look like this:

const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
} 

Reducers must be side-effect free, synchrnous functions and without sending requests

It's not allowed useEffect(aync() => {},[]) because when you mark a function with async it will implicitly return a promise. So when it comes to running the clean up function returned from useEffect you'll also be implicitly returning a promise, which isn't allowed as this can cause race conditions.

 <ins> Routing: </ins> <br/>
NavLik is same as Link, but it has addition to set a css class on the element on screen which is active.

Switch allows one ruter to be active in time (it won't render all products and product with link /p2 under it at same time).

Put exact keyword to the route whose path is also included by another route's path ( /products has exact keyword bcs it's a part of /products/:productId)

Link vs Route:
Link is the element you could use to navigate through routes.
<Link to="/example" />
Route is responsible to render some UI when a location matches the route’s path.
<Route path="/example" render={Profile] />
They are used separately. Link is dependent to Route's locations. But Route can be used without Link.
<br/>
<br/>
UseHistory hook allows us to change the browser history (like navigating us to new page); it gives us history object on which could be used push and replace methods. With push we can go back to previous page (with the back button) and with replace we can't.
