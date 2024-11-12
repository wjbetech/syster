import { useMemo } from "react";
import { useStatistics } from "../hooks/useStatistics";
import "./App.css";
import Chart from "./components/Chart";

function App() {
  const statistics = useStatistics(10);

  const cpuUsage = useMemo(() => statistics.map((stat) => ({ value: stat.dynamicData.cpuUsage })), [statistics]);

  const ramUsage = useMemo(() => statistics.map((stat) => ({ value: stat.dynamicData.freeMem })), [statistics]);

  // console.log("CPU Usage Data:", cpuUsage); // For debugging
  // console.log("RAM Usage Data:", ramUsage); // For debugging

  return (
    <div className="App">
      <div style={{ height: 160 }}>
        <span>CPU Usage:</span>
        <Chart
          data={cpuUsage}
          maxDataPoints={10}
        />
      </div>
      <div style={{ height: 120 }}>
        <span>RAM Usage:</span>
        <Chart
          data={ramUsage}
          maxDataPoints={10}
        />
      </div>
    </div>
  );
}

export default App;
