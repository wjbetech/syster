import osUtils from "os-utils";
import os from "os";
import { BrowserWindow } from "electron";
import { ipcSendWebContents } from "./utils/utils.js";

// interval for gathering dynamic data
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    // grab static CPU data
    const staticData = getStaticData();
    const dynamicData = await getDynamicData();
    ipcSendWebContents("statistics", mainWindow.webContents, {
      staticData,
      dynamicData
    });
  }, POLLING_INTERVAL);
}

// static data
export function getStaticData() {
  return {
    cpuPlatform: `${osUtils.platform()}`,
    coreCount: osUtils.cpuCount(),
    cpuModel: `${os.cpus()[0].model}`
  };
}

// dynamic data
export async function getDynamicData() {
  // RAM
  const totalMem = Number(osUtils.totalmem() / 1024);
  const freeMem = (totalMem / 1024) * osUtils.freemem();
  const freeMemPercent = Math.floor(Number(osUtils.freememPercentage().toPrecision(1)) * 100);

  // CPU
  const cpuUsage: number = await new Promise((resolve) => {
    osUtils.cpuUsage((percentage) => {
      resolve(Number(percentage * 100));
    });
  });
  return { freeMem, totalMem, freeMemPercent, cpuUsage };
}
