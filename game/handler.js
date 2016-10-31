join = require('./join.js');
leave = require('./leave.js');

module.exports = function(io, games) {

  io.on('connection', function(socket) {
    join(io, socket, games);
    leave(io, socket, games);
  });
};
