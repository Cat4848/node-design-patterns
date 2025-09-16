import { mysqlDb } from "./Db";

const main = async () => {
  try {
    console.log("before query");
    mysqlDb.connect();
    const players = await mysqlDb.query("SELECT * FROM players;");

    console.log("players", players);
    const state = mysqlDb.state;
    console.log("state", state);
  } catch (e) {
    console.log("error", e);
  }
};

mysqlDb.on("connected", () => console.log("connected event"));

main();

setTimeout(async () => {
  const playerCatalin = await mysqlDb.query(
    "SELECT * FROM players WHERE name = 'Catalin';"
  );
  console.log("within timeout -> playerCatalin", playerCatalin);
}, 1500);
