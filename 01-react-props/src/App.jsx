import { useState } from "react";
import Parent1 from "./components/Parent1";

function App() {
  const [name, setName] = useState("");

  useState(() => {
    setName("Pojok Code");
  });
  return (
    <>
      <h1>Hello World</h1>
      <Parent1 name={name} />
    </>
  );
}

export default App;
