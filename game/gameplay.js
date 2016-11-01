var misc = require('./misc.js');

module.exports = {
  putpawn: function(io, socket, games) {
    var checkgame = function(game, player, x, y) {
      console.log("Pawn index = " + game.get1DP(x, y));

      // Check si pion pris
      var taken = game.arePawnTaken(game.get1DP(x, y));

      if (taken[0] != -1)
        io.to(game.room).emit('eatpawn', x1: taken[0], y1: taken[1], x2: taken[2], y2: taken[3]);
      // Check de fin de jeu
      if (game.tenPawnTaken() == true) {
        console.log("Partie gagné : 10 pions pris !");
        io.to(game.room).emit('win', {player: player.id, reason: "pawn taken"});
      }

      if (game.areThereFivePawn(game.get1DP(x, y)) == true) {
        console.log('Partie gagné !');
        io.to(game.room).emit('win', {player: player.id, reason: "pawn alignment"});
      }
    }

    socket.on('putpawn', function(data) {
      var x = data.x;
      var y = data.y;
      var player = misc.find_player(games, socket.id);
      var game = player.game;

      console.log(game.map[y * game.col_nb + x]);
      if (game.map[y * game.col_nb + x] != 0 || data.player != game.activePlayer + 1) {
        console.log('badmove !');
        socket.emit('badmove', {x: x, y: y, value: game.map[y * game.col_nb + x]});
      }
      else {
        console.log('goodmove !');
        game.map[y * game.col_nb + x] = player.id;
        io.to(game.room).emit('move', {x: x, y: y, player: player.id});
	checkgame(game, player, x, y);
        game.activePlayer = game.activePlayer ^ 1;
      }
    });
  }
};
