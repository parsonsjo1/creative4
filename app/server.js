var express = require('express');
var io = require('socket.io');
var app = express();
var port = 3000;

app.get('/', function(req, res) {
	res.send('Hellow World!');
});

app.get('/draw', function(req, res) {

});

io.listen(app.listen(port));

// Connection handler. A socket refers to individual clients
io.sockets.on('connection', function(socket) {
	socket.on('drawClick', function(data) {
		console.log(data);
		socket.broadcast.emit('draw', {
			x: data.x,
			y: data.y,
			type: data.type
		});
	});
});


