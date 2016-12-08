var misc = require('./misc.js')

module.exports = function(io, socket, games) {
  socket.on('message', function (data) {
      game = misc.find_player(games, socket.id).game;
    io.to(game.room).emit('message', {user: data.user, message: data.message});
  });
};
