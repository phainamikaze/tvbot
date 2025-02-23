const { utilityProcess } = require("electron");
const path = require("path");
const main = async (task) => {
  return new Promise((resolve, reject) => {
    const child = utilityProcess.fork(
      path.join(__dirname, "process/ordertroop/child.js")
    );
    child.on("spawn", () => {
      console.log(child.pid);
    });

    child.on("exit", () => {
      console.log(child.pid);
    });
  });
};
module.exports = main;
