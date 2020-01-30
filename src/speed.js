"use strict";

function SpeedUp(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 50;
  this.width = 50;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.speedUpImage = new Image();
  this.speedUpImage.src = "./img/speed.png";
}

SpeedUp.prototype.draw = function() {
  this.ctx.drawImage(this.speedUpImage, this.x, this.y, this.width, this.height);
};

SpeedUp.prototype.updatePosition = function() {
  this.y += this.speed;
};

SpeedUp.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
};
