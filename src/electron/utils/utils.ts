import { ipcMain, WebContents } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}
// when running in development, execute to true
// feature toggle different tools for dev vs prod
// e.g. vite hot-reload in dev, prebuilt for prod.

// helper func to typesafely communicate between main and renderer.
// allows the renderer to request "statistics"" safely from the main process.
export async function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  // allow handler to return a Promise to ensure async compatibility.
  handler: () => EventPayloadMapping[Key] | Promise<EventPayloadMapping[Key]>
) {
  ipcMain.handle(key, async () => {
    // await handler result is fully resolved before returning.
    return await handler();
  });
}

// allow main process to push data directly to renderer,
// it can update the UI without waiting for renderer to ask.
export async function ipcSendWebContents<Key extends keyof EventPayloadMapping>(
  key: Key,
  // webContents represents the window or tab in the renderer that receives data.
  webContents: WebContents,
  payload: EventPayloadMapping[Key] | Promise<EventPayloadMapping[Key]>
) {
  webContents.send(key, payload);
}
