const Connection = require("./Connection");
const RoomGame = require("./Rooms/RoomGame");

module.exports = class Messager {
    constructor(room = RoomGame) {
        this.roomMessager = room;
    }

    sendMessage(message, connection = Connection) {
        let messager = this;

        connection.socket.broadcast.to(messager.roomMessager).emit('messanger', { message: message });
    }
}