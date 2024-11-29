import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "../hooks/useStatistics";
import Chart from "./components/Chart";
import minimizeSymbol from "../assets/material-icon-minimize.png";
import expandSymbol from "../assets/material-icon-expand.png";
import closeSymbol from "../assets/material-icon-close.png";

function App() {
  // views all default to true(on) by default
  const [views, setViews] = useState({
    system: true,
    cpuUsage: true,
    ramUsage: true,
  });

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

  // fetch static data once on initial app load
  useEffect(() => {
    (async () => {
      const staticData = await window.electron.getStaticData();
      setStaticData(staticData);
    })();
  }, []);

  // toggle visibility of specific elements
  const handleClick = (view: keyof typeof views) => {
    setViews((prevViews) => ({
      ...prevViews,
      [view]: !prevViews[view],
    }));
  };

  return (
    <div className="App p-4">
      <div>
        {/* header bar with minimize, maximize and close buttons */}
        <header className="flex flex-row justify-between absolute top-0 left-0 w-full items-center p-2 box-border bg-gray-900">
          <h1 className="font-bold text-2xl">Syster</h1>
          <div className="flex flex-row gap-1">
            <button
              id="minimize"
              onClick={() => window.electron.sendFrameAction("MINIMIZE")}
              className="bg-yellow-600 rounded-sm"
            >
              <img className="size-8" src={minimizeSymbol} alt="" />
            </button>
            <button
              id="maximize"
              onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
              className="bg-green-600 rounded-sm"
            >
              <img className="size-8" src={expandSymbol} alt="" />
            </button>
            <button
              id="close"
              onClick={() => window.electron.sendFrameAction("CLOSE")}
              className="bg-red-600 rounded-sm"
            >
              <img className="size-8" src={closeSymbol} alt="" />
            </button>
          </div>
        </header>

        {/* system info (platform, CPU model, cores) */}
        <section>
          <h4
            onClick={() => handleClick("system")}
            className="font-bold cursor-pointer"
          >
            System{" "}
          </h4>
          {views.system && (
            <div id="system" className="text-sm">
              <p>
                <span className="subheader">Platform: </span>
                {staticData.cpuPlatform === "win32" ? "Windows" : "Unknown"}
              </p>
              <p>
                <span className="subheader">CPU Model: </span>
                {staticData.cpuModel}
              </p>
              <p>
                <span className="subheader">Core Count: </span>
                {staticData.coreCount}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Toggle CPU usage chart */}
      <div style={{ height: 160 }}>
        <h4 id="chart-header-cpu" onClick={() => handleClick("cpuUsage")}>
          CPU Usage
        </h4>
        {views.cpuUsage && <Chart data={cpuUsage} maxDataPoints={10} />}
      </div>

      {/* Toggle RAM usage chart */}
      <div style={{ height: 120 }}>
        <h4 id="chart-header-ram" onClick={() => handleClick("ramUsage")}>
          RAM Usage
        </h4>
        {views.ramUsage && <Chart data={ramUsage} maxDataPoints={10} />}
      </div>
    </div>
  );
}

export default App;
