import { QueryResult } from "mysql2";
import { IDB } from "./Db";

export default class QueuingState {
  private db: IDB;
  private commandsQueue: (() => void)[] = [];

  constructor(db: IDB) {
    this.db = db;
  }

  query(queryString: string) {
    console.log("query queued", queryString);
    return new Promise<QueryResult>((resolve, reject) => {
      const command = () => {
        this.db.query(queryString).then(resolve, reject);
      };
      this.commandsQueue.push(command);
    });
  }

  deactivate() {
    this.commandsQueue.forEach((command) => command());
    this.commandsQueue = [];
  }
}
