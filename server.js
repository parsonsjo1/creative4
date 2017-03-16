var express = require('express');
var io = require('socket.io');
var app = express();
var port = 3000;

app.use(express.static(__dirname + "/app")); 
app.use("/node_modules", express.static(__dirname + "/node_modules")); 

var ios = io.listen(app.listen(port));
console.log("listening on " + port);

// Connection handler. A socket refers to individual clients
ios.sockets.on('connection', function(socket) {
	socket.on('drawClick', function(data) {
		console.log(data);
		socket.broadcast.emit('draw', {
			x: data.x,
			y: data.y,
			type: data.type
		});
	});
});


