const LobbyBase = require('./LobbyBase');
const LobbyGameSettings = require('./LobbyGameSettings');
const Connection = require('../Connection');

module.exports = class LobbyGame extends LobbyBase {
    constructor(id, settings = LobbyGameSettings) {
        super(id);
        this.settings = settings;
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

        connection.socket.broadcast.to(lobby.id).emit('disconnect', {
            id: connection.player.id
        });
    }
}