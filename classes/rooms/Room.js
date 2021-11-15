module.exports = new class Room {
    constructor(nameRoom, idRoom) {
        this.id = idRoom;
        this.name = nameRoom;
        this.players = [];
    }
}