import osUtils from "os-utils";
import os from "os";
import { BrowserWindow } from "electron";

// interval for gathering dynamic data
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    // grab static CPU data
    const staticData = getStaticCpuInfo();
    const dynamicData = await getDynamicInfo();
    mainWindow.webContents.send("statistics", {
      staticData,
      dynamicData
    });
  }, POLLING_INTERVAL);
}

// static data
function getStaticCpuInfo() {
  // CPU
  const cpuPlatform = `System Platform: ${osUtils.platform()}`;
  const coreCount = `Thread Count : ${osUtils.cpuCount().toFixed(0)}`;
  const cpuModel = `CPU Model: ${os.cpus()[0].model}`;
  // console.log(cpuPlatform + `\n` + cpuModel + `\n` + coreCount + `\n` + `-----------------------`);
  return { cpuPlatform, coreCount, cpuModel };
}

// dynamic data
async function getDynamicInfo() {
  // RAM
  const totalMem = `${(osUtils.totalmem() / 1024).toFixed(1)}GB`;
  const freeMem = `${(osUtils.freemem() / 1024).toFixed(1)}GB`;
  const freeMemPercent = `${Math.floor(Number(osUtils.freememPercentage().toPrecision(1)) * 100)}%`;

  // CPU
  const cpuUsage = await new Promise((resolve) => {
    osUtils.cpuUsage((percentage) => {
      resolve(`${Number(percentage.toFixed(1)) * 100}%`);
    });
  });
  return { freeMem, totalMem, freeMemPercent, cpuUsage };
}