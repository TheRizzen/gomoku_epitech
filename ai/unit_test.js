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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
		if (this.map[xmp][ymp] != 0)
		    value += 1;
	    }
	    i += 1;
	}
	return value;
    }
    
    this.findPlay = function() {
	if (this.emptyMap() == true)
	    return ([18 / 2, 18 / 2]);

	var x = 0;
	var y = 0;
	var maxX = 0;
	var maxY = 0;
	var maxValue = 0;
	var tmp;
	while (x < 19)
	{
	    y = 0;
	    while (y < 19)
	    {
		tmp = this.assignValue(x, y);
		if (tmp > maxValue && this.map[x][y] == 0)
		{
		    maxX = x;
		    maxY = y;
		    maxValue = tmp;
		}
		y += 1;
	    }
	    x += 1;
	}
	var result = [maxX, maxY];
	return result;
    }
};

exports = module.exports = testIA;
