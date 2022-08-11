import useCounter from '../hooks/use-counter';
import Card from './Card';

const ForwardCounter = () => {
  const counter = useCounter();     // it doesn't need parameter if we want default param. (forwards=true) from useCounter()

 /* this is code which is removed with line 5. -> that's a point of custom hooks
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);*/

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
