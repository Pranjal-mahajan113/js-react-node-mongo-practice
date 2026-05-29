import { useState, useEffect } from "react";

function Timer({ id }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("Effect runs, id:", id);
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      console.log("Cleanup runs, id:", id);
      clearInterval(interval);
    };
  }, [id]);

  return <div>{seconds}</div>;
}

function App() {
  const [id, setId] = useState(1);

  return (
    <button onClick={() => setId(2)}>
      Change ID
    </button>
  );
}

//Timer component ko id prop mil raha hai App se
//const [id, setId] = useState(1);
// id = 1 initially
// Timer component render hoga id=1 ke saath
//App start pe id ki value kya hai?→ 1
//to useeefect print hoga->Effect runs, id: 1
//Ab Part 2 socho:
//Button click hota hai — id changes 1 → 2
//React ka order hota hai:
//1. Re-render happens
//2. OLD effect cleanup runs   ← id=1 ki cleanup
//3. NEW effect runs           ← id=2 ka effect

//to output click=>
//Cleanup runs, id: 1    ← old effect cleanup pehle
//Effect runs, id: 2     ← new effect baad mein    

// ✅ Complete Answer:
// App Start:
// Effect runs, id: 1
// Button Clicked (id: 1 → 2):
// Cleanup runs, id: 1    ← old effect cleanup pehle
// Effect runs, id: 2     ← new effect baad mein