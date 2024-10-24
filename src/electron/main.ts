import { app, BrowserWindow } from "electron";
// full OS support via path
import path from "path";

app.on("ready", () => {
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
  window.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
});
