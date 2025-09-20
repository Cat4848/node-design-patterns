import "dotenv/config";
import { EventEmitter } from "stream";
import mysql2, { Connection, QueryResult } from "mysql2/promise";
import QueuingState from "./QueuingState";
import InitializedState from "./InitializedState";

export interface IDB {
  conn: Connection | null;
  state: QueuingState | InitializedState;
  query: (queryString: string) => Promise<QueryResult>;
  connect: () => void;
}
const dbUrl = process.env.DB_URL!;

class MysqlDB extends EventEmitter implements IDB {
  conn: Connection | null = null;
  state: QueuingState | InitializedState;

  constructor() {
    super();
    this.state = new QueuingState(this);
  }

  public async query(queryString: string) {
    return this.state.query(queryString);
  }

  public async connect() {
    if (!this.conn) {
      this.conn = await mysql2.createConnection(dbUrl);
      this.emit("connected");
      const oldState = this.state;
      this.state = new InitializedState(this);
      if (oldState instanceof QueuingState) {
        oldState.deactivate();
      }
    }
  }
}

export const mysqlDb = new MysqlDB();
