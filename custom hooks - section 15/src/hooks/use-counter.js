import { useState, useEffect } from "react";

const useCounter = () => {              // "use" at the beggining of the name is required if we want to create custom hook
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

    return counter;
}

export default useCounter;