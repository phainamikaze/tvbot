const { fork } = require("child_process");
const path = require("path");

// const { port1 } = new MessageChannelMain();

const main = async (task) => {
  return new Promise((resolve, reject) => {
    console.log("task in main process", task);
    const child = fork(path.join(__dirname, "child"));
    child.send("start");
    child.on("message", (message) => {
      console.log("child on message", message);
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve("success");
      } else {
        console.log("exit code", code);
        reject("error from main process");
      }
    });
  });
};
module.exports = main;
