const IO = require("socket.io")(process.env.PORT || 4567);
const Logger = require("./classes/debug/logger.js");
const Player = require("./classes/Player.js");
Logger.log("Start server to open port: ")


var users = [];

IO.on('connection', function(socket) {

    var player = new Player();
    users[player.id] = player;
    socket.emit('register', { id: player.id });
    Logger.log("Player connection to server: " + player.nickName + " ID:[" + player.id + "]");

    socket.on('update-position', function(data) {

        player.transform.position.X = data.Position.X;
        player.transform.position.Y = data.Position.Y;
        player.transform.position.Z = data.Position.Z;
        Logger.log(player.transform.position.X);
        //socket.broadcast.emit('update-pisition', player);
    })

    socket.emit('spawn', player);
    socket.broadcast.emit('spawn', player);
    for (var i = 0; i < users.length; i++) {
        if (users[i].id != player.id) {
            socket.broadcast.emit('spawn', users[player.id]);
        }
    }
    socket.on('disconnect', () => {
        Logger.log("Player disconected server");
    })

});