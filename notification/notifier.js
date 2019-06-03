'user strict';

const redis = require('redis');

exports.run = function(io) {
    handleSocketConnection(io);
}

var handleSocketConnection = function(io)
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