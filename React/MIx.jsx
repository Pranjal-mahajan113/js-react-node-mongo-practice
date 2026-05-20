//🔥 QUESTION 1 (useEffect + state trap)
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("Render", count);

  useEffect(() => {
    console.log("Effect", count);
    setCount(count + 1);
  }, []);

  return <button onClick={() => setCount(count + 1)}>Click</button>;
}

//🔥 QUESTION 2 (click + batching + closure)
export default function App() {
  const [x, setX] = useState(0);

  const handleClick = () => {
    console.log("A", x);

    setX(x + 1);
    setX(x + 2);

    console.log("B", x);
  };

  return <button onClick={handleClick}>Click</button>;
}

//🔥 QUESTION 3 (setTimeout + useState)
export default function App() {
  const [n, setN] = useState(0);

  const handleClick = () => {
    console.log("A", n);

    setTimeout(() => {
      console.log("B", n);
    }, 0);

    setN(n + 1);
  };

  return <button onClick={handleClick}>Click</button>;
}