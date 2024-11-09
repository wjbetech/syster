import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number): Statistics[] {
  const [statValues, setStatValues] = useState<Statistics[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) =>
      setStatValues((prevStats) => {
        const newData = [...prevStats, stats];
        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      })
    );
    return unsub;
  }, [dataPointCount]);

  return statValues;
}
