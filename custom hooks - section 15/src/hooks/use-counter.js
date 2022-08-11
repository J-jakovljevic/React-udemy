import { useState, useEffect } from "react";

// "use" at the beggining of the name is required if we want to create custom hook
const useCounter = (forwards = true) => {                 // forwards is boolean which is true if we wanna add, false if we wanna substract
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if(forwards) {
            setCounter((prevCounter) => prevCounter + 1);
        } else {
            setCounter((prevCounter) => prevCounter - 1);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [forwards]);         // forwards is dependency bcs it's not defined inside of useEffect or outside of custom hooks

    return counter;
}

export default useCounter;