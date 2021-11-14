const IO = require("socket.io")(process.env.PORT || 4567);
const Logger = require("./classes/debug/logger.js");
const Player = require("./classes/Player.js");

Logger.log("Start server to open port: ")

IO.on('connection', function(socket) {

    var player = new Player();

    socket.on('update-position', (data) => {
        player.transform.newPosition(data.position);

        socket.broadcast.emit('update-pisition', player);
    })
    socket.on('disconnect', () => {
        Logger.log("Player disconected server");
    })

});