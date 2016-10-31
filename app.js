var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Game = require('./Game/game.js');

app.use(express.static(path.join(__dirname, 'public')));

games = [];
games.push(new Game("room #0"));

var handler = require('./Game/handler.js')(io, games);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

http.listen(8080, function() {});
