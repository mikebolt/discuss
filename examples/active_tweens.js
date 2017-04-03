var startTime;

var duration = 4.0;

function renderDemo(time, context, passiveSource, passiveDestination) {
    if (startTime === undefined) {
        startTime = time;
    }

    var deltaTime = (time - startTime) / 1000.0;

    var animationTime = deltaTime % duration;
    var progress = animationTime / duration;
    
    var width = context.canvas.width;
    var height = context.canvas.height;
    
    // Clear the canvas
    context.clearRect(0, 0, width, height);
    
    // Calculate the object positions.
    var sourceX = width / 8;
    var sourceY = height / 8;
    var activeSourceY = (height / 8) + progress * 6 * height / 8;
    
    if (!passiveSource) {
        sourceY = activeSourceY;
    }
    
    var destinationX = 7 * width / 8;
    var destinationY = 7 * height / 8;
    var activeDestinationY = 7 * height / 8 - progress * 6 * height / 8;
    
    if (!passiveDestination) {
        destinationY = activeDestinationY;
    }
    
    var objectX = (1 - progress) * sourceX + progress * destinationX;
    var objectY = (1 - progress) * sourceY + progress * destinationY;
    
    // Draw the source object.
    context.strokeStyle = 'green';
    context.strokeRect(sourceX - 10, activeSourceY - 10, 20, 20);
    
    // Draw the destination object.
    context.strokeStyle = 'darkred';
    context.strokeRect(destinationX - 10, activeDestinationY - 10, 20, 20);
    
    // Draw the tweened object.
    context.strokeStyle = 'blue';
    context.beginPath();
    context.arc(objectX, objectY, 10, 0, 2 * Math.PI);
    context.stroke();
}

var canvasPSPD = document.getElementById('canvasPSPD');
var canvasPSAD = document.getElementById('canvasPSAD');
var canvasASPD = document.getElementById('canvasASPD');
var canvasASAD = document.getElementById('canvasASAD');

var contextPSPD = canvasPSPD.getContext('2d');
var contextPSAD = canvasPSAD.getContext('2d');
var contextASPD = canvasASPD.getContext('2d');
var contextASAD = canvasASAD.getContext('2d');

function animate(time) {
    renderDemo(time, contextPSPD, true, true);
    renderDemo(time, contextPSAD, true, false);
    renderDemo(time, contextASPD, false, true);
    renderDemo(time, contextASAD, false, false);
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);