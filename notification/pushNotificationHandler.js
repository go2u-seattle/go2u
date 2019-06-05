'use strict';

const { Expo } = require('expo-server-sdk');
const { User } = require('../models/user'); 

var expo = new Expo();

exports.pushNotify = async function(message) {
    let messages = [];

    if (!Expo.isExpoPushToken(message.pushToken)) {
        console.error(`Push token ${messasge.pushToken} is not a valid Expo push token`)
    }

    messages.push(message);

    var chunks = expo.chunkPushNotifications(messages);
    (async () => {
        for (var chunk of chunks) {
            try {
                var ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                // tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();
}

exports.getPushToken = async function(userId) {
    let user = await User.findById(userId);

    if (!user) {
        return user.pushToken
    } else {
        console.log(`Push token for ${userId} is missing`);
        return null;
    }
}

exports.formatMessage = function(to, title, body, data, sound = 'push', ) {
    return {
        to: to,
        sound: sound,
        title: title,
        body: body,
        data: data
    };
} 