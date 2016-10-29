function Game(roomName) {
    this.room = roomName;
    this.init = false;
    this.alive = true; // 1 both player are and want playing, 0 -> room is closed
    this.gameOngoing = 0; // 0 game not ongoing, 1 game still going, 2 win if bad plays from next player
    this.activePlayer = 0; // 0 = p1, 1 = p2
    this.col_nb = 19;
    this.line_nb = 19;
    this.map = []; // 0 = empty | 1 = p1 | 2 = p2
    this.players = [];

    this.clearBoard = function() {
	var i = 0;

	while (i < this.col_nb * this.line_nb)
	    {
		this.map[i] = 0;
		i += 1;
	    }
	return true;
    }

    var removeTwoPawn = function(pawn_index, inc_x, inc_y) {
	var i = 1;

	this.map[pawn_index + (inc_x == 0 ? inc_x : inc_x + i)
                                   + ((inc_y == 0 ? inc_y : inc_y + i) * this.col_nb)] = 0;
	i += 1;
	this.map[pawn_index + (inc_x == 0 ? inc_x : inc_x + i)
                                   + ((inc_y == 0 ? inc_y : inc_y + i) * this.col_nb)] = 0;
    };

    this.arePawnTaken = function(pawn_index) {
	if (this.map[pawn_index + 1 + (0 * this.col_nb)] != this.activePlayer && this.map[pawn_index + 1 + (0 * this.col_nb)] != 0)
	    if (this.map[pawn_index + 2 + (0 * this.col_nb)] != this.activePlayer && this.map[pawn_index + 2 + (0 * this.col_nb)] != 0)
		if (this.map[pawn_index + 3 + (0 * this.col_nb)] == this.activePlayer)
		    {
			removeTwoPawn(pawn_index, 1, 0);
			return true;
		    }
    };

    var checkLineForPawn = function(pawn_index, inc_x, inc_y, max, tileType) {
	var i = 0;
	var cnt = 0;

	while (cnt < max)
	    {
		// Check des bord ?? :3
		if (this.map[pawn_index + (inc_x == 0 ? inc_x : inc_x + i)
                                   + ((inc_y == 0 ? inc_y : inc_y + i) * this.col_nb)] != tileType)
		    return false;
		i += 1;
		cnt += 1;
	    }
	return true;
    };

    this.areThereFivePawn = function () {
	// Problème possible si sur le bord (!!!!!!!!!!!!!!)
	if (checkLineForPawn(0 /* pawn just placed */, 1, 0, 5, this.activePlayer + 1) == true || checkLineForPawn(0 /* pawn just placed */, 0, 1, 5, this.activePlayer + 1) == true ||
	    checkLineForPawn(0 /* pawn just placed */, -1, 0, 5, this.activePlayer + 1) == true || checkLineForPawn(0 /* pawn just placed */, 0, -1, 5, this.activePlayer + 1) == true ||
	    checkLineForPawn(0 /* pawn just placed */, 1, 1, 5, this.activePlayer + 1) == true || checkLineForPawn(0 /* pawn just placed */, -1, -1, 5, this.activePlayer + 1) == true ||
	    checkLineForPawn(0 /* pawn just placed */, -1, 1, 5, this.activePlayer + 1) == true || checkLineForPawn(0 /* pawn just placed */, 1, -1, 5, this.activePlayer + 1) == true)
	    return true;
	// Rajouter le cinq cassable !
	return false;
    };

    this.checkGameState =  function () {
	if (game.pawnTaken[0] >= 10) {
	    // player 1 won
	}
	else if (game.pawnTaken[1] >= 10) {
	    // player 2 won
	}
    };
}

exports = module.exports = Game;
