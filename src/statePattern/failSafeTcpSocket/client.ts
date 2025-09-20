import { FailsafeSocket } from "./FailsafeSocket";

const failsafeSocket = new FailsafeSocket({ port: 8080, host: "127.0.0.1" });
setInterval(() => {
  failsafeSocket.send(process.memoryUsage());
}, 1000);
