// 🔥 QUESTION 1 (VERY IMPORTANT)
import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);

  console.log("Render", count);

  const handleClick = () => {
    setCount(count + 1);

    console.log("A", count);

    setTimeout(() => {
      console.log("B", count);
    }, 0);
  };

  return <button onClick={handleClick}>Click</button>;
}
//Q1:-1st render jab initial:-Render,0jab button click hua thik handle click function action gya A,0 B,0 A,1 Because setimeout rember old value
//Q2:-Render,0 Effect ,0 Effect,1
//Q3.1,2,3
//Q4.cleanup pehle bad mai console cleanup,effect

import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("Render", count);

  const handleClick = () => {
    console.log("A", count);

    setCount(count + 1);
    setCount(count + 1);

    console.log("B", count);
  };

  return <button onClick={handleClick}>Click</button>;
}
//Render,0 A,0 B,0
//THEN CLICK:-A,0 AB SETCOUNT+1 DO BAR SO SETCOUT(1)ABHI TURANT UPDATE NHI HOGA B,0 AFTER CLICK RE-RENDER RENDER,1

