import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("A", count);

  const handleClick = () => {
    console.log("B", count);

    setCount(count + 1);

    console.log("C", count);

    setCount((prev) => prev + 1);

    console.log("D", count);
  };

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
//My output:-A,0
//B,O
//C,1
//D,2

