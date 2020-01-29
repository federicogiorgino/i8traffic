"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.enemies = [];
  this.bonus = [];
  this.player = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  // this.img = new Image();
  // this.img.src = "./img/Asset1.png";
  this.columnX = [80, 260, 440, 620];
  this.columnIsBusy = [false, false, false, false];
  this.crashSFX = new Audio("./audio/carcrash1.wav");
  this.themeMusic = new Audio("./audio/theme1.wav");
  this.hornSFX = new Audio("./audio/clacson.wav");
  this.score = 0;
}
var img = new Image();
img.src = "./img/Asset1.png";

var backgroundImage = {
  img: img,
  y: 0,
  speed: 16,

  move: function(canvas) {
    this.y += this.speed;
    this.y %= canvas.height;
  },

  draw: function(canvas, ctx) {
    ctx.drawImage(this.img, 0, this.y, canvas.width, canvas.height);
    if (this.speed < 0) {
      ctx.drawImage(this.img, 0, this.y + canvas.height, canvas.width, canvas.height);
    } else {
      ctx.drawImage(this.img, 0, this.y - this.img.height, canvas.width, canvas.height);
    }
  }
};

// Create `ctx`, a `player` and start the Canvas loop
Game.prototype.start = function() {
  // Save reference to canvas and container. Create ctx
  this.canvasContainer = document.querySelector(".canvas-container");
  this.canvas = this.gameScreen.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");

  // Save reference to the score and lives elements
  this.livesElement = this.gameScreen.querySelector(".lives .value");
  this.scoreElement = this.gameScreen.querySelector(".score .value");

  // Set the canvas dimensions to match the parent
  // this.containerWidth = this.canvasContainer.offsetWidth;
  // this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute("width", 750);
  this.canvas.setAttribute("height", 1202);

  // Create a new player for the current game
  this.player = new Player(this.canvas, 3);

  // Event listener callback function
  this.handleKeyDown = function(event) {
    if (event.key === "ArrowLeft") {
      console.log("LEFT");
      this.player.setDirection("left");
    } else if (event.key === "ArrowRight") {
      console.log("RIGHT");
      this.player.setDirection("right");
    } else if (event.which === 32) {
      this.hornSFX.play();
      this.player.setDirection("stop");
    }
  };
  // Add event listener for moving the player
  document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    this.themeMusic.play();
    this.themeMusic.volume = 0.2;
    this.themeMusic.loop = true;
    // 1. Create new enemies randomly
    backgroundImage.move(this.canvas);
    if (Math.random() > 0.94) {
      var randomNum = Math.random();
      if (randomNum > 0 && randomNum < 0.4) {
        this.enemySpawn("./img/car1.png");
      } else if (randomNum > 0.4 && randomNum < 0.7) {
        this.truckSpawn("./img/truck1.png");
      } else if (randomNum > 0.7 && randomNum < 1) {
        this.enemySpawn("./img/ambulance.png");
      }
    }

    if (Math.random() > 0.998) {
      this.bonusSpawn();
    }
    // 2. Check if player had hit any enemy (check all enemies)
    this.checkCollisions();
    // 3. Check if player is going off the screen
    this.player.handleScreenCollision();
    // 5. Check if any enemy is going of the screen
    this.enemies = this.enemies.filter(function(enemy) {
      enemy.updatePosition();
      return enemy.isInsideScreen();
    });
    // 6. Check if any bonus is going off the screen
    this.bonus = this.bonus.filter(function(bonus) {
      bonus.updatePosition();
      return bonus.isInsideScreen();
    });

    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 3. UPDATE THE CANVAS
    //Draw the background
    // this.ctx.drawImage(this.img, 0, 0, 750, 1025);
    backgroundImage.draw(this.canvas, this.ctx);
    // Draw the player
    this.player.draw();
    // Draw the enemies
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });
    // draw the bonus
    this.bonus.forEach(function(bonus) {
      bonus.draw();
    });
    // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
    this.updateGameStats();
  }.bind(this);
  window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function() {
  this.enemies.forEach(function(enemy) {
    if (this.player.didCollide(enemy)) {
      this.crashSFX.volume = 0.5;
      this.crashSFX.play();
      this.player.removeLife();
      enemy.y = 0 - enemy.height;
    }
  }, this);

  this.bonus.forEach(function(bonus) {
    if (this.player.didCollide(bonus)) {
      // this.crashSFX.volume = 0.5;
      // this.crashSFX.play();
      this.player.addLife();
      bonus.y = 0 - bonus.height;
    }
  }, this);

  if (this.player.lives === 0) {
    this.gameOver();
  }
};

Game.prototype.updateGameStats = function() {
  this.score += 5;
  this.livesElement.innerHTML = this.player.lives;
  this.scoreElement.innerHTML = this.score;
};

Game.prototype.passGameOverCallback = function(gameOver) {
  this.onGameOverCallback = gameOver;
};

Game.prototype.gameOver = function() {
  this.gameIsOver = true;
  this.onGameOverCallback();
  this.themeMusic.pause();
};

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove();
};

Game.prototype.enemySpawn = function(imgSrc) {
  var randomNum = Math.floor(Math.random() * 4);
  console.log(randomNum);
  var randomX = this.columnX[randomNum];
  var randomXIsBusy = this.columnIsBusy[randomNum];

  if (randomXIsBusy) return;

  var newEnemy = new Enemy(this.canvas, randomX, 10, imgSrc);
  this.columnIsBusy[randomNum] = true;
  this.enemies.push(newEnemy);

  setTimeout(() => {
    this.columnIsBusy[randomNum] = false;
  }, 1200);
};

Game.prototype.truckSpawn = function(imgSrc) {
  var randomNum = Math.floor(Math.random() * 4);
  console.log(randomNum);
  var randomX = this.columnX[randomNum];
  var randomXIsBusy = this.columnIsBusy[randomNum];

  if (randomXIsBusy) return;

  var newTruck = new Truck(this.canvas, randomX, 10, imgSrc);
  this.columnIsBusy[randomNum] = true;
  this.enemies.push(newTruck);

  setTimeout(() => {
    this.columnIsBusy[randomNum] = false;
  }, 1200);
};

Game.prototype.bikeSpawn = function(imgSrc) {
  var randomNum = Math.floor(Math.random() * 4);
  console.log(randomNum);
  var randomX = this.columnX[randomNum];
  var randomXIsBusy = this.columnIsBusy[randomNum];

  if (randomXIsBusy) return;

  var newBike = new Bike(this.canvas, randomX, 10, imgSrc);
  this.columnIsBusy[randomNum] = true;
  this.enemies.push(newBike);

  setTimeout(() => {
    this.columnIsBusy[randomNum] = false;
  }, 1200);
};

Game.prototype.bonusSpawn = function() {
  var randomNum = Math.floor(Math.random() * 4);
  console.log(randomNum);
  var randomX = this.columnX[randomNum];
  var randomXIsBusy = this.columnIsBusy[randomNum];

  if (randomXIsBusy) return;

  var newBonus = new Bonus(this.canvas, randomX, 10);
  this.columnIsBusy[randomNum] = true;
  this.bonus.push(newBonus);

  setTimeout(() => {
    this.columnIsBusy[randomNum] = false;
  }, 1200);
};
