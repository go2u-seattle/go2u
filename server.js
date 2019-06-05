'use strict';

// package dependencies
const express = require('express');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


// modules
var dbConfigurations = require('./configurations/db');
var routes = require('./routes/routes');
var mongooseConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true
};
var notifier = require('./notification/notifier');

mongoose.connect(
    dbConfigurations.connectionString,
    mongooseConnectionOptions,
    (err) => {
        if (err) {
            console.error('MongoDB connection error');
            console.error(err.message);
        }
        else {
            console.log('MongoDB connected');
        }
    });

app.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/', routes);

http.listen(8000, () => {
        console.log('Listening on Port 8000.');
    });

await notifier.run(io);
// app.use(express.json());




