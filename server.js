"use strict";

// package dependencies

const express = require("express");
const app = express();
const http = require("http").Server(app);
var io = require("socket.io")(http);

// modules
require("./startup/validation");
// require("./startup/logging")();
require("./startup/db")();
require("./startup/config");
var routes = require("./routes/routes");
var notifier = require("./notification/notifier");
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app
  .use(allowCrossDomain)
  .use(express.json())
  .use("/", routes);

const port = 27017;
const server = http.listen(port, () => {
  console.log(`Listening on Port ${port} .`);
});

notifier.run(io);

module.exports = server;
// app.use(express.json());
