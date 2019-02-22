let canvas,
    canvasContext;

const EYE_RADIUS = 60;
const PUPIL_RADIUS = 20;
const LEFT_EYE_X = 320;
const LEFT_EYE_Y = 300;
const RIGHT_EYE_X = 480;
const RIGHT_EYE_Y = 300;
const EYE_BOUNDERY = EYE_RADIUS - PUPIL_RADIUS;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  drawStatic();
  drawPupil(LEFT_EYE_X, LEFT_EYE_Y, LEFT_EYE_X + 20, LEFT_EYE_Y - 20);
  drawPupil(RIGHT_EYE_X, RIGHT_EYE_Y, RIGHT_EYE_X + 20, RIGHT_EYE_Y - 20);

  canvas.addEventListener('mousemove',mouseMoved);
}

function mouseMoved(event) {
  const RECT = canvas.getBoundingClientRect();
  const ROOT = document.documentElement;

  let mouseX = event.clientX - RECT.left - ROOT.scrollLeft;
  let mouseY = event.clientY - RECT.top - ROOT.scrollTop;

  drawStatic();
  drawPupil(LEFT_EYE_X, LEFT_EYE_Y, mouseX, mouseY);
  drawPupil(RIGHT_EYE_X, RIGHT_EYE_Y, mouseX, mouseY);
}

function drawPupil(originX, originY, targetX, targetY) {
  let a = Math.abs(targetX - originX);
  let b = Math.abs(targetY - originY);
  let c = Math.sqrt(a*a + b*b);

  let scale = c / EYE_BOUNDERY * 566 / c;

  let offsetX = (targetX - originX) / scale;
  let offsetY = (targetY - originY) / scale;

  colorCircle(originX + offsetX, originY + offsetY, PUPIL_RADIUS, 'black')
}

function colorRect(topLeftX,topLeftY, width,height, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX,topLeftY,width,height);
}

function colorCircle(centerX,centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}

function drawStatic() {
  colorRect(0,0,canvas.width,canvas.height, 'black');
  colorCircle(LEFT_EYE_X,LEFT_EYE_Y,EYE_RADIUS,'white');
  colorCircle(RIGHT_EYE_X,RIGHT_EYE_Y,EYE_RADIUS,'white');
}
