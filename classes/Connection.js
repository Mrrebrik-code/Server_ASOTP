const Logger = require("./debug/logger");

module.exports = class Connection {
    constructor() {
        this.socket;
        this.player;
        this.server;
        this.lobby;
    }

    createEvents() {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;


        socket.on('disconnect', () => {
            server.disconnected(connection)
        });
        socket.on('join-game', () => {
            server.attemptToJoinGame(connection);
        });
        socket.on('join-lobby', (data) => {
            server.joinLobby(data.name, connection);
        })
        socket.on('update-position', (callback) => {
            player.transform.position.X = callback.Position.X;
            player.transform.position.Y = callback.Position.Y;
            player.transform.position.Z = callback.Position.Z;
            Logger.log(`${player.id} :` + player.transform.position.ToString());
            socket.broadcast.to("test").emit('updatePosition', player);
        });
        socket.on('update-rotation', (callback) => {
            player.transform.rotation.X = callback.Rotation.X;
            player.transform.rotation.Y = callback.Rotation.Y;
            player.transform.rotation.Z = callback.Rotation.Z;
            Logger.log(`${player.id} :` + player.transform.rotation.ToString());
            socket.broadcast.to("test").emit('updateRotation', player);
        });
        socket.on('update-scale', (callback) => {
            player.transform.scale.X = callback.Scale.X;
            player.transform.scale.Y = callback.Scale.Y;
            player.transform.scale.Z = callback.Scale.Z;
            Logger.log(`${player.id} :` + player.transform.scale.ToString());
            socket.broadcast.to("test").emit('updateScale', player);
        });
    }
}