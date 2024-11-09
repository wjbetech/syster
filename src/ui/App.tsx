import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) => console.log(stats));
    return unsub;
  }, []);

  return (
    <>
      <h1>hello world!</h1>
    </>
  );
}

export default App;
