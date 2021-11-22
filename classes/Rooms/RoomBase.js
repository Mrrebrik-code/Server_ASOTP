const Connection = require("../Connection");
const Logger = require('../Debug/logger');

module.exports = class RoomBase {
    constructor(nameRoom) {
        this.name = nameRoom;
        this.connections = [];
    }

    update() {

    }

    enter(connection = Connection) {
        let lobby = this;
        let player = connection.player;

        Logger.log(`Player: ${player.displayPalyerInformation()}, has entered the lobby [${lobby.name}]`);

        lobby.connections.push(connection);

        player.room = lobby.name;
        connection.lobby = lobby;
    }

    leave(connection = Connection) {
        let lobby = this;
        let player = connection.player;

        Logger.log(`Player: ${player.displayPalyerInformation()}, has left the lobby [${lobby.name}]`);

        connection.lobby = undefined;

        let index = lobby.connections.indexOf(connection);
        if (index > -1) {
            lobby.connections.splice(index, 1);
        }
    }
}