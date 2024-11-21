const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: Statistics) => void) => {
    ipcOn("statistics", (stats) => {
      callback(stats);
    });
  },
  subscribeChangeView: (callback: (view: View) => void) => {
    ipcOn("changeView", (stats) => {
      callback(stats);
    });
  },
  getStatistics: () => ipcInvoke("statistics")
});

// the "main world" is the JS context that your main renderer('backend') code runs in
// exposeInMainWorld takes an apiKey and api.
// apiKey to inject onto window with, accessible on window[apiKey].
// api is a a func, piece of data or object.

export function ipcInvoke<Key extends keyof EventPayloadMapping>(key: Key): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

export function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cbHelperFunc = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cbHelperFunc);
  return () => electron.ipcRenderer.off(key, cbHelperFunc);
}
