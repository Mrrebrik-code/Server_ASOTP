module.exports.log = function(message, socket = null) {
    if (socket) {
        console.log(message);
        socket.emit('debug-message');
    } else {
        console.log(message);
    }
}