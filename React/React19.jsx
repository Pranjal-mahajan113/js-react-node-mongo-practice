//Q1
import { useEffect, useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);

  console.log("Render", count);

  useEffect(() => {
    console.log("Effect", count);

    if (count < 2) {
      setCount(count + 1);
    }
  }, [count]);

  return <div>{count}</div>;
}
//Render ,0
//Effect,0
//mujhe nhi smj aa rha concept aek bar smjha baht confused ho rha aese questions

//q2
import { useState } from "react";
function Child() {
  console.log("Child Render");
  return <h1>Child</h1>;
}
export default function App() {
  const [count, setCount] = useState(0);
  console.log("Parent Render");
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
      <Child />
    </>
  );
}
//Parent Render
//click->parent render,parender render
//chlid render

//Q3
import { useEffect, useRef } from "react";
export default function App() {
  const countRef = useRef(0);
  console.log("Render", countRef.current);
  useEffect(() => {
    countRef.current += 1;
    console.log("Effect", countRef.current);
  });

  return <div>Hello</div>;
}
//Render,0
//Effect,0 
//Q4.
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState({ name: "Rahul" });

  useEffect(() => {
    console.log("Effect");
  }, [user]);

  return (
    <button
      onClick={() => {
        setUser({ name: "Rahul" });
      }}
    >
      Click
    </button>
  );
}
//NHI smj aa rha🥺