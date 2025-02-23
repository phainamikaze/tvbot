const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const database = require("./db");
const taskqueue = require("./taskqueue");

const isDev = process.env.NODE_ENV !== "production";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

const intervalConfig = [
  {
    id: 1,
    min: 50000,
    max: 100000,
    interval: 0,
    lastrun: 0,
    enabled: true,
    sort: 1,
    ptype: "ordertroop",
    params: JSON.stringify({
      newdid: "1213123",
      gid: "20",
      troop: "t1",
      amount: "10",
    }),
  },
];
// // ====================================
// // run components
// const runComponents = async (db, componentKey) => {
//   if (componentKey === "ordertroop") {
//     await ordertroop(db);
//   }
// };
// // run components
// // ====================================

// // ====================================
// // interval
// var intervalState = {};
// const randomIntervalEachQueue = async (e) => {
//   if (!intervalState[e.key]) {
//     intervalState[e.key] = {
//       interval: Math.floor(Math.random() * (e.max - e.min + 1)) + e.min,
//       lastRun: 0,
//     };
//   } else {
//     if (
//       intervalState[e.key].lastRun + intervalState[e.key].interval <
//       Date.now()
//     ) {
//       const interval = intervalState[e.key].interval;
//       intervalState[e.key].lastRun = Date.now();
//       intervalState[e.key].interval =
//         Math.floor(Math.random() * (e.max - e.min + 1)) + e.min;
//       console.log(new Date(), "run queue", e.key, interval);
//       await runComponents(database, e.key);
//     }
//   }
// };
setInterval(async () => {
  database.all("SELECT * FROM taskqueue WHERE enabled = 1", [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      taskqueue(database, rows);
    }
  });
}, 1000);
// interval
// ====================================

ipcMain.on("send-db-run", (event, command, arg) => {
  database.all(command, [...arg], (err, rows) => {
    event.reply("reply-db-run", (err && err.message) || rows);
  });
});
