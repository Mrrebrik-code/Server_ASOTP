const Connection = require('./Connection');
const Player = require('./Player');
const Logger = require('./Debug/logger');


const LobbyBase = require("./Lobbies/LobbyBase");
const LobbyGame = require("./Lobbies/LobbyGame");
const LobbyGameSettings = require("./Lobbies/LobbyGameSettings");

module.exports = class Server {
    constructor() {
        this.connections = [];
        this.lobbys = [];

        this.lobbys["test"] = new LobbyGame(15);
    }

    update() {
        let server = this;

        for (let id in server.lobbys) {
            server.lobbys[id].update();
        }
    }

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

    disconnected(connection = Connection) {
        let server = this;
        let id = connection.player.id;

        delete server.connections[id];

        Logger.log(`Player disconnected server ID: ${id}`);

        connection.socket.broadcast.to(connection.player.lobby).emit('disconnected', {
            id: id
        });

        server.lobbys[connection.player.lobby].leave(connection);
    }

    joinLobby(nameLobby, connection = Connection) {
        let server = this;
        let socket = connection.socket;
        let lobbys = server.lobbys;

        socket.join(nameLobby);
        connection.lobby = lobbys[nameLobby];
        connection.lobby.enter(connection);
    }

    createRoom(data, connection = Connection) {
        let server = this;
        let socket = connection.socket;
        let lobbys = server.lobbys;

        socket.join(data.name);
        lobbys[data.name] = new LobbyGame(lobbys.length + 1);

        connection.lobby = lobbys[data.name];
        connection.lobby.enter(connection);

        socket.broadcast.emit('create-room', { "name": data.name, "counPlayers": connection.lobby.connections.length });
    }

    attemptToJoinGame(connection = Connection) {
        let server = this;
        let lobbyFound = false;

        let gameLobbies = server.lobbys.filter(item => {
            return item instanceof LobbyGame;
        });

        gameLobbies.forEach(lobby => {
            if (!lobbyFound) {
                let canJoin = lobby.canEnter(connection);

                if (canJoin) {
                    lobbyFound = true;
                    server.switchLobby(connection, lobby.id);
                }
            }
        });

        if (!lobbyFound) {
            Logger.log('Making a new game lobby');
            let gameLobby = new gameLobby(gameLobbies.length + 1, new LobbyGameSettings("FFA", 2));
            server.lobbys.push(gameLobby);
            server.switchLobby(connection, gameLobby.id);
        }


    }

    switchLobby(connection = Connection, lobbyID) {
        let server = this;
        let lobbys = server.lobbys;

        connection.socket.join(lobbyID);
        connection.lobby = lobbys[lobbyID];

        lobbys[connection.player.lobby].leave(connection);
        lobbys[lobbyID].enter(connection);
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