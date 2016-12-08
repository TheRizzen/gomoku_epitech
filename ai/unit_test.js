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

    this.assignValue = function(x, y)
    {
	var i = 0;
	var value = 0;

	while (i < 8)
	{
	    if ((x + this.moves[i][0] >= 0) && (y + this.moves[i][1] >= 0) && 
	       (x + this.moves[i][0] <= 18) && (y + this.moves[i][1] <= 18))
	    {
		if (this.map[x + this.moves[i][0]][y + this.moves[i][1]] != 0)
		    value += 1;
	    }
	    i += 1;
	}
	return [x, y, value];
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
			valueArray[arrInc] = this.assignValue(x, y, dupMap, pawn_type);
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
