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

    this.assignValue = function(x, y, map)
    {
	var i = 0;
	var value = 0;
	var xmp = 0;
	var ymp = 0;

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
	return value;
    }
    
    this.determineBestMove = function(resArray, valArray) {
	return [0, 0];
    }
    
    this.minMaxLoop = function(depth) {
	var y = 0;
	var x = 0;
	var arrInc = 0;
	var resultArray = [];
	var valueArray = [];

	if (depth > 0)
	{
	    while (x < 19)
	    {
		y = 0;
		while (y < 19)
		{
		    if (this.isTherePawnAround(x, y) == 1)
		    {
			valueArray[arrInc] = this.assignValue(x, y, this.map);
			resultArray[arrInc] = [x, y];
			arrInc += 1;
		    }
		    y += 1;
		}
		x += 1;
	    }
	}

	console.log(valueArray);
	console.log(resultArray);

	var result = this.determineBestMove(resultArray, valueArray);
	return result;
    }
    
    this.findPlay = function() {
	if (this.emptyMap() == true)
	    return ([18 / 2, 18 / 2]);

	var depth = 2;

	return this.minMaxLoop(depth);
    }
};

exports = module.exports = testIA;
