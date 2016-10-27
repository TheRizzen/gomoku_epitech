var game = [];

function addGame() {
  game.push({
  init: false,
  alive: true, // 1 both player are and want playing, 0 -> room is closed
  gameOngoing: false, // 0 game not ongoing, 1 game still going
  col_nb: 19,
  line_nb: 19,
  map: [],
  players: []
  });
}
exports = module.exports = game;
