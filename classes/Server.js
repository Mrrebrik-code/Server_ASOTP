const Connection = require('./Connection');
const Player = require('./Player');
const Logger = require('./Debug/logger');


const RoomGame = require("./Rooms/RoomGame");
const RoomSettings = require('./Rooms/RoomSettings');
const Messager = require('./Messager');

module.exports = class Server {
    constructor() {
        this.connections = [];
        this.lobbys = [];


        this.lobbys["menu"] = new RoomGame(new RoomSettings("menu", "menu_game", "2"))
        this.messager = new Messager(this.lobbys["menu"]);
    }

    //Updater lobbys server
    update() {
        let server = this;

        for (let lobby in server.lobbys) {
            server.lobbys[lobby].update();
        }
    }

    //Connection player to server. Server connections add player from player.id
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

        return connection;
    }

    //Disconnected player server and message more users clinet info disconnected player.id
    disconnected(connection = Connection) {
        let server = this;
        let id = connection.player.id;

        delete server.connections[id];

        Logger.log(`Player disconnected server ID: ${id}`);

        let lobby = server.lobbys[connection.lobby];
        if (lobby != null) {
            Logger.log(lobby.settings.Name);
            lobby.leave(connection);
            connection.socket.broadcast.to(connection.player.room).emit('disconnected', {
                id: id
            });
        }

    }

    createRoom(data, connection = Connection) {
        let server = this;
        let socket = connection.socket;

        socket.join(data.RoomName);
        Logger.log(data.RoomName);

        let settingsRoom = new RoomSettings(data.RoomName, data.GameMode, data.MaxPlayer);
        server.lobbys[data.RoomName] = new RoomGame(settingsRoom);

        connection.lobby = server.lobbys[data.RoomName];
        connection.lobby.enter(connection);

        socket.broadcast.emit('create-room', {
            name: data.RoomName,
            id: data.RoomID,
            gameMode: data.GameMode,
            maxPlayer: data.MaxPlayer,
            countPlayers: connection.lobby.connections.length
        });
    }

    joinRoom(data, connection = Connection) {
        let server = this;
        let lobby = server.lobbys[data];
        let status = false;


        if (lobby) {
            let canJoin = lobby.canEnter(connection);
            if (canJoin) {
                Logger.log('Connected player: ' + connection.player.nickName + " to room: " + lobby.name);
                connection.socket.join(lobby.name);
                connection.lobby = lobby;
                lobby.enter(connection);
                status = true;
            }
        } else {
            status = false;
        }

        connection.socket.emit('connected-room', {
            status: status
        });
    }

    leaveRoom(connection = Connection) {
        let server = this;
        let lobbys = server.lobbys;

        lobbys[connection.player.room].leave(connection);

    }

    switchRoom(connection = Connection, lobbyName) {
        let server = this;
        let lobbys = server.lobbys;

        connection.socket.join(lobbyName);
        connection.lobby = lobbys[lobbyName];

        lobbys[connection.player.room].leave(connection);
        lobbys[lobbyName].enter(connection);
    }
    onMessager(message, connection = Connection) {
        let server = this;
        let messager = server.messager;

        messager.sendMessage(message, connection);
        console.log(message);
    }
}

























// var rooms = [];

// var users = [];
// var thisIdPlayer;
// IO.on('connection', function(socket) {

//     var player = new Player();


//     thisIdPlayer = player.id;
//     users[thisIdPlayer] = player;

//     socket.emit('register', { id: thisIdPlayer });
//     Logger.log("Player connection to server: " + player.nickName + " ID:[" + player.id + "]");


//     socket.emit('spawn', player);
//     socket.broadcast.emit('spawn', player);

//     for (var playerId in users) {
//         if (playerId != thisIdPlayer) {
//             socket.emit('spawn', users[playerId]);
//         }
//     }

//     socket.on('updatePosition', function(data) {

//        
//     });
//     socket.on('updateRotation', function(data) {
//         
//     });
//     socket.on('updateScale', function(data) {
//         
//     });

//     // socket.on('create-room', function(callback) {
//     //     var nameRoom = callback.NameRoom;
//     //     var room = new Room();
//     //     room.id = callback.id;
//     //     room.name = nameRoom;
//     //     rooms[nameRoom] = room;
//     //     Logger.log("create room: " + nameRoom);
//     //     socket.emit("create room", rooms);
//     // });

//     // socket.on('join-room', function(callback) {
//     //     var room = rooms[callback.NameRoom];
//     // });

//     // socket.on('show-rooms', function(callback) {
//     //     socket.emit('show-rooms', rooms);

//     // });

//     socket.on('disconnect', () => {
//         Logger.log("Player disconected server");
//         socket.broadcast.emit('disconnected', player);
//         delete users[player.id];

//     });
// });