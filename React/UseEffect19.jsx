//Q1.
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("A", count);

  useEffect(() => {
    console.log("B", count);
  }, []);

  return <button onClick={() => setCount(count + 1)}>Click</button>;
}
//Initial-->A,0 ab first bar to render hua thik ab useEffect chla->B,0 ab click kiya->A,1

//Q2.
useEffect(() => {
  console.log("Effect", count);
  setCount(count + 1);
}, []);
//Effect 0

