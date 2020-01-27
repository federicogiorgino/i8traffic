"use strict";

function Player(canvas, lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.lives = lives;
  this.playerImage = new Image();
  this.playerImage.src = "./img/maincar.png";
  this.width = 46;
  this.height = 87;
  this.x = canvas.width / 2;
  this.y = canvas.height - 100;
  this.direction = 0;
  this.speed = 3;
}

Player.prototype.setDirection = function(direction) {
  if (direction === "right") this.direction = +1;
  else if (direction === "left") this.direction = -1;
  //   else if (direction === "up") this.direction = +1;
  //   else if (direction === "down") this.direction = -1;
};

Player.prototype.didCollide = function(enemy) {
  var playerLeft = this.x;
  var playerRight = this.x + this.width;
  var playerTop = this.y;
  var playerBottom = this.y + this.height;

  var enemyLeft = enemy.x;
  var enemyRight = enemy.x + enemy.width;
  var enemyTop = enemy.y;
  var enemyBottom = enemy.y + enemy.height;

  var meetPointLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;
  var meetPointRight = enemyRight >= playerLeft && enemyRight <= playerRight;
  var meetPointBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;
  var meetPointTop = enemyTop <= playerBottom && enemyTop >= playerTop;

  if ((meetPointLeft || meetPointRight) && (meetPointTop || meetPointBottom)) {
    return true;
  }
  return false;
};

Player.prototype.handleScreenCollision = function() {
  this.x = this.x + this.direction * this.speed;
  //   this.y = this.y + this.direction * this.speed;
  var screenLeft = 0;
  var screenRight = this.canvas.width - this.playerImage.width / 2;
  //   var screenTop = 0;
  //   var screenBottom = this.canvas.height;

  if (this.x > screenRight) this.direction = -1;
  else if (this.x < screenLeft) this.direction = 1;
  //   else if (this.y > screenTop) this.direction = 1;
  //   else if (this.y < screenBottom) this.direction = -1;
};

Player.prototype.removeLife = function() {
  this.lives -= 1;
};

Player.prototype.draw = function() {
  // fillRect(x, y, width, height)
  this.ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
};
