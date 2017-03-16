// Javascript/JQuery Code

var context = $('#canvas').get(0).getContext("2d");
console.log(context);

//Set preferences for line drawing
context.fillStyle = "solid";
context.strokeStyle = "#000";
context.lineWidth = 10;
context.lineCap = "round";

//Create connection
var socket = io.connect('http://localhost:3000');
//Listen for draw
socket.on('draw', function(data) {
	return draw(data.x, data.y, data.type);
});

//Draw Functionality
var draw = function(x, y, type) {
	if(type === "mousedown") {
		context.beginPath();
	} else if(type === "mousemove") {
		context.lineTo(x,y);
		return context.stroke();
	} else {
		return context.closePath();
	}
};

$('#body-container').on('mousedown mousemove mouseup', 'canvas', function(event) {
  console.log(event);
  console.log($('#canvas'));

  var type = event.handleObj.type;
  event.offsetX = event.pageX - $('#canvas').get(0).offsetLeft;
  event.offsetY = event.pageY - $('#canvas').get(0).offsetTop;
  var x = event.offsetX;
  var y = event.offsetY;
  draw(x, y, type);
  socket.emit('drawClick', {
    x: x,
    y: y,
    type: type
  });
});
