function Player(id, socket) {
  this.id = id;
  this.socket = socket;
  this.pawn = 0;
};

module.exports = Player;
