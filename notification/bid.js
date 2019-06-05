'use strict';

const bidChangeStream = require('../models/bid').Bid.watch();
const pushNotificationHandler = require('./pushNotificationHandler');
const socketNotificationHandler = require('./socketNotificationHandler');

exports.Notify = function(io, redisClient) {
    bidChangeStream.on('change', (change) => {
    });
}

var createMessage = function(userId, change) {
    return {
    }
}

