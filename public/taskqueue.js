const ordertroop = require("./process/ordertroop/main.js");

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
      await runtask(db, task);
      console.log(new Date(), "stop  run task", task.id);
    }
  }
};

const runtask = async (db, task) => {
  try {
    switch (task.ptype) {
      case "ordertroop":
        console.log("run ordertroop");
        await ordertroop(task);

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
