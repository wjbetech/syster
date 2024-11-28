import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "../hooks/useStatistics";
import Chart from "./components/Chart";

function App() {
  // const [views, setViews] = useState<View[]>([
  //   "CPU",
  //   "RAM",
  //   "Storage",
  //   "Theme",
  //   "Apps",
  // ]);
  const [staticData, setStaticData] = useState({
    cpuPlatform: "",
    coreCount: 0,
    cpuModel: "",
  });

  const statistics = useStatistics(10);

  const cpuUsage = useMemo(
    () => statistics.map((stat) => ({ value: stat.dynamicData.cpuUsage })),
    [statistics]
  );

  const ramUsage = useMemo(
    () =>
      statistics.map((stat) => ({
        value: 100 - stat.dynamicData.freeMemPercent,
      })),
    [statistics]
  );

  useEffect(() => {
    // Fetch static data on initial app load
    (async () => {
      const staticData = await window.electron.getStaticData();
      setStaticData(staticData);
    })();
  }, []);

  return (
    <div className="App">
      <div>
        <header>
          <button id="minimize" onClick={() => window.electron.sendFrameAction("MINIMIZE")}>-</button>
          <button id="maximize" onClick={() => window.electron.sendFrameAction("MAXIMIZE")}>+</button>
          <button id="close" onClick={() => window.electron.sendFrameAction("CLOSE")}>X</button>
        </header>
        <section>
          <h3>Syster</h3>
          <p>
            <span className="subheader">Platform: </span>{staticData.cpuPlatform === "win32" ? "Windows" : "Unknown"}
          </p>
          <p><span className="subheader">CPU Model: </span>{staticData.cpuModel}</p>
          <p><span className="subheader">Core Count: </span>{staticData.coreCount}</p>
        </section>
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
