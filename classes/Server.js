const Connection = require('./Connection');
const Player = require('./Player');
const Logger = require('./Debug/logger');

module.exports = class Server {
    constructor() {
        this.connections = [];
        this.lobbys = [];
    }

    update() {}

    connected(socket) {
        let server = this;
        let connection = new Connection();
        connection.socket = socket;
        connection.player = new Player();
        connection.server = server;

        let player = connection.player;
        let lobbys = server.lobbys;

        Logger.log(`Added new player to the server: ${player.displayPalyerInformation()}`);
        server.connections[player.id] = connection;

        socket.join(player.lobby);
        connection.lobby = lobbys[player.lobby];
        connection.lobby.enter(connection);

        return connection;
    }

    disconnected(connection = Connection) {}

    attemptToJoinGame(connection = Connection) {}

    switchLobby(connection = Connection, lobbyID) {}
}

























var rooms = [];

var users = [];
var thisIdPlayer;
IO.on('connection', function(socket) {

    var player = new Player();


    thisIdPlayer = player.id;
    users[thisIdPlayer] = player;

    socket.emit('register', { id: thisIdPlayer });
    Logger.log("Player connection to server: " + player.nickName + " ID:[" + player.id + "]");


    socket.emit('spawn', player);
    socket.broadcast.emit('spawn', player);

    for (var playerId in users) {
        if (playerId != thisIdPlayer) {
            socket.emit('spawn', users[playerId]);
        }
    }

    socket.on('updatePosition', function(data) {

        player.transform.position.X = data.Position.X;
        player.transform.position.Y = data.Position.Y;
        player.transform.position.Z = data.Position.Z;
        Logger.log(`${player.id} :` + player.transform.position.ToString());
        socket.broadcast.emit('updatePosition', player);
    });
    socket.on('updateRotation', function(data) {
        player.transform.rotation.X = data.Rotation.X;
        player.transform.rotation.Y = data.Rotation.Y;
        player.transform.rotation.Z = data.Rotation.Z;
        Logger.log(`${player.id} :` + player.transform.rotation.ToString());
        socket.broadcast.emit('updateRotation', player);
    });
    socket.on('updateScale', function(data) {
        player.transform.scale.X = data.Scale.X;
        player.transform.scale.Y = data.Scale.Y;
        player.transform.scale.Z = data.Scale.Z;
        Logger.log(`${player.id} :` + player.transform.scale.ToString());
        socket.broadcast.emit('updateScale', player);
    });

    // socket.on('create-room', function(callback) {
    //     var nameRoom = callback.NameRoom;
    //     var room = new Room();
    //     room.id = callback.id;
    //     room.name = nameRoom;
    //     rooms[nameRoom] = room;
    //     Logger.log("create room: " + nameRoom);
    //     socket.emit("create room", rooms);
    // });

    // socket.on('join-room', function(callback) {
    //     var room = rooms[callback.NameRoom];
    // });

    // socket.on('show-rooms', function(callback) {
    //     socket.emit('show-rooms', rooms);

    // });

    socket.on('disconnect', () => {
        Logger.log("Player disconected server");
        socket.broadcast.emit('disconnected', player);
        delete users[player.id];

    });
});