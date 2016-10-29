Game = require('./game.js')
Player = require('./player.js')

module.exports = function(io, games) {

  io.on('connection', function(socket) {
    var game = games[games.length - 1];

    socket.join(game.room);
    game.players.push(new Player(socket.id, socket));
    socket.emit('connected', {user: game.players.length, room: games.length})
    if (game.players.length == 2){
      game.init = true;
      io.to(game.room).emit('starting');
      games.push(new Game('room #' + games.length));
    }
  });
};
