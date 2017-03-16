var express = require('express');
var io = require('socket.io');
var app = express();
var port = 3000;

app.get('/', function(req, res) {
	res.send('Hellow World!');
});

app.get('/draw', function(req, res) {

});

app.listen(port);


