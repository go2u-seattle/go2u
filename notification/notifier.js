'user strict';

const redis = require('redis');
const bid = require('./bid');
const order = require('./order');

exports.run = async function(io) {
    let redisClient = handleRadisClient();
    // handleSocketConnection(io, redisClient);
    await bid.Notify(io, redisClient);
    await order.Notify(io, redisClient);
}

var handleRadisClient = function(io)
{
    let redisClient = redis.createClient();
    redisClient.on('error', function(err) {
        console.log(err);
    });
    redisClient.on('conection', function() {
        console.log('Redis Client Connected');
    });

    return redisClient;
}

var handleSocketConnection = function(io, redisClient)
{
    io.on('connection', function(socket) {
        socket.on('userConnection', function(data) {
            redisClient.set([data.userId, socket.id]);
        });
        socket.once('disconnect', function() {
            redisClient.del(data.userId);
        });
    });
}