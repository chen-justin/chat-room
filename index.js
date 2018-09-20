var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var users = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  users[socket.id] = "guest";
  console.log(users);

  socket.on('disconnect', function(){
    delete users[socket.id];
    console.log(users);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', users[socket.id] + ": " + msg);
  });

  socket.on('change name', function(name){
    users[socket.id] = name;
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
