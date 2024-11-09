import { useStatistics } from "../hooks/useStatistics";
import "./App.css";
import BaseChart from "./components/BaseChart";

function App() {
  // useStatistics will have a data point count of 10 by default
  const statistics = useStatistics(10);
  console.log(statistics);

  return (
    <div className="App">
      <div style={{ height: 120 }}>
        <BaseChart data={[{ value: 25 }, { value: 30 }, { value: 35 }]}></BaseChart>
      </div>
    </div>
  );
}

export default App;
