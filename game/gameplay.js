module.exports = {
  putpawn: function(io, socket, games) {
    var checkgame = function(games) {
    }

    socket.on('putpawn', function(data) {
      var x = data.x;
      var y = data.y;
      var player = find_player(games, socket.id);
      var game = player.game;

      if (game.map[x * y] != 0) {
        console.log('badmove !');
        socket.emit('badmove', {x: x, y: y});
      }
      else {
        console.log('goodmove !');
        socket.emit('goodmove', {x: x, y: y});
        game.map[x * y] = player.id;
        io.to(game.room).emit('move', {x: x, y: y, player: player.id});
      }
    });
  }
};
