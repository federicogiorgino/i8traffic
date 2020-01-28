"use strict";

function Bonus(canvas, x, speed, imageSrc) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 80;
  this.width = 45;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.bonusImage = new Image();
  this.bonusImage.src = imageSrc;
}

Truck.prototype.draw = function() {
  this.ctx.drawImage(this.bonusImage, this.x, this, y, this.width, this.height);
};

Truck.prototype.updatePosition = function() {
  this.y += this.speed;
};

Truck.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
};
