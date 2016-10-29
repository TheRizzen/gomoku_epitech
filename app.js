var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Game = require('./Game/game.js');

games = [];
games.push(new Game("room #0"));

var join = require('./Game/join.js')(io, games);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

http.listen(8080, function() {});
