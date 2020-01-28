"use strict";

function Truck(canvas, x, speed, imageSrc) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 150;
  this.width = 65;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.truckImage = new Image();
  this.truckImage.src = imageSrc;
}

Truck.prototype.draw = function() {
  this.ctx.drawImage(this.truckImage, this.x, this.y, this.width, this.height);
};

Truck.prototype.updatePosition = function() {
  this.y += this.speed;
};

Truck.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
};
