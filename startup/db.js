"use strict";

const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

var mongoDbUserName = "go2u-server-admin";
var mongoDbPassword = "go2u!2019";
var dbConfigurations = {
  connectionString: `mongodb+srv://${mongoDbUserName}:${mongoDbPassword}@go2u-server-dev-terol.mongodb.net/test?retryWrites=true`
};

var mongooseConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true
};

module.exports = function() {
  // mongoose.connect(dbConfigurations.connectionString,mongooseConnectionOptions)
  // mongoose.connect('mongodb://localhost:8000/go2u-server-admin', mongooseConnectionOptions)
  // const db =config.get('db');

  mongoose
    .connect(dbConfigurations.connectionString, mongooseConnectionOptions)
    .then(console.log("Connected to MongoDB"));
  // .then(() => winston.info('Connected MongoDB'));
};

// module.exports = function() {
//   mongoose
//     .connect("mongodb://localhost/go2u")
//     .then(() => console.log("Connected to MongoDB..."))
//     .catch(err => console.error("failed to connect", err));
// };
