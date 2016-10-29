Game = require('./game.js');
Player = require('./player.js');

join = require('./join.js');

module.exports = function(io, games) {

  io.on('connection', function(socket) {
    join(io, socket, games);
  });
};
