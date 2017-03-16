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
	if(type === "dragstart") {
		context.beginPath();
	} else if(type === "drag") {
		context.lineTo(x,y);
		return context.stroke();
	} else {
		return context.closePath();
	}
};

$('#body-container').on('click', 'canvas', 'drag dragstart dragend', function(event) {
  var offset, type, x, y;
  type = event.handleObj.type;
  offset = $(this).offset();
  event.offsetX = event.layerX - offset.left;
  event.offsetY = event.layerY - offset.top;
  x = event.offsetX;
  y = event.offsetY;
  console.log(event);
  console.log(x);
  console.log(y);
  draw(x, y, type);
  socket.emit('drawClick', {
    x: x,
    y: y,
    type: type
  });
});
