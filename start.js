const io = require('socket.io')(process.env.PORT || 4567)
const Server = require('./classes/Server.js');
const Logger = require("./Debug/logger.js");

Logger.log("Start server to open port: 4567");

var server = new Server();

setInterval(() => {
    server.update();
}, 100, 0);

io.on('connection', function(socket) {
    var connection = server.connected(socket);
    connection.createEvents();
    connection.socket.emit('register', { 'id': connection.palyer.id });
});