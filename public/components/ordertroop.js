const { exec } = require("child_process");
// const cybridge = require("./cy-bridge");
const orderTroop = async (db) => {
  // get the troops config
  const troops = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM q_ordertroop", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  console.log("troops", troops);
  // cypress run
  // for (let troop of troops) {
  //   const { gid, tid, amount } = troop;
  //   const command = `npx cypress run --env gid=${gid},tid=${tid},amount=${amount}`;
  //   exec(command, (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });
  // }
};
module.exports = orderTroop;
