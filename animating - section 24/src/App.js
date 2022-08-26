import React, { Component } from "react";
import Transition  from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={() => this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button>
        <br />
        <Transition 
          in={this.state.showBlock}/* "in" shows if the element inside trans. should be shown, timeout determines how long in ms it takes to switch from one state to another */
          timeout={300}// removes this element from dom after 300ms
          mountOnEnter/* if the property is set to true, wraped element is added to the dom */
          unmountOnExit>  
          {/* here is removed from dom if it's not true */}
                                                               
        {/* {state => <p>{state}</p>}   run this code to see switching between states*/}
         {state => (  // state: ENTERING, ENTERED, EXITING, EXITED
         <div 
          style={{ 
            backgroundColor: "red", 
            width: 100, 
            height: 100,
            margin: "auto",
            transition: 'opacity 1s ease-out',
            opacity: state === 'exiting' ? 0 : 1
          }} />
         )}
        </Transition>  
            <Modal show={this.state.modalIsOpen} closed={this.closeModal} />

        {this.state.modalIsOpen ? (
          <Backdrop show={this.state.modalIsOpen} />
        ) : null}
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
