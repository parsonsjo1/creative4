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

$('#body-container').on('mousemove', 'canvas', function(event) {
  var type = event.handleObj.type;
  var position = getMousePosition($('#canvas'), event);
  var x = position.x;
  var y = position.y;
  draw(x, y, type);
  socket.emit('drawClick', {
    x: x,
    y: y,
    type: type
  });
});

function getMousePosition(canvas, evt) {
    //console.log(canvas.get(0).getBoundingClientRect());
    var rect = canvas.get(0).getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.get(0).width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.get(0).height
    };
}

$('#red').click(function() {
  context.strokeStyle = 'red';
});

$('#blue').click(function() {
  context.strokeStyle = 'blue';
});

$('#green').click(function() {
  context.strokeStyle = 'green';
});