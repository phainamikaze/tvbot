process.on("message", (e) => {
  console.log(`Message from parent: ${e}`);
  process.send({ data: "Hello from child!" });
});
