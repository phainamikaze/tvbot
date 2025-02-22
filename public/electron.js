const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const sqlite3 = require("sqlite3");

const ordertroop = require("./components/ordertroop");
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

const database = new sqlite3.Database("./public/tvbot.db", (err) => {
  if (err) console.error("Database opening error: ", err);
});

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS userconfig (
      key VERCHAR(255) PRIMARY KEY,
      value TEXT NOT NULL
    );`);

  database.run(`
    CREATE TABLE IF NOT EXISTS intervalconfig (
      key VERCHAR(255) PRIMARY KEY,
      min INTEGER NOT NULL,
      max INTEGER NOT NULL
    );`);

  database.run(`
    CREATE TABLE IF NOT EXISTS q_ordertroop (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enabled INTEGER NOT NULL, -- 1 ใช้งาน 0 ไม่ใช้งาน
      sort INTEGER NOT NULL, -- เรียง
      newdid  VERCHAR(255) NOT NULL, -- หมู่บ้าน
      gid INTEGER NOT NULL, -- 20 โรงม้า  19 ค่าย 21 ห้องเครื่อง
      tid INTEGER NOT NULL, -- t1 t2 t3 t4 t5 t6 t7 t8
      amount INTEGER NOT NULL -- จำนวน
    );
    
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      interval INTEGER NOT NULL,  -- หน่วยเป็นวินาที
      script TEXT NOT NULL
    );
  `);
});

const intervalConfig = [
  {
    key: "ordertroop",
    min: 50000,
    max: 100000,
  },
  {
    key: "task2",
    min: 300000,
    max: 600000,
  },
  {
    key: "task3",
    min: 500000,
    max: 5500000,
  },
];
// ====================================
// run components
const runComponents = async (db, componentKey) => {
  if (componentKey === "ordertroop") {
    await ordertroop(db);
  }
};
// run components
// ====================================

// ====================================
// random interval
var intervalState = {};
const randomIntervalEachQueue = async (e) => {
  if (!intervalState[e.key]) {
    intervalState[e.key] = {
      interval: Math.floor(Math.random() * (e.max - e.min + 1)) + e.min,
      lastRun: 0,
    };
  } else {
    if (
      intervalState[e.key].lastRun + intervalState[e.key].interval <
      Date.now()
    ) {
      const interval = intervalState[e.key].interval;
      intervalState[e.key].lastRun = Date.now();
      intervalState[e.key].interval =
        Math.floor(Math.random() * (e.max - e.min + 1)) + e.min;
      console.log(new Date(), "run queue", e.key, interval);
      await runComponents(database, e.key);
    }
  }
};
setInterval(async () => {
  for (let el of intervalConfig) {
    await randomIntervalEachQueue(el);
  }
}, 1000);
// random interval
// ====================================

ipcMain.on("send-db-run", (event, command, arg) => {
  database.all(command, [...arg], (err, rows) => {
    event.reply("reply-db-run", (err && err.message) || rows);
  });
});
