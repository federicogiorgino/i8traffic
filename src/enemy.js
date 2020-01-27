"use strict";

function Enemy(canvas, x, speed, imageSrc) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.height = 100;
  this.width = 45;
  this.x = x;
  this.y = 0 - this.height;
  this.speed = speed;
  this.enemyImage = new Image();
  this.enemyImage.src = imageSrc;
}

Enemy.prototype.draw = function() {
  this.ctx.drawImage(this.enemyImage, this.x, this.y, this.width, this.height);
};

Enemy.prototype.updatePosition = function() {
  this.y += this.speed;
  // this.x = this.x - this.speed;
};

Enemy.prototype.isInsideScreen = function() {
  return this.x + this.height / 2 > 0;
  // return this.x + this.size / 2 > 0;
};
