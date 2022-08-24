import React from "react";
import Transition from "react-transition-group/Transition";

import "./Modal.css";

const animationTiming = {
  enter: 400, // duration it will use for adding this element
  exit: 1000
};

const modal = (props) => {

  return (
    <Transition mountOnEnter unmountOnExit in={props.show} timeout={animationTiming}>
      {state => {
        const cssClasses = [
          "Modal",
          state === "entering" ? "ModalOpen"
            : state === "exiting" ? "ModalClosed"
            : null,
        ];

        return (
          <div className={cssClasses.join(" ")}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
        );
      }}
    </Transition>
  );
};

export default modal;
