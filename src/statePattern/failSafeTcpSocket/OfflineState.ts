import { IFailsafeSocket } from "./FailsafeSocket";
import net from "node:net";

export interface IOfflineState {
  failsafeSocket: IFailsafeSocket;
  send: (data: NodeJS.MemoryUsage) => void;
  activate: () => void;
}

export class OfflineState implements IOfflineState {
  failsafeSocket: IFailsafeSocket;

  constructor(failsafeSocket: IFailsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data: NodeJS.MemoryUsage) {
    this.failsafeSocket.queue.push(data);
  }

  activate() {
    const retry = () => {
      setTimeout(() => this.activate(), 1000);
    };

    console.log("trying to connect...");
    const socket = new net.Socket();
    this.failsafeSocket.socket = socket.connect(this.failsafeSocket.options);
    this.failsafeSocket.socket.on("connect", () => {
      console.log("connection established");
      if (this.failsafeSocket.socket) {
        this.failsafeSocket.socket.removeListener("error", retry);
        this.failsafeSocket.changeState("online");
      }
    });
    this.failsafeSocket.socket.once("error", retry);
  }
}
