import { app, BrowserWindow, ipcMain } from "electron";
import { ipcMainHandle, ipcMainOn, isDev } from "./utils/utils.js";
import {
  getDynamicData,
  getStaticData,
  pollResources,
} from "./resourceManager.js";
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
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: false,
    resizable: false,
    height: 500,
    width: 400,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMain.on("resize-window", (_, width, height) => {
    mainWindow?.setSize(width, height, true); // Dynamically set the window size
  });

  ipcMainHandle("statistics", async () => {
    return {
      staticData: getStaticData(),
      dynamicData: await getDynamicData(),
    };
  });

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
      case "MAXIMIZE":
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      default:
    }
  });

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});
