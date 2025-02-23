const { utilityProcess } = require("electron");
const path = require("path");
const ordertroop = async (db) => {
  const ordertroop = utilityProcess.fork(
    path.join(__dirname, "process/ordertroop/child.js")
  );
};
module.exports = ordertroop;
