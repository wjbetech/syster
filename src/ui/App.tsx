import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    window.electron.subscribeStatistics((stats) => console.log(stats));
  }, []);

  return (
    <>
      <h1>hello world!</h1>
    </>
  );
}

export default App;
