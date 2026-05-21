import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const savedata = () => {
    localStorage.setItem("username", name);
  };

  return (
    <>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onclick={savedata}>Save</button>
    </>
  );
}
