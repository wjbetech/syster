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

type FrameWindowAction = "CLOSE" | "MINIMIZE" | "MAXIMIZE"

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
    sendFrameAction: (action: FrameWindowAction) => void;
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
  sendFrameAction: FrameWindowAction;
};
