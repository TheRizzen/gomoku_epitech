module.exports = function(io, socket) {
  socket.on('message', function (data) {
    io.emit('message', {user: data.user, message: data.message});
  });
};
