function Game(roomName) {
    this.room = roomName;
    this.init = false;
    this.alive = true; // 1 both player are and want playing, 0 -> room is closed
    this.gameOngoing = 0; // 0 game not ongoing, 1 game still going, 2 win if bad plays from next player
    this.activePlayer = 0; // 0 = p1, 1 = p2
    this.col_nb = 19;
    this.line_nb = 19;
    this.pawnTaken = [0, 0];
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

    var checkLineForPawn = function(pawn_map, inc_x, inc_y) {
	if (!this.map[pawn_map + inc_x + (inc_y * this.col_nb)] == this.activePlayer)
	    return false;
	
	var i = 1;
	var cnt = 1;
	while (cnt < 5)
	    {
		if (this.map[pawn_map + (inc_x == 0 ? inc_x : inc_x + i)
                                   + ((inc_y == 0 ? inc_y : inc_y + i) * this.col_nb)] == 0)
		    return false;
		i += 1;
		cnt += 1;
	    }
	return true;
    };

    this.areThereFivePawn = function () {
	if (checkLineForPawn(0 /* pawn just placed */, 1, 0) == true || checkLineForPawn(0 /* pawn just placed */, 0, 1) == true ||
	    checkLineForPawn(0 /* pawn just placed */, -1, 0) == true || checkLineForPawn(0 /* pawn just placed */, 0, -1) == true ||
	    checkLineForPawn(0 /* pawn just placed */, 1, 1) == true || checkLineForPawn(0 /* pawn just placed */, -1, -1) == true ||
	    checkLineForPawn(0 /* pawn just placed */, -1, 1) == true || checkLineForPawn(0 /* pawn just placed */, 1, -1) == true)
	    return true;
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
