const io = require("socket.io")(process.env.PORT || 4567);
const logger = require("./classes/debug/logger.js");


logger.log("Start server to open port: ")

io.on('connection', function(socket) {

});