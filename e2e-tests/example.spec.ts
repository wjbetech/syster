import { test, expect, _electron } from "@playwright/test";

let electronApp: Awaited<ReturnType<typeof _electron.launch>>;
let mainPage: Awaited<ReturnType<typeof electronApp.firstWindow>>;

async function waitForPreloadScript() {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const electronBridge = await mainPage.evaluate(() => {
        return (window as Window & { electron?: any }).electron;
      });
      if (electronBridge) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
}

// set up pre-testing dependencies
test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ["."],
    env: { NODE_ENV: "development" },
  });
  mainPage = await electronApp.firstWindow();
  await waitForPreloadScript();
});

test.afterEach(async () => {
  await electronApp.close();
});

test("custom header frame should minimize the main window", async () => {
  await mainPage.click("#minimize");
  const isMinimized = await electronApp.evaluate((electron) => {
    return electron.BrowserWindow.getAllWindows()[0].isMinimized();
  });
  expect(isMinimized).toBeTruthy();
});

test("custom header frame should maximize the main window", async () => {
  await mainPage.click("#maximize");
  const isMaximized = await electronApp.evaluate((electron) => {
    return electron.BrowserWindow.getAllWindows()[0].isMaximized();
  });
  expect(isMaximized).toBeTruthy();
});

test("custom header frame should close the main window but not exit the application", async () => {
  await mainPage.click("#close");
  const isWindowVisible = await electronApp.evaluate((electron) => {
    return electron.BrowserWindow.getAllWindows()[0].isVisible();
  });
  expect(isWindowVisible).toBeFalsy();
});
