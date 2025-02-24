const ordertroop = require("./process/ordertroop");

const taskqueue = async (db, tasks) => {
  for (const task of tasks) {
    if (task.lastrun + task.interval < Date.now()) {
      // update lastrun and new interval value
      const interval =
        Math.floor(Math.random() * (task.max - task.min + 1)) + task.min;
      await db.all(
        `UPDATE taskqueue SET lastrun = ?, interval = ? WHERE id = ?`,
        [Date.now(), interval, task.id]
      );
      // run task
      console.log(new Date(), "start run task", task.id);
      await runtask(task);
      console.log(new Date(), "stop  run task", task.id);
    }
  }
};
// const getUserConfig = async (db) => {
//   try {
//     const userconfig = await db.get(`SELECT * FROM userconfig`);
//     console.log("userconfig", userconfig);
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const prepareTask = async (db, task) => {
//   try {
//     const userconfig = await getUserConfig(db);
//     // await runtask(task, userconfig);
//   } catch (err) {
//     console.log(err);
//   }
// };

const runtask = async (task, userconfig) => {
  try {
    switch (task.ptype) {
      case "ordertroop":
        console.log("run ordertroop");
        await ordertroop(task, {});

        break;
      default:
        console.log("unknown ptype", task.ptype);
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = taskqueue;
