import { useMemo } from "react";
import { useStatistics } from "../hooks/useStatistics";
import "./App.css";
import BaseChart from "./components/BaseChart";
import Chart from "./components/Chart";

function App() {
  // useStatistics will have a data point count of 10 by default
  const statistics = useStatistics(10);

  // Convert cpuUsage to an array of objects with a `value` property
  // otherwise array of strings breaks the data
  const cpuUsage = useMemo(
    () => statistics.map((stat) => ({ value: parseFloat(stat.dynamicData.cpuUsage) })),
    [statistics]
  );

  return (
    <div className="App">
      <div style={{ height: 120 }}>
        <Chart data={cpuUsage} />
      </div>
      <div style={{ height: 120 }}>
        <BaseChart data={[{ value: 25 }, { value: 30 }, { value: 35 }]}></BaseChart>
      </div>
    </div>
  );
}

export default App;
