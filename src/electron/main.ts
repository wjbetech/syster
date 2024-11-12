import { app, BrowserWindow, Tray } from "electron";
import { ipcMainHandle, isDev } from "./utils/utils.js";
import { getDynamicData, getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import path from "path";
// import { getStorageData } from "./utils/diskManager.js";

app.on("ready", () => {
  // dev vs prod toggle
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath()
    }
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("statistics", async () => {
    return {
      staticData: getStaticData(),
      dynamicData: await getDynamicData()
    };
  });

  new Tray(path.join(getAssetPath(), process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"));

  mainWindow.on("close", (event) => {
    event.preventDefault();
  });
});
