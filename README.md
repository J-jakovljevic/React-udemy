# React-udemy
Here are notes which i catched while learning React.

<ins>Refs</ins> give access to work with dom elements. We are using refs instead of using useState bcs we don't wanna update any state until the form is submitted bcs form has many text inputs.

<ins>CSS Modules</ins> let you write styles in CSS files but consume them as JavaScript objects for additional processing and safety. CSS Modules are very popular because they automatically make class and animation names unique so you don't have to worry about selector name collisions.

<ins>React context</ins> allows us to pass down and use (consume) data in whatever component we need in our React app without using props. You can think of React context as the equivalent of global variables for our React components. React context helps us avoid the problem of props drilling.
<ins>Props drilling</ins> is a term to describe when you pass props down multiple levels to a nested component, through components that don't need it.  Contex isn't good to use if out data changes a lot. It's good for low-frequency updates like changing a theme, but for other thing it's better to use redux.

export default react.<ins>memo</ins>(nameOfComponent) - react is checking new values of props from forwarded component and compare it with previous value. Just in case value is changed, component will be again executed, but in case parent component was changed and value of props of that component didn't, component won't be executed -> but that also has performance deficiencies

<ins>primitive types</ins> = numbers, string, booleans, undefined, null; first 3 are going into stack bcs their values are known in advance
<ins>reference types</ins> = objects, arrays; they are going into heap bcs their size isn't known in advace

One reason to use <ins>useCallback</ins> is to prevent a component from re-rendering unless its props have changed. The <ins>useCallback</ins> and useMemo Hooks are similar. The main difference is that <ins>useMemo</ins> returns a memoized value and useCallback returns a memoized function.

<ins>class-based component</ins> is an old way of creating components which are using render function, but today we're using functional components where we're using just return statement
with class-based components, state is always an object
with functional components, state can be anything

<ins>fetch api</ins> - allows to send and receive http requests

Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component. Doing so will lead to confusing bugs. Instead, use useEffect. The function passed to <ins>useEffect</ins> will run after the render is committed to the screen. UseEffect with no second argument will runs everytime after state updated or component mount. With [] as second parameter, it'll be executed when component mounts and renders just once at the beggining. 

<ins>custom hooks</ins> are used to avoid code repetition - when we have same part of code in different places, we want to separate that code in different function for itself

<ins>dependency of useState & useCallback</ins> - functions are objects too! if something is parameter of function, it doesn't need to be dependency

<ins>How to know when to use ref or useState?</ins> - Refs are better when we need a value just once - when the form is submitted (bcs updating value with every keystroke is overkill); useState is better when we need the value on every keystroke for instant validation and if we need to reset the entered input

<ins>Redux</ins> - better than contex; components are subscribed to central data and get the latest update from central data. They never directly manipulate the store data -> we use reducer function for that ( != useReducer() ). We should never change the existing state, instead we should override it by returning a new state object.

<ins>Provider</ins> is used to connect app with redux store -> for that we need to provide that store to react app. Access to redux will have only components that are wrapped with *Provider*.

<ins>useSelector()</ins> determines which piece of data we wanna extract from our store, parameters: (function receive the state managed by redux => returns the part of state which we wanna extract). Redux automatically sets up a subscription to the store for this component -> that means the component will be automatically updated and receive the latest value whenever redux store change. Import { useStore } gives access to the store, but { useSelector } allows us to automatically select a part of our state managed by the store. 

<ins>useDispatch()</ins> returns a function which will dispatch an action against redux store. 

<ins>class-based components with redux:</ins> useDispatch and useSelector are hooks and hooks are not allowed in class-based components, so we use { connect }, which allows class-based component to connect to redux. Connect also set up subscription automatically. 

An action object can have other fields with additional information about what happened. By convention, we put that information in a field called <ins>payload</ins>. A typical action object might look like this:

const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
} 

<ins>Reducers</ins> must be side-effect free, synchrnous functions and without sending requests

It's not allowed useEffect(aync() => {},[]) because when you mark a function with async it will implicitly return a promise. So when it comes to running the clean up function returned from useEffect you'll also be implicitly returning a promise, which isn't allowed as this can cause race conditions.

 <ins> Routing: </ins> <br/>
<ins>NavLik</ins> is same as <ins>Link</ins>, but it has addition to set a css class on the element on screen which is active.

<ins>Switch</ins> allows one ruter to be active in time (it won't render all products and product with link /p2 under it at same time).

Put <ins>exact</ins> keyword to the route whose path is also included by another route's path ( /products has exact keyword bcs it's a part of /products/:productId)

<ins>Link vs Route:</ins><br/>
*Link to="/example"*, Link is the element you could use to navigate through routes.
*Route path="/example" render={Profile]*, Route is responsible to render some UI when a location matches the route’s path.
They are used separately. Link is dependent to Route's locations. But Route can be used without Link.
<br/><br/>
<ins>UseHistory hook</ins> allows us to change the browser history (like navigating us to new page); it gives us history object on which could be used push and replace methods. With <ins>push</ins> we can go back to previous page (with the back button) and with <ins>replace</ins> we can't.
<br/><br/>
<ins>useLocation hook</ins> gives us access to a location object which has info about the currently loaded page (URL).
<br/><br/>
<ins>Prompt component</ins> - automatically watch if we navigate away and if that happens, it'll show a warning before it allows us to leave page. 
*Prompt when={isEntering} message={(location) => 'Are you sure you want to leave?'}* prompt will be shown if the user changes url; location object contains info about the page we're trying to go and allow us to include that path in this message.
<br/><br/>
<ins>Query params</ins> allow for additional application state to be serialized into the URL that can't otherwise fit into the path of the URL (i.e. everything to the left of the ?).
<br/><br/>
<ins>useRouteMatch</ins> - if we change router path in app.js, we must to change it in nested roots too, but this hook helps us with that.
<br/><br/>
<ins>useLocation vs useRouteMatch:</ins><br/>
location.pathname gives the URL of the current page, while match.url gives the path we gave to the Route that is rendering the page. For example, while visiting /quotes/something, inside AllQuotes we will have /quotes/something as location.pathname, while match.url will be just /quotes because in the Route wrapping AllQuotes we have path='/quotes'.
<br/><br/>
<ins>useParams</ins> - gets params from url