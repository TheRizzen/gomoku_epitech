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

    this.get2DMap = function(map) {
	var D2Map = [];
	var x;
	var y = 0;
	var i = 0;

	while (y < this.line_nb)
	    {
		x = 0;
		while (x < this.col_nb)
		    {
			D2Map[y][x] = map[i];
			i += 1;
			x += 1;
		    }
		y += 1;
	    }
	return (D2Map);
    }

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

    this.removeTwoPawn = function(x, y, inc_x, inc_y) {
	var i = 0;
	var taken = [0, 0, 0, 0]
	var pawn_index = this.get1DP(x, y);

	this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))
                                   + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - 1)) * this.col_nb)] = 0;
	taken[0] = x + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i));
	taken[1] = y + (inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i));
	i += 1;
	this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))
                                   + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - 1)) * this.col_nb)] = 0;
	taken[2] = x + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i));
	taken[3] = y + (inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i));
	return taken;
    };


    this.isThisFreeThree = function(pawn_idx, vec) {
	var opp_vec = [vec[0] * -1][vec[1] * -1];
	var pawn_cnt = 1;

	while (0 > 1)
	    {
		if (this.map[pawn_idx + (vec[0] == 0 ? vec[0] : (vec[0] > 0 ? vec[0] + i : vec[0] - i))
                                   + ((vec[1] == 0 ? vec[1] : (vec[1] > 0 ? vec[1] + i : vec[1] - 1))
				      * this.col_nb)])
		    pawn_cnt += 1;
	    }
	return (false);
    }

    this.twoFreeThreeRule = function(pawn_index) {
	var i = 0;
	var cnt = 0;

	while (i < 8)
	    {
		if (cnt >= 2)
		    return true;
		if (isThisFreeThree(pawn_index, this.moves[i]) == true)
		    cnt += 1;
		i += 1;
	    }
	return false;
    }

    this.arePawnTaken = function(x, y) {
	var i = 0;

	var pawn_index = this.get1DP(x, y);
	var taken = [-1,-1];
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
				     ((this.moves[i][1] == 0 ? this.moves[i][1] : (this.moves[i][1] > 0 ? this.moves[i][1] + 2 : this.moves[i][1] - 2)) * this.col_nb)] == this.activePlayer + 1)
                {
                    taken = this.removeTwoPawn(x, y, this.moves[i][0], this.moves[i][1]);
		    this.players[this.activePlayer].pawn += 2;
                    return taken;
                };
		i += 1;
	    }
	return taken;
    };
    
    this.checkLineForPawn = function(pawn_index, inc_x, inc_y, max, tileType) {
	var i = 0;
	var cnt = 0;

	while (cnt < max)
	    {
/*		console.log("Check");
		console.log(pawn_index);
		console.log(pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i)) + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i)) * this.col_nb));
		console.log(this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i)) + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i)) * this.col_nb)]);*/
		// Check des bord ?? :3
		if (this.map[pawn_index + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))
                             + ((inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i)) * this.col_nb)] != tileType)
		    return false;
		i += 1;
		cnt += 1;
	    }
	return true;
    };

    this.checkIfWon = function(idx, pawn_idx) {
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
	    tmp_vec_idx1 = tmp_idx + norm_vec[0] + (norm_vec[1] * this.col_nb);

	    // Perpendicular node (negative)
	    tmp_vec_idx2 = tmp_idx + oppo_vec[0] + (oppo_vec[1] * this.col_nb);
	    
/*	    console.log("node from line : " + tmp_idx);
	    console.log("pos perp node : " + tmp_vec_idx1 + " -> " + this.map[tmp_vec_idx1]);
	    console.log("neg perp node : " + tmp_vec_idx2 + " -> " + this.map[tmp_vec_idx2]);*/
	    if (this.map[tmp_vec_idx1] == this.activePlayer + 1 || (this.map[tmp_vec_idx2] != this.activePlayer + 1 && this.map[tmp_vec_idx2] != 0))
	    {
		tmp_vec_idx3 = tmp_idx + (norm_vec[0] == 0 ? norm_vec[0] : (norm_vec[0] > 0 ? norm_vec[0] + 1 : norm_vec[0] - 1)) +
                    ((norm_vec[1] == 0 ? norm_vec[1] : (norm_vec[1] > 0 ? norm_vec[1] + 1 : norm_vec[1] - 1)) * this.col_nb); // Second allied pawn is in normal vector direction
		// check si bonne position pour être dans un cinq cassable (actuellement -> X00*) | ne reste plus qu'à checker l'étoile
		    if (this.map[tmp_vec_idx3] != this.activePlayer + 1 && this.map[tmp_vec_idx3] != 0)
			return true;
	    }
	    else if (this.map[tmp_vec_idx1] != 0 || this.map[tmp_vec_idx2] == this.activePlayer + 1)
	    {
		tmp_vec_idx3 = tmp_idx + (oppo_vec[0] == 0 ? oppo_vec[0] : (oppo_vec[0] > 0 ? oppo_vec[0] + 1 : oppo_vec[0] - 1)) +
                    ((oppo_vec[1] == 0 ? oppo_vec[1] : (oppo_vec[1] > 0 ? oppo_vec[1] + 1 : oppo_vec[1] - 1)) * this.col_nb); // Second allied pawn is in opposite vector direction
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

//	console.log("Map :" + this.map);
	while (i < 8)
	    {
		if (this.checkLineForPawn(pawn_index, this.moves[i][0], this.moves[i][1], 4, this.activePlayer + 1) == true)
		{
		    if (this.checkIfWon(i, pawn_index) == true)
		    {
			return false;
		    }
		    return true;
		}
		i += 1;
	    }
	return false;
    };

    this.tenPawnTaken =  function () {
	if (this.players[this.activePlayer].pawn == 10) {
	    console.log("10 Pawn were took. Player : " + this.activePlayer + 1 + " won !");
	    return true;
	}
	return false;
    };
}

exports = module.exports = Game;
