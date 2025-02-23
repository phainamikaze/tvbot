const sqlite3 = require("sqlite3");
const path = require("path");
const database = new sqlite3.Database(
  path.join(__dirname, "tvbot.db"),
  (err) => {
    if (err) console.error("Database opening error: ", err);
  }
);

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS userconfig (
      key VERCHAR(255) PRIMARY KEY,
      value TEXT NOT NULL
    );`);

  database.run(`
    CREATE TABLE IF NOT EXISTS taskqueue (
      id VERCHAR(255) PRIMARY KEY,
      min INTEGER NULL,
      max INTEGER NULL,
      interval INTEGER NULL,
      lastrun INTEGER NULL,
      enabled INTEGER NOT NULL, -- 1 ใช้งาน 0 ไม่ใช้งาน
      sort INTEGER NOT NULL, -- เรียง
      ptype VERCHAR(255) NOT NULL, -- ordertroop, build1, build2
      params TEXT
    );
  `);
  // database.run(
  //   `INSERT INTO "taskqueue" ("id", "min", "max", "interval", "lastrun", "enabled", "sort", "ptype", "params") VALUES ('1', '5000', '10000', '0', '0', '1', '1', 'ordertroop', '{"newdid":"1213123","gid":"20","troop":"t1","amount":"10"}');`
  // );
});

module.exports = database;
