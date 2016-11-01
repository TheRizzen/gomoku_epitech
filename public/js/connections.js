var chatlog = document.getElementById('chatlog');

var playerid = 0;
var started = false;

socket.on('connected', function (data) {
  var elem2 = document.createElement('li');
  elem2.appendChild(document.createTextNode('Room #' + data.room));
  chatlog.appendChild(elem2);
  var elem = document.createElement('li');
  elem.appendChild(document.createTextNode('User #' + data.user));
  chatlog.appendChild(elem);
  playerid = data.user;
  if (data.user == 1) {
    var elem = document.createElement('li');
    elem.appendChild(document.createTextNode('Waiting for the player #2 ...'));
    chatlog.appendChild(elem);
  }
});

socket.on('starting', function () {
  var elem = document.createElement('li');
  elem.appendChild(document.createTextNode('Room is full, Game is about to begin...'));
  chatlog.appendChild(elem);
  started = true;
});

socket.on('disconnected', function(data){
  var elem = document.createElement('li');
  elem.appendChild(document.createTextNode('Player #' + data.name + ' has left. Reason: ' + data.reason));
  chatlog.appendChild(elem);
  started = false;
});
