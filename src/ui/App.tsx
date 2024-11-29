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

  // render state for transitions
  const [isRendered, setIsRendered] = useState({
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

  // handle visibility of elements with delays for smooth transitions
  const handleClick = (view: keyof typeof views) => {
    if (views[view]) {
      setViews((prev) => ({
        ...prev,
        [view]: false,
      }));

      setTimeout(() => {
        setIsRendered((prev) => ({
          ...prev,
          [view]: false,
        }));
      }, 500);
    } else {
      setIsRendered((prev) => ({
        ...prev,
        [view]: true,
      }));
      setTimeout(() => {
        setViews((prev) => ({
          ...prev,
          [view]: true,
        }));
      }, 10);
    }
  };

  return (
    <div className="bg-slate-700 h-svh overflow-hidden p-2">
      <div>
        {/* header bar with minimize, maximize and close buttons */}
        <header className="flex flex-row justify-between absolute top-0 left-0 w-full items-center py-2 px-2 box-border bg-slate-800">
          <h1 className="font-bold text-xl">Syster</h1>
          <div className="flex flex-row">
            <button
              id="minimize"
              onClick={() => window.electron.sendFrameAction("MINIMIZE")}
              className="bg-yellow-600 rounded-sm scale-[0.80]"
            >
              <img className="size-8 scale-75" src={minimizeSymbol} alt="" />
            </button>
            <button
              id="maximize"
              onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
              className="bg-green-600 rounded-sm scale-[0.80]"
            >
              <img className="size-8 scale-75" src={expandSymbol} alt="" />
            </button>
            <button
              id="close"
              onClick={() => window.electron.sendFrameAction("CLOSE")}
              className="bg-red-600 rounded-sm scale-[0.80]"
            >
              <img className="size-8 scale-75" src={closeSymbol} alt="" />
            </button>
          </div>
        </header>

        {/* system info (platform, CPU model, cores) */}
        <section className="px-2 mt-12 mb-4">
          <h4
            onClick={() => handleClick("system")}
            className="font-bold cursor-pointer text-lg"
          >
            System{" "}
          </h4>
          {isRendered.system && (
            <div
              id="system"
              className={`transition-all duration-500 ease-in-out ${
                views.system ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="text-sm">
                <p>
                  <span className="text-slate-400 font-bold">Platform: </span>
                  {staticData.cpuPlatform === "win32"
                    ? "Windows"
                    : `${staticData.cpuPlatform}`}
                </p>
                <p>
                  <span className="text-slate-400 font-bold">CPU Model: </span>
                  {staticData.cpuModel}
                </p>
                <p>
                  <span className="text-slate-400 font-bold">Core Count: </span>
                  {staticData.coreCount}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Toggle CPU usage chart */}
      <div className="my-4">
        <h4
          id="chart-header-cpu"
          className="cursor-pointer mx-2 font-bold"
          onClick={() => handleClick("cpuUsage")}
        >
          CPU Usage
        </h4>
        {isRendered.cpuUsage && (
          <div
            className={`transition-all duration-500 ease-in-out ${
              views.cpuUsage ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <Chart data={cpuUsage} maxDataPoints={10} />
          </div>
        )}
      </div>

      {/* Toggle RAM usage chart */}
      <div className="my-4">
        <h4
          id="chart-header-ram"
          className="cursor-pointer mx-2 font-bold"
          onClick={() => handleClick("ramUsage")}
        >
          RAM Usage
        </h4>
        {isRendered.ramUsage && (
          <div
            className={`transition-all duration-500 ease-in-out ${
              views.ramUsage ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <Chart data={ramUsage} maxDataPoints={10} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
