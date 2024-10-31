import { app, BrowserWindow } from "electron";
// full OS support via path
import path from "path";
import { isDev } from "./utils/utils.js";
import { pollResources } from "./utils/resourceManager.js";
import { getStorageData } from "./utils/diskManager.js";

app.on("ready", () => {
  // dev vs prod toggle
  const mainWindow = new BrowserWindow({});
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources();
  getStorageData();
});
