console.log("ExecPath", process.execPath);

process.on("message", (m) => {
  console.log("Got message:", m);
  setTimeout(() => {
    process.send("from process.execPath");
  }, 4000);
});
