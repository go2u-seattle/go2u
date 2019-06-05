'user strict';

exports.Notify = function(io, socketId, notificationType, notificationMessage) {
    io.to(socketId).emit(notificationType, notificationMessage);
}