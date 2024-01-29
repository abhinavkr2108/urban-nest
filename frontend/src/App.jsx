import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <h1 className="text-green-500">Hello Vite + React</h1>
    </div>
  );
}

export default App;
