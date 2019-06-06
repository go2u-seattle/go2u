'use strict';

// package dependencies

const express = require('express');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);


// modules
require('./startup/validation');
require('./startup/logging');
require('./startup/db')();
require('./startup/config');
var routes = require('./routes/routes');
var notifier = require('./notification/notifier');

app.use(express.json())
    .use('/', routes);

http.listen(8000, () => {
    console.log('Listening on Port 8000.');
});

notifier.run(io);
// app.use(express.json());


