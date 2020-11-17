const net = require("net");
const PORT = 3000;
const HOST = "localhost";

class Client {
  constructor() {
    this.socket = new net.Socket();
    this.port = PORT;
    this.address = HOST;
    this.init();
  }

  init() {
    var client = this;
    client.socket.connect(client.port, client.address, () => {
      console.log(`Client connected to: ${client.address} :  ${client.port}`);
    });
    client.socket.on("close", () => {
      console.log("Client closed");
    });
  }

  sendMessage(message) {
    var client = this;
    return new Promise((resolve, reject) => {
      client.socket.write(message);
      client.socket.on("data", data => {
        resolve(data);
        if (data.toString().endsWith("exit")) {
          client.socket.destroy();
        }
      });
      client.socket.on("error", err => {
        reject(err);
      });
    });
  }
}

module.exports = Client; 