var now = require("performance-now");
var ai = require('./ai.js');

test = new ai();
var pawn_type = 2;
var pawnTaken = 8;
var start = now();
var result = test.findPlay(pawn_type, pawnTaken);
var end = now();

console.log(result);
console.log("AI execute time : " + (end - start).toFixed(3));
