"use strict";

function PowerUp(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 40;
  this.width = 40;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.powerUpImage = new Image();
  this.powerUpImage.src = "./img/points.png";
}

PowerUp.prototype.draw = function() {
  this.ctx.drawImage(this.powerUpImage, this.x, this.y, this.width, this.height);
};

PowerUp.prototype.updatePosition = function() {
  this.y += this.speed;
};

PowerUp.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
};
