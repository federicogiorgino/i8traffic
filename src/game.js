"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.enemies = [];
  this.player = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.img = new Image();
  this.img.src = "./img/background1.png";
  this.columnX = [85, 255, 450, 640];
  this.columnIsBusy = [false, false, false, false];
  this.crashSFX = new Audio("./audio/carcrash1.wav");
  this.themeMusic = new Audio("./audio/theme1.wav");
  this.hornSFX = new Audio("./audio/clacson.wav");
  this.score = 0;
}

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
  this.canvas.setAttribute("height", 1025);

  this.themeMusic.play();
  this.themeMusic.volume = 0.2;
  this.themeMusic.loop = true;
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
    }
  };
  // Add event listener for moving the player
  document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    // 1. Create new enemies randomly
    // var columnX = [85, 255, 450, 640];
    // if (Math.random() > 0.97) {
    //   this.enemySpawn();
    // }
    if (Math.random() > 0.98) {
      var randomNum = Math.random();
      if (randomNum > 0.2 && randomNum < 0.6) {
        this.enemySpawn("./img/car1.png");
      } else if (randomNum > 0.6 && randomNum < 1) {
        this.truckSpawn("./img/truck1.png");
      }
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

    // this.enemies = this.enemies.filter(function(truck) {
    //   truck.updatePosition();
    //   return truck.isInsideScreen();
    // });
    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 3. UPDATE THE CANVAS
    //Draw the background
    this.ctx.drawImage(this.img, 0, 0, 750, 1025);
    // Draw the player
    this.player.draw();
    // Draw the enemies
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });

    // this.enemies.forEach(function(truck) {
    //   truck.draw();
    // });

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
      if (this.player.lives === 0) {
        this.gameOver();
      }
    }
  }, this);
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

  var newEnemy = new Enemy(this.canvas, randomX, 4, imgSrc);
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

  var newTruck = new Truck(this.canvas, randomX, 4, imgSrc);
  this.columnIsBusy[randomNum] = true;
  this.enemies.push(newTruck);

  setTimeout(() => {
    this.columnIsBusy[randomNum] = false;
  }, 1200);
};

// if on column 1 enemyhaspawned , wait .5 sec to spawn again
// var randomNum = Math.random();

// if (randomNum > 0.7) {
//   enemySpawn("./img/car1.png");
// } else if (randomNum > 0.6) {
//   truckSpawn(".img/truck1.png");
// }
