'use strict';

const mongoose = require('mongoose');
const winston = require('winston');

var mongoDbUserName = 'go2u-server-admin';
var mongoDbPassword = 'go2u!2019';
var dbConfigurations = {
    connectionString: `mongodb+srv://${mongoDbUserName}:${mongoDbPassword}@go2u-server-dev-terol.mongodb.net/test?retryWrites=true`
};

var mongooseConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true
};

module.exports = function() {
  mongoose.connect(dbConfigurations.connectionString,mongooseConnectionOptions)
  // .then(() => winston.info('Connected MongoDB'));
  .then(console.log('connected to MongoDB'));
}