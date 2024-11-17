import { app, Menu } from "electron";

export function createMenu() {
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
            label: "Hardware Information"
          },
          {
            label: "Desktop Theme"
          },
          {
            label: "Applications"
          }
        ]
      }
    ])
  );
}
