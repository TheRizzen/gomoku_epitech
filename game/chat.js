var misc = require('./misc.js');
var Ai = require('../ai/ai.js');

module.exports = function(io, socket, games) {
  socket.on('message', function (data) {
    var game = misc.find_player(games, socket.id).game;

    if (data.message.charAt(0) == '/') {
      if (data.message == '/help')
        socket.emit('message', {message: 'Help: /ai /bouh'});
      if (data.message == '/ai') {
        if (game.players.length == 2)
          socket.emit('message', {message: 'Room is already full'});
        else {
          socket.emit('message', {message: 'AI has come forth'})
          var AIsocket = require('socket.io-client')('http://localhost:8080/');
          game.ai = true;
          game.aiObject = new Ai(game);
        }
      }
    }
    else {
      io.to(game.room).emit('message', {id: data.user, message: data.message});
    }
  });
};
