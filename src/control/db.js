const { ipcRenderer } = window.require("electron");

export const dbQuery = (command, arg) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once("reply-db-run", (_, arg) => {
      if (Array.isArray(arg)) {
        resolve(arg);
      } else {
        reject(arg);
      }
    });
    ipcRenderer.send("send-db-run", command, arg);
  });
};
