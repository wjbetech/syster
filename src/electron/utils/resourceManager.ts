import osUtils from "os-utils";

const POLLING_INTERVAL = 500;

export function pollResources() {
  // grab static CPU data
  getStaticCpuInfo();

  // handle dynamic CPU data
  setInterval(() => {
    getDynamicInfo().then((info) => console.log(info));
  }, POLLING_INTERVAL);
}

// static data
function getStaticCpuInfo() {
  const cpuPlatform = `System Platform: ${osUtils.platform()}`;
  const coreCount = `Core Count : ${osUtils.cpuCount().toFixed(1)}`;
  console.log(cpuPlatform + `\n` + coreCount + `\n` + `-----------------------`);
  return { cpuPlatform, coreCount };
}

// dynamic data
async function getDynamicInfo() {
  // RAM
  const totalMem = `${osUtils.totalmem().toFixed(1)}MB`;
  const freeMem = `${osUtils.freemem().toFixed(1)}MB`;
  const freeMemPercent = `${Number(osUtils.freememPercentage().toPrecision(1)) * 100}%`;

  // CPU
  const cpuUsage = await new Promise((resolve) => {
    osUtils.cpuUsage((percentage) => {
      resolve(`${Number(percentage.toPrecision(1)) * 100}%`);
    });
  });
  return { freeMem, totalMem, freeMemPercent, cpuUsage };
}
