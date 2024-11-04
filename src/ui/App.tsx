import "./App.css";

function App() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.electron.getStaticData();

  return (
    <>
      <h1>hello world!</h1>
    </>
  );
}

export default App;
