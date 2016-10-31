var misc = require('./misc.js');

module.exports = {
  putpawn: function(io, socket, games) {
    var checkgame = function(game, x, y) {
	console.log(game.get1DP(x, y));
	if (game.areThereFivePawn(game.get1DP(x, y)) == true)
	    console.log('Partie gagné !');
	else
	    console.log('Partie pas fini !');
    }

    socket.on('putpawn', function(data) {
      var x = data.x;
      var y = data.y;
      var player = misc.find_player(games, socket.id);
      var game = player.game;

      console.log(game.map[y * game.col_nb + x]);
      if (game.map[y * game.col_nb + x] != 0) {
        console.log('badmove !');
        socket.emit('badmove', {x: x, y: y, value: game.map[y * game.col_nb + x]});
      }
      else {
        console.log('goodmove !');
        game.map[y * game.col_nb + x] = player.id;
        io.to(game.room).emit('move', {x: x, y: y, player: player.id});
	checkgame(game, x, y);
      }
    });
  }
};
