type Statistics = {
  staticData: {
    cpuPlatform: string;
    coreCount: string;
    cpuModel: string;
  };
  dynamicData: {
    freeMem: string;
    totalMem: string;
    freeMemPercent: string;
    cpuUsage: string;
  };
};

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<{ cpuPlatform: string; coreCount: string; cpuModel: string }>;
    getStatistics: () => Promise<Statistics>; // Add this line to define getStatistics
  };
}

// map payloads to ensure consistent IPC-bus type safety
type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: {
    cpuPlatform: string;
    coreCount: string;
    cpuModel: string;
  };
};
