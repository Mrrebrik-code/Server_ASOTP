const RoomSettings = require('./RoomSettings');
const Connection = require('../Connection');
const RoomBase = require('./RoomBase');

module.exports = class RoomGame extends RoomBase {
    constructor(settingsRoom = RoomSettings) {
        super(settingsRoom.Name);
        this.settings = settingsRoom;
        console.log('Create test loby game room!');
    }

    update() {
        //let lobby = this;
        //lobby.deadPlayers();
    }

    canEnter(connection = Connection) {
        let lobby = this;
        let maxPlayerCount = lobby.settings.maxPlayers;
        let currentPlayerCount = lobby.connections.length;

        if (currentPlayerCount + 1 > maxPlayerCount) {
            return false;
        }

        return true;
    }

    enter(connection = Connection) {
        let lobby = this;

        super.enter(connection);
        lobby.addPlayer(connection);
    }

    leave(connection = Connection) {
        let lobby = this;

        super.leave(connection);
        lobby.removePlayer(connection);
    }

    addPlayer(connection = Connection) {
        let lobby = this;
        let connections = lobby.connections;
        let socket = connection.socket;

        var returnData = {
            id: connection.player.id
        }

        socket.emit('spawn', returnData);
        socket.broadcast.to(lobby.id).emit('spawn', returnData);

        connections.forEach(c => {
            if (c.player.id != connection.player.id) {
                socket.emit('spawn', {
                    id: c.player.id
                });
            }
        });
    }

    removePlayer(connection = Connection) {
        let lobby = this;

        connection.socket.broadcast.to(lobby.name).emit('leave-room', {
            id: connection.player.id
        });
    }
}