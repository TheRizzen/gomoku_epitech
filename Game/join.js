Game = require('./game.js')
Player = require('./player.js')

module.exports = function(io, games) {

  var game = games[games.length - 1];

  io.on('connection', function(socket) {
    socket.join(game.room);
    game.players.push(new Player(socket.id, socket));
    socket.emit('connected', {user: game.players.length, room: games.length})
    if (game.players.length == 2){
      game.init = true;
      io.to(game.room).emit('starting');
    }
  });
};
