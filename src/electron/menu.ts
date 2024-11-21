import { app, BrowserWindow, Menu } from "electron";
import { ipcSendWebContents, isDev } from "./utils/utils.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === "darwin" ? undefined : "Menu",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: () => app.quit()
          }
        ]
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            click: () => {
              ipcSendWebContents("changeView", mainWindow.webContents, "CPU");
            }
          },
          {
            label: "RAM",
            click: () => {
              ipcSendWebContents("changeView", mainWindow.webContents, "RAM");
            }
          },
          {
            label: "Storage",
            click: () => {
              ipcSendWebContents("changeView", mainWindow.webContents, "Storage");
            }
          },
          {
            label: "Desktop Theme",
            click: () => {
              ipcSendWebContents("changeView", mainWindow.webContents, "Theme");
            }
          },
          {
            label: "Applications",
            click: () => {
              ipcSendWebContents("changeView", mainWindow.webContents, "Apps");
            }
          }
        ]
      },
      {
        label: "Development",
        type: "submenu",
        submenu: [
          {
            label: "Developer Tools",
            click: () => {
              mainWindow.webContents.toggleDevTools();
            }
          }
        ],
        visible: isDev()
      }
    ])
  );
}
