import net from "node:net";

const port = 8080;
const server = net.createServer();
server.listen(port);
server.on("listening", () => console.log("server listening on port ", port));
server.on("connection", (socket) => {
  console.log("client connected to server");
  socket.on("data", (data) => {
    try {
      console.log("server: data before JSON.parse", data.toString());
      const message = JSON.parse(data.toString());
      console.log("server: message received in json format", message);
    } catch (e) {
      console.log("server: error parsing message");
    }
  });
});
