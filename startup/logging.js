
require('express-async-errors');
const winston = require('winston'); // default logger;


module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )}),
    new winston.transports.File({ filename: 'uncaughExceptions.log' }));

process.on('unhandledRejection', (ex) => {
    throw ex;
})

winston.add(new winston.transports.File({filename: 'logfile.log '}));
// wonston.add(wonston.transports.MongoDb, { db: 'mongodb://localhost/'});

} 