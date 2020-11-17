const net = require("net");
const server = net.createServer();
const port = 3000;
const host = "localhost";

const sockets = [];

server.listen(port, host, () => {
  console.log(`TCP server listening on ${host}:${port}`);
});

server.on("connection", socket => {
  var clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`new client connected: ${clientAddress}`);
  sockets.push(socket);

  socket.on("data", data => {
    sockets.forEach(sock => {
      sock.write(`${sock.remoteAddress}:${sock.remotePort} said ${data}\n`);
    });
  });

  socket.on("close", data => {
    const index = sockets.findIndex(o => {
      return (
        o.remoteAddress === socket.remoteAddress &&
        o.remotePort === socket.remotePort
      );
    });
    if (index !== -1) sockets.splice(index, 1);
    sockets.forEach(sock => {
      sock.write(`${clientAddress} disconnected\n`);
    });
    console.log(`connection closed: ${clientAddress}`);
  });

  socket.on("error", err => {
    console.log(`Error occurred in ${clientAddress}: ${err.message}`);
  });
});
