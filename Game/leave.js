Game = require('./game.js');
Player = require('./player.js');

var leave = function(io, socket, games){
  socket.on('disconnect', function(reason){
    io.to(socket.'disconnected', {});
}

module.exports = leave;
