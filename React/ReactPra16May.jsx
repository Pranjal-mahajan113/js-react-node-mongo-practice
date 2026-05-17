// ============================================================================
// ⚛️ REACT RENDERING + STATE + useEffect PRACTICE — 16 MAY 2026
// ============================================================================



// 🟦 Q1 — useState + Batching ================================================

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

  return <button onClick={handleClick}>Click</button>;
}

/*

✅ OUTPUT:

Initial Render:
A 0

After Click:
B 0
C 0
D 0

Re-render:
A 2

❌ MY MISTAKE:

I thought:
setCount immediately updates state

❌ Wrong.

React state updates are:
✔ async
✔ batched

So during SAME render cycle:

count still remains:
0

Execution:

setCount(count + 1)
→ schedules count = 1

setCount((prev) => prev + 1)
→ uses latest queued value
→ 1 + 1 = 2

Final state:
2

📘 LEARNED:

❌ setState updates immediately
✅ React schedules updates for next render

📘 IMPORTANT:

Functional update:

setCount((prev) => prev + 1)

always receives latest queued state.

*/



// 🟦 Q2 — useEffect + Cleanup ================================================

import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState(0);

  console.log("A");

  useEffect(() => {
    console.log("B", value);

    return () => {
      console.log("C", value);
    };
  }, [value]);

  return (
    <button onClick={() => setValue(value + 1)}>
      Click
    </button>
  );
}

/*

✅ OUTPUT:

Initial Render:
A
B 0

First Click:
A
C 0
B 1

Second Click:
A
C 1
B 2

❌ MY FIRST MISTAKE:

I thought cleanup runs immediately
after first render.

❌ Wrong.

Cleanup runs:
✔ before next effect
✔ OR on unmount

📘 REAL FLOW:

Initial:
Render → Effect

State Change:
Render
→ OLD cleanup
→ NEW effect

📘 LEARNED:

useEffect lifecycle:

Render
→ Effect

Next Render
→ Cleanup(old effect)
→ New Effect

*/



// 🟦 Q3 — setTimeout + Stale Closure =========================================

import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      console.log("A", count);
    }, 0);

    setCount(count + 1);

    console.log("B", count);
  };

  console.log("C", count);

  return <button onClick={handleClick}>Click</button>;
}

/*

✅ OUTPUT:

Initial Render:
C 0

After Click:
B 0

Re-render:
C 1

Timer:
A 0

❌ MY MISTAKE:

I thought:
after setCount,
render still shows old state.

❌ Wrong.

setCount triggers re-render.

BUT:

setTimeout callback remembers
OLD closure value.

📘 IMPORTANT:

Inside timeout:

count = 0

because closure captured
old render state.

📘 LEARNED:

React state updates:
✔ trigger re-render

BUT async callbacks may keep
old state values (stale closure).

*/



// 🟦 Q4 — useEffect([]) ================================================

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  console.log("Render");

  useEffect(() => {
    console.log("Effect");

    setData([1, 2]);

    return () => {
      console.log("Cleanup");
    };
  }, []);

  return <div>{data.length}</div>;
}

/*

✅ OUTPUT:

Render
Effect
Render

❌ MY MISTAKE:

I thought:
Effect runs again after re-render

❌ Wrong.

Dependency array:
[]

means:

✔ run ONLY once after mount

Flow:

Initial Render:
Render

After paint:
Effect

setData triggers re-render:
Render

DONE

📘 LEARNED:

useEffect([]):

✔ runs once on mount
✔ cleanup on unmount

❌ does NOT run on every render

*/