import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "../pathResolver.js";
import { pathToFileURL } from "url";

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
  ipcMain.handle(key, async (event) => {
    validateEventFrame(event.senderFrame);
    // await handler result is fully resolved before returning.
    return await handler();
  });
}

// ipcMainHandle variant for handling "on" events /w payloads
export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => void,
) {
  ipcMain.on(key, (event, payload) => {
    validateEventFrame(event.senderFrame);
    return handler(payload);
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

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious event received!");
  }
}
