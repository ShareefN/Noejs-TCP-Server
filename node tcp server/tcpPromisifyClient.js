const Client = require("./Client");
const promisifyClient = new Client();

promisifyClient
  .sendMessage("Hi")
  .then(data => {
    console.log(`Received: ${data}`);
    return promisifyClient.sendMessage("How are you");
  })
  .then(data => {
    console.log(`Received: ${data}`);
    return promisifyClient.sendMessage("Bye");
  })
  .then(data => {
    console.log(`Received: ${data}`);
    return promisifyClient.sendMessage("exit");
  })
  .catch(err => console.error(err));
