import path from "path";
import { app } from "electron";
import { isDev } from "./utils/utils.js";

export function getPreloadPath() {
  console.log("Preload path:", path.join(app.getAppPath(), isDev() ? "." : "..", "/dist-electron/preload.cjs"));
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/dist-electron/preload.cjs");
}

export function getUIPath() {
  return path.join(app.getAppPath(), "/dist-react/index.html");
}
