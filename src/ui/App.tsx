import { useEffect } from "react";
import "./App.css";

function App() {
  // ! empty dependency guarantees only run on initial render
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.electron.subscribeStatistics((stats) => console.log(stats));
  }, []);

  return (
    <>
      <h1>hello world!</h1>
    </>
  );
}

export default App;
