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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.valueMap = [];
    
    this.clearBoard = function() {
	var i = 0;
	
        while (i < this.col_nb * this.line_nb)
        {
            this.map[i] = 0;
            i += 1;
        }
    }
    
    this.emptyArray = function(map) {
	var i = 0;
	var y = 0;

	while (i < 19)
	{
	    y = 0;
	    while (y < 19)
	    {
		if (map[i][y] != 0)
		    return false;
		y += 1;
	    }
	    i += 1;
	}
	return true;
    }
    
    this.assignValue = function(x, y)
    {
	var i = 0;
	var value = 0;

	while (i < 8)
	{
	    if (this.map[x + this.moves[i][0]], this.map[y + this.moves[i][1]])
		value += 1;
	    i += 1;
	}
	return value;
    }

    this.findPlay = function() {
	if (this.emptyArray(this.map) == true)
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
		if (tmp > maxValue)
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
