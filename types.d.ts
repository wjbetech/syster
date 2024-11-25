type Unsubscribe = () => void;

type Statistics = {
  staticData: {
    cpuPlatform: string;
    coreCount: number;
    cpuModel: string;
  };
  dynamicData: {
    totalMem: number;
    freeMemPercent: number;
    cpuUsage: number;
  };
};

type View = "CPU" | "RAM" | "Storage" | "Theme" | "Apps";

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => Unsubscribe;
    getStaticData: () => Promise<{
      cpuPlatform: string;
      coreCount: number;
      cpuModel: string;
    }>;
    getStatistics: () => Promise<Statistics>;
    subscribeChangeView: (callback: (view: View) => void) => Unsubscribe;
  };
}

// map payloads to ensure consistent IPC-bus type safety
type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: {
    cpuPlatform: string;
    coreCount: number;
    cpuModel: string;
  };
  changeView: View;
};
