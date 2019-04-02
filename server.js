'use strict';

// package dependencies
var express = require('express');
var mongoose = require('mongoose');

// modules
var dbConfigurations = require('./configurations/db');
var routes = require('./routes/routes');

console.log(dbConfigurations.connectionString);

mongoose.connect(dbConfigurations.connectionString, { useNewUrlParser: true })
    .catch( err => {
      console.error('MongoDB connection error');
      console.error(err);
    })
    .finally(() => {
      console.log('MongoDB connected');
    });

var app = express()
    .use('/', routes)
    .listen(8080, () =>{
        console.log('Listening on Port 8080.');
    });