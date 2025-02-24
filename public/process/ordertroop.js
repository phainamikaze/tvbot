const path = require("path");
const { spawn } = require("child_process");

const main = async (task, userconfig) => {
  return new Promise((resolve, reject) => {
    const spec = path.resolve(`./cypress/e2e/spec.cy.js`);
    console.log(userconfig);
    const cypress = spawn(
      "npx",
      [
        "cypress",
        "run",
        "--quiet",
        "--spec",
        spec,
        "--headed",
        "--config",
        `{"baseUrl":"https://ts100.x10.asia.travian.com"}`,
        "--env",
        `username=${task},password=${task}`,
      ],
      {
        cwd: path.resolve(__dirname, "../../"),
      }
    );

    cypress.on("error", (code) => {
      console.log(`error ${code}`);
    });
    cypress.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    cypress.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    cypress.on("close", (code) => {
      if (code === 0) {
        resolve("ok");
      } else {
        reject("error");
      }
    });
  });
};
module.exports = main;
