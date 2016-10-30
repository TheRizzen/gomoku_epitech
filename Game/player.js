function Player(socket, game) {
  this.id = socket.id;
  this.socket = socket;
  this.pawn = 0;
  this.game = game;
  this.alive = true;
};

module.exports = Player;
