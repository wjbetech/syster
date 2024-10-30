import { app, BrowserWindow } from "electron";
// full OS support via path
import path from "path";
import { isDev } from "./utils/utils.js";

app.on("ready", () => {
  // settings for syster electron window
  const window = new BrowserWindow({
    width: 800,
    title: "Syster",
    resizable: true,
    center: true,
    autoHideMenuBar: true,
    backgroundColor: "#aaa",
    roundedCorners: true,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // dev vs prod toggle
  const mainWindow = new BrowserWindow({});
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  window.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
});
