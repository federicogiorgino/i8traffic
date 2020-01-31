"use strict";

function Ambulance(canvas, x, speed, imageSrc) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 150;
  this.width = 75;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.ambulanceImage = new Image();
  this.ambulanceImage.src = imageSrc;
}

Ambulance.prototype.draw = function() {
  this.ctx.drawImage(this.ambulanceImage, this.x, this.y, this.width, this.height);
};

Ambulance.prototype.updatePosition = function() {
  this.y += this.speed;
};

Ambulance.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
};
