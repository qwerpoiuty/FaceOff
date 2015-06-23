var socketio = require('socket.io');

var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);
var io = socketio(server);
var board = []
io.on('connection', function (socket) {
    // This function receives the newly connected socket.
    // This function will be called for EACH browser that connects to our server.
    socket.on('answer',function(xlocation){
    	socket.broadcast.emit('getAttack',xlocation)
    })

    socket.on('location',function(xlocation){
    	socket.broadcast.emit('enemylocated',xlocation)
    })


});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});




module.exports = app;