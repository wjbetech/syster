import { expect, Mock, test, vi } from "vitest";
import { createTray } from "./tray.js";
import { app, BrowserWindow, Menu } from "electron";

// mock
vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
      dock: {
        show: vi.fn(),
      },
      quit: vi.fn(),
    },
    Menu: {
      buildFromTemplate: vi.fn(),
    },
  };
});

// mock mainWindow to get functionality for testing
const mainWindow = {
  show: vi.fn(),
} satisfies Partial<BrowserWindow> as any as BrowserWindow;

test("Check for tray option (show, quit) /w functionality", () => {
  createTray(mainWindow);
  const calls = (Menu.buildFromTemplate as any as Mock).mock.calls;
  const args = calls[0] as Parameters<typeof Menu.buildFromTemplate>;
  const template = args[0];

  // ensure that the templated menu has the correct # of options
  expect(template).toHaveLength(2);

  // check the templated menu has the correct options
  expect(template[0].label).toEqual("Show");
  expect(template[1].label).toEqual("Quit");

  // menu option 1 "show"
  template[0]?.click?.(null as any, null as any, null as any);
  expect(mainWindow.show).toHaveBeenCalled();
  expect(app.dock.show).toHaveBeenCalled();

  // menu option 2 "quit"
  template[1]?.click?.(null as any, null as any, null as any);
  expect(app.quit).toHaveBeenCalled();
});
