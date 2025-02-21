const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const sqlite3 = require("sqlite3");

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
    );
    
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      interval INTEGER NOT NULL,  -- หน่วยเป็นวินาที
      script TEXT NOT NULL
    );
  `);
});

setInterval(() => {
  database.all("SELECT * FROM tasks", (err, rows) => {
    if (err) console.error("Database opening error: ", err);
    else console.log(rows);
  });
}, 5000);

ipcMain.on("send-db-run", (event, command, arg) => {
  database.all(command, [...arg], (err, rows) => {
    event.reply("reply-db-run", (err && err.message) || rows);
  });
});
