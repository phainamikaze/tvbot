// const cypress = require("cypress");

// const start = async () => {
//   console.log("Start", process.env.NODE_PATH);
//   await cypress.run({
//     headed: true,
//     spec: "./cypress/e2e/spec.cy.js",
//     browser: "chrome",
//     config: {
//       baseUrl: "https://ts100.x10.asia.travian.com",
//     },
//     env: {
//       username: "",
//       password: "",
//     },
//   });
// };

process.on("message", (e) => {
  console.log(`Message from parent: ${e}`);
  // start();
  process.send({ data: "Hello from child!" });
});
