import { expect, test, vi } from "vitest";
import { createTray } from "./tray.js";
import { BrowserWindow, Menu } from "electron";
import path from "path";
import { getAssetPath } from "./pathResolver.js";

// mock
vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
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

test("", () => {
  createTray(mainWindow);
  expect(Menu.buildFromTemplate).toHaveBeenCalled();
});
