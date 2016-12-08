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

<<<<<<< Updated upstream
    this.assignValue = function(x, y, map)
    {
	var i = 0;
	var value = 0;
	var xmp = 0;
	var ymp = 0;
=======
<<<<<<< HEAD
    this.checkLineForPawn = function(x, y, inc_x, inc_y, max, tileType) {
	var i = 0;
	var cnt = 0;
=======
    this.assignValue = function(x, y)
    {
	var i = 0;
	var value = 0;
>>>>>>> a8d67134341ce7774a9d580ed3d094989cbee1f4

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
    
    this.arePawnTaken = function(x, y, player, map) {
	var i = 0;
	
	var pawn_index = this.get1DP(x, y);
	var taken = [];
	var nb = 0;
	var x2 = 0;
	var y2 = 0;
>>>>>>> Stashed changes

	while (i < 8)
	{
	    if ((x + this.moves[i][0] >= 0) && (y + this.moves[i][1] >= 0) && 
	       (x + this.moves[i][0] <= 18) && (y + this.moves[i][1] <= 18))
	    {
		xmp = x + this.moves[i][0];
		ymp = y + this.moves[i][1];
		if (map[xmp][ymp] != 0)
		    value += 1;
	    }
	    i += 1;
	}
<<<<<<< Updated upstream
	return value;
=======
	return false;
    };

	
    this.assignValue = function(x, y, map, player) {
	var value = 0;
	var player2 = 0;
	var dupMap = this.map.slice(0);

	console.log('[' + x + ']' + '[' + y + ']');
	player == 1 ? player2 = 2 : player2 = 1;
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
	//check si on se fait manger ou non après avoir poser un pion
	if ((this.arePawnTaken(x, y, player, dupMap) == true))
	    value += this.value['eatpawn'];
	//CETTE PARTIE TROUVE DES ERREURS OU FAUT PAS PCK TON CHECK SI TU PEUX MANGER REGARDEr pas ALL CASES
/*	console.log('CHECK bad Moves : ');
	dupMap[y][x] = player;
	if ((this.arePawnTaken(x - 1, y, player2, dupMap) == true) && (this.areThereFivePawn(x - 1, y, 3, player) == false))
	{
	    value -= this.value['2for2pawns'];
	    console.log('enter bad move 1');
	}
	if ((this.arePawnTaken(x, y - 1, player2, dupMap) == true) && (this.areThereFivePawn(x, y - 1, 3, player) == false))
	{
	    value -= this.value['2for2pawns'];
	    console.log('enter bad move 2');
	}
	if ((this.arePawnTaken(x + 1, y, player2, dupMap) == true) && (this.areThereFivePawn(x + 1, y, 3, player) == false))
	{
	    value -= this.value['2for2pawns'];
	    console.log('enter bad move 3');
	}
	if ((this.arePawnTaken(x, y + 1, player2, dupMap) == true) && (this.areThereFivePawn(x, y + 1, 3, player) == false))
	{
	    value -= this.value['2for2pawns'];
	    console.log('enter bad move 4');
	}
	dupMap[y][x] = 0;*/
	if (this.map[x + this.moves[i][0]][y + this.moves[i][1]] != 0)
	    value += 1;
	i += 1;
	return [x, y, value];
>>>>>>> Stashed changes
    }
	
    this.determineBestMove = function(resArray, valArray) {
	return [0, 0];
    }
    
/*    this.minMaxLoop = function(depth, supResult, supValue, pawn_type, minMax) {
	var y = 0;
	var x = 0;
	var arrInc = 0;
	var resultArray = [];
	var valueArray = [];
	var dupMap;

	if (supResult[0] != 0 && supResult[1] != 0)
	{
	    dupMap = this.map.slice(0);
	    console.log(supResult);
	    dupMap[supResult[0]][supResult[1]] == pawn_type;
	}
	else
	    dupMap = this.map;

	if (depth > 0)
	{
	    while (x < 19)
	    {
		y = 0;
		while (y < 19)
		{
		    if (this.isTherePawnAround(x, y) == 1)
		    {
<<<<<<< Updated upstream
			valueArray[arrInc] = this.assignValue(x, y, this.map);
=======
<<<<<<< HEAD
			console.log("x : " + x + " | y : " + y);
			valueArray[arrInc] = this.assignValue(x, y, this.map, 1);
=======
			valueArray[arrInc] = this.assignValue(x, y, dupMap, pawn_type);
>>>>>>> a8d67134341ce7774a9d580ed3d094989cbee1f4
>>>>>>> Stashed changes
			resultArray[arrInc] = [x, y];
			arrInc += 1;
		    }
		    y += 1;
		}
		x += 1;
	    }

	    if (arrInc > 0)
	    {
		var tmpInc = arrInc + 1;
		var recursResult = [];
		var resultInc = 0;

		while (tmpInc > 0)
		{
		    recursResult[resultInc] = this.minMaxLoop(depth - 1, valueArray[tmpInc - 1], supResult[tmpInc - 1], pawn_type == 1 ? 2 : 1, minMax ^ 1);
		    tmpInc -= 1;
		    resultInc += 1;
		}
		
	    }
	}

	console.log(valueArray);
	console.log(resultArray);

	var result = this.determineBestMove(resultArray, valueArray, minMax);
	return result;
    }*/
    
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

    this.findPlay = function(pawn_type) {
	if (this.emptyMap() == true)
	    return ([18 / 2, 18 / 2]);

	var depth = 2;
	return this.minMaxLoop(depth, pawn_type);
    }
};

exports = module.exports = testIA;
