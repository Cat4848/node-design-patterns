import { QueryResult } from "mysql2";
import { IDB } from "./Db";

export default class InitializedState {
  private db: IDB;

  constructor(db: IDB) {
    this.db = db;
  }

  async query(queryString: string) {
    console.log("initialized state query called");
    return new Promise<QueryResult>((resolve, reject) => {
      if (this.db.conn) {
        console.log("query executed", queryString);
        this.db.conn.execute(queryString).then(([res]) => resolve(res), reject);
      }
    });
  }
}
