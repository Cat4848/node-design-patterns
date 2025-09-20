import { QueryResult } from "mysql2";
import { IDB } from "./Db";

export default class InitializedState {
  private db: IDB;

  constructor(db: IDB) {
    this.db = db;
  }

  async query(queryString: string) {
    return new Promise<QueryResult>((resolve, reject) => {
      if (this.db.conn) {
        this.db.conn.execute(queryString).then(([res]) => resolve(res), reject);
      }
    });
  }
}
