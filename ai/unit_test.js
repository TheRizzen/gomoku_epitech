function testIA() {
    this.moves = [
	[1, 1],
        [0, 1],
        [1, 0],
	[1, -1],
        [-1, -1],
        [0, -1],
	[-1, 0],
        [-1, 1],
        ];

    this.pawnTaken = 0;
    
    this.map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

        this.value = {
	    'eaten' : 42,
	    '4pawns' : 150,
	    '3pawns' : 100,
	    'eatpawn' : 50,
	    '2for2pawns' : 25,
	    'middle_xy' : 10,
	    'pawnCoef' : 20,
     };

    this.valueMap = [];
    
    this.isTherePawnAround = function(x, y) {
	var i = 0;

	while (i < 8)
	{
	    if ((x + this.moves[i][0] >= 0) && (y + this.moves[i][1] >= 0) && 
		(x + this.moves[i][0] <= 18) && (y + this.moves[i][1] <= 18))
		if (this.map[x + this.moves[i][0]][y + this.moves[i][1]] != 0)
		    return 1;
	    i += 1;
	}
	return 0;
    }

    this.clearArray = function(array) {
	var i = 0;
	var y = 0;
	
        while (i < 19)
        {
	    y = 0;
	    while (y < 19)
	    {
		array[i][y] = 0;
		y += 1;
	    }
            i += 1;
        }
    }
    
    this.emptyMap = function() {
	var i = 0;
	var y = 0;

	while (i < 19)
	{
	    y = 0;
	    while (y < 19)
	    {
		if (this.map[i][y] != 0)
		    return false;
		y += 1;
	    }
	    i += 1;
	}
	return true;
    }
    
    this.getIndexWithVector = function(pawn_idx, vec, inc) {
        return (pawn_idx + (vec[0] == 0 ? vec[0] : (vec[0] > 0 ? vec[0] + inc : vec[0] - inc)) + ((vec[1] == 0 ? vec[1] : (vec[1] > 0 ? vec[1] + inc : vec[1] - inc)) * this.col_nb));
    }
    
    this.getNumOfIden = function(vec, pawn_idx, pawn_type) {
	var i = 0;

	while (this.map[this.getIndexWithVector(pawn_idx, vec, i)] == pawn_type)
	    i += 1;
	return i;
    }

    this.checkLineForPawn = function(x, y, inc_x, inc_y, max, tileType) {
	var i = 0;
	var cnt = 0;

	while (cnt < max)
	{
/*	    console.log('[' + x + ']' + '[' + y + ']');
	    console.log('vecteur = ' + inc_x + '/'+ inc_y);
	    console.log("MAp : " + this.map[(x + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i)))][(y + (inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i)))])
	    console.log("X : " + (x + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i))) + " Y : "  + (y + (inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i))))*/
	    if (this.map[(x + (inc_x == 0 ? inc_x : (inc_x > 0 ? inc_x + i : inc_x - i)))][(y + (inc_y == 0 ? inc_y : (inc_y > 0 ? inc_y + i : inc_y - i)))] != tileType)
		return false;
	    i += 1;
	    cnt += 1;
	}
	return true;
    }
	
    this.checkVectorForFive = function(x, y, vec1, vec2, playNum, size) {
	var vec1_max = size;
	var vec2_max = 0;

	while (vec2_max <= size)
	{
	    if (this.checkLineForPawn(x, y, this.moves[vec1][0], this.moves[vec1][1], vec1_max, playNum) == true)
	    {
		if (this.checkLineForPawn(x, y, this.moves[vec2][0], this.moves[vec2][1], vec2_max, playNum) == true)
		    return true;
	    }
	    vec1_max -= 1;
	    vec2_max += 1;
	}
	return false;
    };
    
    this.areThereFivePawn = function (x, y, size, player) {
	// Problème possible si sur le bord (!!!!!!!!!!!!!!)
	if (this.checkVectorForFive(x, y, 0, 4, player, size) == true)
	    return true;
	if (this.checkVectorForFive(x, y, 1, 5, player, size) == true)
	    return true;
	if (this.checkVectorForFive(x, y, 2, 6, player, size) == true)
	    return true;
	if (this.checkVectorForFive(x, y, 3, 7, player, size) == true)
	    return true;
	return false;
    };

    this.get1DP = function(x, y) {
	return (x + y * this.col_nb);
    }
    
    this.getVectorVal = function(x, vector, inc) {
	return (x + (vector == 0 ? vector : (vector > 0 ? vector + inc : vector - inc)));
}

    this.vulnerablePawn = function(x, y, player, player2, map) {
	var i = 0;

	while (i < 8)
	{
	    if (map[this.getVectorVal(x, this.moves[i][0], 0)][this.getVectorVal(y, this.moves[i][1], 0)] == player)
		if (map[this.getVectorVal(x, this.moves[i][0], 1)][this.getVectorVal(y, this.moves[i][1], 1)] == player2)
		    if (map[this.getVectorVal(x, this.moves[(i > 3 ? i - 4 : i + 4)][0], 1)][this.getVectorVal(y, this.moves[(i > 3 ? i - 4 : i + 4)][1], 1)] == 0)
			return true;
	    i += 1;
	}
	return false;
    }

    this.arePawnTaken = function(x, y, player, map) {
	var i = 0;
	
	while (i < 8)
        {
            if (map[this.getVectorVal(x, this.moves[i][0], 0)][this.getVectorVal(y, this.moves[i][1], 0)] != player && map[x + this.moves[i][0]][y + this.moves[i][1]] != 0)
                if (map[this.getVectorVal(x, this.moves[i][0], 1)][this.getVectorVal(y, this.moves[i][1], 1)] != player &&
		    map[this.getVectorVal(x, this.moves[i][0], 1)][this.getVectorVal(y, this.moves[i][1], 1)] != 0)
                    if (map[this.getVectorVal(x, this.moves[i][0], 2)][this.getVectorVal(y, this.moves[i][1], 2)] == player)
            {
		return true;
            }
            i += 1;
        }
        return false;
    }

    this.assignValue = function(x, y, player) {
	var value = 0;
	var player2 = 0;
	// DUPLICATE MAP TO CHANGE FREELY
	var dupMap = this.map.slice(0);

//	console.log('[' + x + ']' + '[' + y + ']');
	player == 1 ? player2 = 2 : player2 = 1;
	
	// Je peux me faire manger
	if (this.vulnerablePawn(x, y, player, player2, this.map) == true)
	{
	    value -= this.value['eaten'];
	}
	
	// je Peux manger deux pions
	if (this.arePawnTaken(x, y, player, this.map) == true)
	{
	    value += (this.pawnTaken * this.value['pawnCoef'])
	}

	if (x >= 7 && x <= 12)
	    value += this.value['middle_xy'];
	if (y >= 7 && y <= 12)
	    value += this.value['middle_xy'];
	//check si deja 4 en lignes pour apporter le point gagnant ?
	if ((this.areThereFivePawn(x, y, 4, player)) == true)
	{
	    value += this.value['4pawns'];
	}
	//check si deja 3 en ligne et aucun autre pion ennemie aux extremité une future defaite a l'ennemie	
	if ((this.areThereFivePawn(x, y, 3, player)) == true)
	{
	    value += this.value['3pawns'];
	}
	
	return [x, y, value];
    }
    
    this.getMax = function(x, y, pawn_type, depth) {
	if (depth == 0)
	    return this.assignValue(x, y, pawn_type);

	var max = -10000;
	var maxI = 0;
	var maxJ = 0;
	var i = 0;
	var j;
	var tmp;

	while (i < 19)
	{
	    j = 0;
	    while (j < 19)
	    {
		if (this.map[i][j] == 0 && this.isTherePawnAround(i, j) == 1)
		{
		    this.map[i][j] = pawn_type;
		    tmp = this.getMin(x, y, (pawn_type == 1 ? 2 : 1), depth - 1);
		    
		    if (tmp[2] > max && Math.floor((Math.random() * 10) + 1) % 2 == 0)
		    {
			maxI = i;
			maxj = j;
			max = tmp[2];
		    }
		    this.map[i][j] = 0;
		}
		j += 1;
	    }
	    i += 1;
	}
	return [maxI, maxJ, max];
    }

    this.getMin = function(x, y, pawn_type, depth) {
	if (depth == 0)
	    return this.assignValue(x, y, pawn_type);

	var min = 100000;
	var maxI = 0;
	var maxJ = 0;
	var i = 0;
	var j;
	var tmp;

	while (i < 19)
	{
	    j = 0;
	    while (j < 19)
	    {
		if (this.map[i][j] == 0 && this.isTherePawnAround(i, j) == 1)
		{
		    this.map[i][j] = pawn_type;
		    tmp = this.getMax(x, y, (pawn_type == 1 ? 2 : 1), depth - 1);

		    if (tmp[2] < min && Math.floor((Math.random() * 10) + 1) % 2 == 1)
		    {
			maxI = i;
			maxj = j;
			min = tmp[2];
		    }
		    this.map[i][j] = 0;
		}
		j += 1;
	    }
	    i += 1;
	}
	return [maxI, maxJ, min];
    }

    this.minMaxLoop = function(depth, pawn_type) {
	var max = -10000;
	var tmp;
	var maxX = -1;
	var maxY = -1;
	var i = 0;
	var j;

	while (i < 19)
	{
	    j = 0;
	    while (j < 19)
	    {
		if (this.map[i][j] == 0 && this.isTherePawnAround(i, j) == 1)
		{
		    this.map[i][j] = 1;
		    tmp = this.getMin(i, j, pawn_type, depth - 1);
		    if (tmp[2] > max && Math.floor((Math.random() * 10) + 1) % 2 == 0)
		    {
			max = tmp[2];
			maxX = i;
			maxY = j;
		    }
		    this.map[i][j] = 0;
		}
		j += 1;
	    }
	    i += 1;
	}
	return [maxX, maxY];
    }

    this.findPlay = function(pawn_type, pawnTaken) {
	if (this.emptyMap() == true)
	    return ([18 / 2, 18 / 2]);

	var depth = 2;
	this.pawnTaken = pawnTaken;
	return this.minMaxLoop(depth, pawn_type);
    }
};

exports = module.exports = testIA;
