var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = require('./Game/game.js');
var join = require('./Game/join.js')(io);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

http.listen(8080, function() {});
