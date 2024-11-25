import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "../hooks/useStatistics";
import Chart from "./components/Chart";

function App() {
  const statistics = useStatistics(10);
  const [staticData, setStaticData] = useState({
    cpuPlatform: "",
    coreCount: 0,
    cpuModel: "",
  });

  const cpuUsage = useMemo(
    () => statistics.map((stat) => ({ value: stat.dynamicData.cpuUsage })),
    [statistics]
  );

  const ramUsage = useMemo(
    () =>
      statistics.map((stat) => ({
        value: 100 - stat.dynamicData.freeMemPercent, // Calculate % used
      })),
    [statistics]
  );

  useEffect(() => {
    // Fetch static data on app load
    (async () => {
      const staticData = await window.electron.getStaticData();
      setStaticData(staticData);
    })();
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Computer:</h2>
        <p>
          Platform: {staticData.cpuPlatform === "win32" ? "Windows" : "Unknown"}
        </p>
        <p>CPU Model: {staticData.cpuModel}</p>
        <p>Core Count: {staticData.coreCount}</p>
      </div>
      <div style={{ height: 160 }}>
        <span>CPU Usage:</span>
        <Chart data={cpuUsage} maxDataPoints={10} />
      </div>
      <div style={{ height: 120 }}>
        <span>RAM Usage:</span>
        <Chart data={ramUsage} maxDataPoints={10} />
      </div>
    </div>
  );
}

export default App;
