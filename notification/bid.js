'use strict';

const bidChangeStream = require('../models/bid').Bid.watch();
const pushNotificationHandler = require('./pushNotificationHandler');
const socketNotificationHandler = require('./socketNotificationHandler');

exports.Notify = function(io, redisClient) {
    bidChangeStream.on('change', async (change) => {
        var userId = change.fullDocument.goerId;
        var message = createMessage(change);

        await pushNotificationHandler.pushNotify(message)
    });
}

var createMessage = async function(change) {
    var bidId = change.fullDocument.bidId;
    var orderId = change.fullDocument.orderId;
    var goerId = change.fullDocument.goerId;
    var isConfirmed = change.fullDocument.isConfirmed;
    var pushToken = await pushNotificationHandler.getPushToken(goerId);

    var message;

    if (isConfirmed) {
        message = pushNotificationHandler.createMessage(
            pushToken = pushToken,
            title = 'Your bid has been accepted',
            body = 'Your bid has been accepted',
            data = { targetView: 'bid', id: bidId }
        );
    }

    return message;
}

