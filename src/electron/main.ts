import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./utils/utils.js";
import { getDynamicData, getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { handleCloseEvents } from "./closeEvents.js";
import { createMenu } from "./menu.js";
// import { getStorageData } from "./utils/diskManager.js";

// to hide the menu entirely, set:
// Menu.setApplicationMenu(null) /w Menu import
// comment out createMenu(mainWindow)

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

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});
