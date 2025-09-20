import { IFailsafeSocket } from "./FailsafeSocket";

export interface IOnlineState {
  failsafeSocket: IFailsafeSocket;
  hasDisconnected: boolean;
  send: (data: NodeJS.MemoryUsage) => void;
  _safeWrite: (data: NodeJS.MemoryUsage) => void;
  activate: () => void;
}

export class OnlineState implements IOnlineState {
  failsafeSocket: IFailsafeSocket;
  hasDisconnected: boolean = false;

  constructor(failsafeSocket: IFailsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data: NodeJS.MemoryUsage) {
    this.failsafeSocket.queue.push(data);
    this._safeWrite(data);
  }

  _safeWrite(data: NodeJS.MemoryUsage) {
    if (this.failsafeSocket.socket) {
      const json = JSON.stringify(data);
      this.failsafeSocket.socket.write(json, (err) => {
        if (!this.hasDisconnected && !err) {
          this.failsafeSocket.queue.shift();
        }
      });
    }
  }

  activate() {
    this.hasDisconnected = false;
    for (const data of this.failsafeSocket.queue) {
      this._safeWrite(data);
    }

    if (this.failsafeSocket.socket) {
      this.failsafeSocket.socket.on("end", () => {
        this.hasDisconnected = true;
        this.failsafeSocket.changeState("offline");
      });
    }
  }
}
