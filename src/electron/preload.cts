const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  // create a bi-directional sync bridge across contexts
  subscribeStatistics: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (event, stats) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData")
});

// the "main world" is the JS context that your main renderer('backend') code runs in
// exposeInMainWorld takes an apiKey and api
// apiKey to inject onto window with, accessible on window[apiKey]
// api is a a func, piece of data or object
