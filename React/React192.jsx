import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("A", count);

  const handleClick = () => {
    console.log("B", count);

    setCount(count + 1);
    setCount(count + 1);

    console.log("C", count);
  };

  return <button onClick={handleClick}>Click</button>;
}
//initial:A,0
//Oneclick :A,0 B,0 C,1

//Q2.
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("A", count);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);

    console.log("B", count);
  };

  return <button onClick={handleClick}>Click</button>;
}

//Q3.
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("A", count);

  const handleClick = () => {
    console.log("B1", count);

    setCount(count + 1);
    setCount(count + 2);

    console.log("B2", count);
  };

  return <button onClick={handleClick}>Click</button>;
}
//Initial->A,0 THEN CLICK-->B1,0 B2 ,0 THEN VALUE UPDATE--SETCOUNT(2-RE-RENDDER->)A,2
//FINAL OTPUT
//A,0
//B1,0
//B2,0
//A,2

//Q4
import { useState } from "react";

export default function App() {
  const [x, setX] = useState(0);

  console.log("A", x);

  const handleClick = () => {
    setX(x + 1);
    console.log("B", x);
    setX(x + 2);
  };

  return <button onClick={handleClick}>Click</button>;
}

//INITAIL FIRST->A,0--THEN CLICL-->B,0-->ABHI VALUE UPDATE NHI HUI-?BOTH STATE COUNT SAME->SETCOUTN(2) FINAL A,2
//A,0
//B,0
//A,2

//Q5.
import { useState } from "react";

export default function App() {
  const [n, setN] = useState(0);

  console.log("A", n);

  const handleClick = () => {
    console.log("B1", n);

    setTimeout(() => {
      console.log("B2", n);
    }, 0);

    setN(n + 1);
  };

  return <button onClick={handleClick}>Click</button>;
}
//INITIAL RENDER-->A,0 B1,0 B2,0 A,1
//CORRECT:A,0 B1,0 A,1 B2,0