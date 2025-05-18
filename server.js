const express = require("express");
const http = require("http");
const RED = require("node-red");

const app = express();
const server = http.createServer(app);

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/",
  userDir: "./data",
  functionGlobalContext: {},
  uiPort: process.env.PORT || 1880
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(settings.uiPort, () => {
  console.log(`Node-RED running on port ${settings.uiPort}`);
});

RED.start();
