import { ipcMain } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

// when running in development, execute to true
// feature toggle different tools for dev vs prod
// e.g. vite hot-reload in dev, prebuilt for prod

export async function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  // allow handler to return a Promise to ensure async compatibility
  handler: () => EventPayloadMapping[Key] | Promise<EventPayloadMapping[Key]>
) {
  ipcMain.handle(key, async () => {
    // await handler result is fully resolved before returning
    return await handler();
  });
}

// ipcHandle("statistics")
