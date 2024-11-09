import osUtils from "os-utils";
import os from "os";
import { BrowserWindow } from "electron";

// interval for gathering dynamic data
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    // grab static CPU data
    const staticData = getStaticData();
    const dynamicData = await getDynamicData();
    mainWindow.webContents.send("statistics", {
      staticData,
      dynamicData
    });
  }, POLLING_INTERVAL);
}

// static data
export function getStaticData() {
  return {
    cpuPlatform: `${osUtils.platform()}`,
    coreCount: `${osUtils.cpuCount().toFixed(0)}`,
    cpuModel: `${os.cpus()[0].model}`
  };
}

// dynamic data
export async function getDynamicData() {
  // RAM
  const totalMem = `${(osUtils.totalmem() / 1024).toFixed(1)}GB`;
  const freeMem = `${(osUtils.freemem() / 1024).toFixed(1)}GB`;
  const freeMemPercent = `${Math.floor(Number(osUtils.freememPercentage().toPrecision(1)) * 100)}%`;

  // CPU
  const cpuUsage: string = await new Promise((resolve) => {
    osUtils.cpuUsage((percentage) => {
      resolve(`${String(Number(percentage.toFixed(1)) * 100)}%`);
    });
  });
  return { freeMem, totalMem, freeMemPercent, cpuUsage };
}
