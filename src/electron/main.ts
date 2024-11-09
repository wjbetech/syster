import { app, BrowserWindow } from "electron";
// full OS support via path
import path from "path";
import { ipcHandle, isDev } from "./utils/utils.js";
import { getDynamicData, getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
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
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  ipcHandle("statistics", async () => {
    return {
      staticData: getStaticData(),
      dynamicData: await getDynamicData()
    };
  });
});
