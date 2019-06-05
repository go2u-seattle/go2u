'use strict';

const orderChangeStream = require('../models/order').Order.watch();
const pushNotificationHandler = require('./pushNotificationHandler');
const socketNotificationHandler = require('./socketNotificationHandler');

exports.Notify = function(io, redisClient) {
    orderChangeStream.on('change', async (change) => {
        var userId = change.fullDocument.userId;
        var message = createMessage(change);
        
        // var socketId = redisClient.get(userId, function(err, reply) {
        //     console.log(`${userId} is offline`)
        //     return reply;
        // });

        // if(socketId) {
        //     socketNotificationHandler.Notify(io, socketId);
        // } else {
            await pushNotificationHandler.pushNotify(message);
        // }
    });
}

var createMessage = async function(change) {
    var orderId = change.fullDocument.orderId
    var orderState = change.fullDocument.orderState;
    var pushToken = await pushNotificationHandler.getPushToken(change.fullDocument.userId);
    var message;
    
    if (orderState === 'confirmed') {
        message = pushNotificationHandler.createMessage(
            pushToken = pushToken,
            title = 'Your order has been confirmed',
            body = 'Your order has been confirmed',
            data = { targetView : 'order', id : orderId}
        );
    } else if (orderState === 'pickedUp') {
        message = pushNotificationHandler.createMessage(
            pushToken = pushToken,
            title = 'Your order has been picked up',
            body = 'Your order has been picked up',
            data = { targetView : 'order', id : orderId}
        );
    } else if (orderState === 'delivered' ) {
        message = pushNotificationHandler.createMessage(
            pushToken = pushToken,
            title = 'Your order has been delivered',
            body = 'Your order has been delivered',
            data = { targetView : 'order', id : orderId}
        );
    }

    return message;
}

// insert
// delete
// replace
// update
// drop
// rename
// dropDatabase
// invalidate