const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: Statistics) => void) => {
    ipcOn("statistics", (stats) => {
      callback(stats);
    });
  },
  getStatistics: () => ipcInvoke("statistics") // Add this method to retrieve both static and dynamic data
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
  return electron.ipcRenderer.on(key, (_, payload) => callback(payload));
}
