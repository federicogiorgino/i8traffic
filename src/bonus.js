"use strict";

function Bonus(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 50;
  this.width = 50;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.bonusImage = new Image();
  this.bonusImage.src = "./img/life.png";
}

Bonus.prototype.draw = function() {
  this.ctx.drawImage(this.bonusImage, this.x, this.y, this.width, this.height);
};

Bonus.prototype.updatePosition = function() {
  this.y += this.speed;
};

Bonus.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
};
