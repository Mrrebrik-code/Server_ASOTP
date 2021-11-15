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

        });
        socket.on('join-game', () => {

        });
        socket.on('update-position', (callback) => {

        });
        socket.on('update-rotation', (callback) => {

        });
    }
}