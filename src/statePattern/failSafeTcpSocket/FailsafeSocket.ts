import { OnlineState, IOnlineState } from "./OnlineState";
import { OfflineState, IOfflineState } from "./OfflineState";
import { Socket } from "node:net";
import { memoryUsage } from "node:process";

export interface IFailsafeSocket {
  options: { port: number; host: string };
  queue: NodeJS.MemoryUsage[];
  currentState: IOfflineState | IOnlineState | null;
  socket: Socket | null;
  states: {
    offline: IOfflineState;
    online: IOnlineState;
  };
  changeState: (newState: "offline" | "online") => void;
  send: (data: NodeJS.MemoryUsage) => void;
}
export class FailsafeSocket implements IFailsafeSocket {
  options: { port: number; host: string };
  queue: NodeJS.MemoryUsage[];
  currentState: IOfflineState | IOnlineState | null;
  socket: Socket | null;
  states: { offline: IOfflineState; online: IOnlineState };

  constructor(options: { port: number; host: string }) {
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    };
    this.changeState("offline");
  }

  changeState(newState: "offline" | "online") {
    console.log("activating state: ", newState);
    this.currentState = this.states[newState];
    this.currentState.activate();
  }

  send(data: NodeJS.MemoryUsage) {
    if (this.currentState) {
      this.currentState.send(data);
    }
  }
}
