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

    this.moves = [
	[1, 1],
	[0, 1],
	[1, 0],
	[-1, -1],
	[1, -1],
	[-1, 1],
	[0, -1],
	[-1, 0],
	];

    this.get1DP = function(x, y) {
	return (x + y * this.col_nb);
    }

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
	var i = 0;

	this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))
                                   + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - 1)) * this.col_nb)] = 0;
	i += 1;
	this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))
                                   + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - 1)) * this.col_nb)] = 0;
    };


    this.twoThreeRule = function(pawn_index) {
	return true;
    }

    this.arePawnTaken = function(pawn_index) {
	var i = 0;

	while (i < 8)
	    {
		if (this.map[pawn_index + this.moves[i][0] + (this.moves[i][1] * this.col_nb)] != this.activePlayer + 1 &&
		    this.map[pawn_index + this.moves[i][0] + (this.moves[i][1] * this.col_nb)] != 0)
		    if (this.map[pawn_index +
				 (this.moves[i][0] == 0 ? this.moves[i][0] : (this.moves[i][0] > 0 ? this.moves[i][0] + 1 : this.moves[i][0] - 1)) +
				 ((this.moves[i][1] == 0 ? this.moves[i][1] : (this.moves[i][1] > 0 ? this.moves[i][1] + 1 : this.moves[i][1] - 1)) * this.col_nb)] != this.activePlayer + 1 &&
			this.map[pawn_index +
                                 (this.moves[i][0] == 0 ? this.moves[i][0] : (this.moves[i][0] > 0 ? this.moves[i][0] + 1 : this.moves[i][0] - 1)) +
                                 ((this.moves[i][1] == 0 ? this.moves[i][1] : (this.moves[i][1] > 0 ? this.moves[i][1] + 1 : this.moves[i][1] - 1)) * this.col_nb)] != 0)
			if (this.map[pawn_index + (this.moves[i][0] == 0 ? this.moves[i][0] : (this.moves[i][0] > 0 ? this.moves[i][0] + 2 : this.moves[i][0] - 2)) +
				     ((this.moves[i][1] == 0 ? this.moves[i][1] : (this.moves[i][1] > 0 ? this.moves[i][1] + 2 : this.moves[i][1] - 2)) * this.col_nb)] == this.activePlayer)
                {
                    removeTwoPawn(pawn_index, this.moves[i][0], this.moves[i][1]);
                    return true;
                };
		i += 1;
	    }
    };
    
    var checkLineForPawn = function(pawn_index, inc_x, inc_y, max, tileType) {
	var i = 0;
	var cnt = 0;

	while (cnt < max)
	    {
		// Check des bord ?? :3
		if (this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))
                                   + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i)) * this.col_nb)] != tileType)
		    return false;
		i += 1;
		cnt += 1;
	    }
	return true;
    };

    var checkIfWon = function(idx, pawn_idx) {
	// Use of 2D perpendicular vector
	var norm_vec = [this.moves[idx][1], this.moves[idx][0] * -1]; // To check perpendically from each pawn of the winning five (in both direction)
	var oppo_vec = [this.moves[idx][1] * -1, this.moves[idx][0]];
	var i = 0;
	var tmp_idx = 0; // For clarity's sake
	var tmp_vec_idx1 = 0; // Checking one above
	var tmp_vec_idx2 = 0; // checking one below
	var tmp_vec_idx3 = 0; // checking 2 below or above (depending on the results of the last two)

	while (i < 5)
	{
	    // Node from the winning line
	    tmp_idx = pawn_idx + (this.moves[idx][0] == 0 ? this.moves[idx][0] : (this.moves[idx][0] > 0 ? this.moves[idx][0] + i : this.moves[idx][0] - i)) +
		((this.moves[idx][1] == 0 ? this.moves[idx][1] : (this.moves[idx][1] > 0 ? this.moves[idx][1] + i : this.moves[idx][1] - i)) * this.col_nb);

	    // Perpendicular node (positive)
	    tmp_vec_idx1 = tmp_idx + (norm_vec[0] == 0 ? norm_vec[0] : (norm_vec[0] > 0 ? norm_vec[0] + 1 : norm_vec[0] - 1)) +
                ((norm_vec[1] == 0 ? norm_vec[1] : (norm_vec[1] > 0 ? norm_vec[1] + 1 : norm_vec[1] - 1)) * this.col_nb);

	    // Perpendicular node (negative)
	    tmp_vec_idx2 = tmp_idx + (oppo_vec[0] == 0 ? oppo_vec[0] : (oppo_vec[0] > 0 ? oppo_vec[0] + 1 : oppo_vec[0] - 1)) +
                ((oppo_vec[1] == 0 ? oppo_vec[1] : (oppo_vec[1] > 0 ? oppo_vec[1] + 1 : oppo_vec[1] - 1)) * this.col_nb);
	    
	    if (this.map[tmp_vec_idx1] == this.activePlayer + 1)
	    {
		tmp_vec_idx3 = tmp_idx + (norm_vec[0] == 0 ? norm_vec[0] : (norm_vec[0] > 0 ? norm_vec[0] + 2 : norm_vec[0] - 2)) +
                ((norm_vec[2] == 0 ? norm_vec[2] : (norm_vec[2] > 0 ? norm_vec[2] + 2 : norm_vec[2] - 2)) * this.col_nb); // Second allied pawn is in normal vector direction
		    // check si bonne position pour être dans un cinq cassable (actuellement -> X00*) | ne reste plus qu'à checker l'étoile
		    if (this.map[tmp_vec_idx3] != this.activePlayer + 1 && this.map[tmp_vec_idx3] != 0)
			if (this.map[tmp_vec_idx2] != this.activePlayer + 1 && this.map[tmp_vec_idx2] != 0)
			    return true;
	    }
	    else if (this.map[tmp_vec_idx1] != 0)
	    {
		tmp_vec_idx3 = tmp_idx + (oppo_vec[0] == 0 ? oppo_vec[0] : (oppo_vec[0] > 0 ? oppo_vec[0] + 2 : oppo_vec[0] - 2)) +
                    ((oppo_vec[2] == 0 ? oppo_vec[2] : (oppo_vec[2] > 0 ? oppo_vec[2] + 2 : oppo_vec[2] - 2)) * this.col_nb); // Second allied pawn is in opposite vector direction
		    // check si bonne position pour être dans un cinq cassable (actuellement -> X00*) | ne reste plus qu'à checker l'étoile
		    if (this.map[tmp_vec_idx3] != this.activePlayer + 1 && this.map[tmp_vec_idx3] != 0)
			if (this.map[tmp_vec_idx2] == this.activePlayer + 1)
			    return true;
	    }
	    
	    i += 1;
	}
	return false;
    }

    this.areThereFivePawn = function (pawn_index) {
	// Problème possible si sur le bord (!!!!!!!!!!!!!!)
	var i = 0;

	while (i < 8)
	    {
		if (checkLineForPawn(pawn_index, this.moves[i][0], this.moves[i][1], 5, this.activePlayer + 1) == true)
		{
		    if (checkIfWon(i) == false)
			return false;
		    return true;
		}
		i += 1;
	    }
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
