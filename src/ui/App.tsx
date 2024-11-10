import { useMemo } from "react";
import { useStatistics } from "../hooks/useStatistics";
import "./App.css";
import BaseChart from "./components/BaseChart";
import Chart from "./components/Chart";

function App() {
  const statistics = useStatistics(10);

  const cpuUsage = useMemo(
    () => statistics.map((stat) => ({ value: parseFloat(stat.dynamicData.cpuUsage) })),
    [statistics]
  );

  console.log("CPU Usage Data:", cpuUsage); // For debugging

  return (
    <div className="App">
      <div style={{ height: 120 }}>
        <Chart data={cpuUsage} />
      </div>
    </div>
  );
}

export default App;
