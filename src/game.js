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
  this.crashSFX = new Audio("./audio/carcrash1.wav");
  this.themeMusic = new Audio("./audio/theme1.wav");
}

//Canvas Background
// var img = new Image();
// img.src = "./img/background.jpg";

// var img = {
//   img: img,
//   y: 0,
//   speed: 20,
//   move: function(canvas) {
//     this.y += this.speed;
//     this.y %= canvas.height;
//   },
//   draw: function(canvas, ctx) {
//     ctx.drawImage(this.img, 0, this.y);
//     if (this.speed < 0) {
//       ctx.drawImage(this.img, 0, this.y + canvas.height, canvas.width, canvas.height);
//     } else {
//       ctx.drawImage(this.img, 0, this.y - this.img.height, canvas.width, canvas.height);
//     }
//   }
// };

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
  this.player = new Player(this.canvas, 3); //	<-- UPDATE

  // Event listener callback function
  this.handleKeyDown = function(event) {
    if (event.key === "ArrowLeft") {
      console.log("LEFT");
      this.player.setDirection("left");
    } else if (event.key === "ArrowRight") {
      console.log("RIGHT");
      this.player.setDirection("right");
    }
    // } else if (event.key === "ArrowUp") {
    //   console.log("UP");
    //   this.player.setDirection("up");
    // } else if (event.key === "ArrowDown") {
    //   console.log("DOWN");
    //   this.player.setDirection("down");
    // }
  };
  // Add event listener for moving the player
  document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    // 1. Create new enemies randomly
    // var columnX = [85, 255, 450, 640];
    if (Math.random() > 0.99) {
      setTimeout(() => {
        var randomX = this.columnX[Math.floor(Math.random() * 5)];
        for (let index = 0; index < this.canvas.height / 4; index += this.canvas.height / 2.5) {
          //enemy creation
          var newEnemy = new Enemy(this.canvas, randomX, 4, "./img/car1.png");
          this.enemies.push(newEnemy);
        }
      }, 2000);
    } else if (Math.random() > 0.99) {
      setTimeout(() => {
        var randomX = this.columnX[Math.floor(Math.random() * 5)];
        for (let index = 0; index < this.canvas.height / 4; index += this.canvas.height / 2.5) {
          //enemy creation
          var newEnemy = new Enemy(this.canvas, randomX, 4, "./img/car2.png");
          this.enemies.push(newEnemy);
        }
      }, 2000);
    }

    // if on column 1 enemyhaspawned , wait .5 sec to spawn again
    // 2. Check if player had hit any enemy (check all enemies)
    this.checkCollisions();
    // 3. Check if player is going off the screen
    this.player.handleScreenCollision();
    // 4. Move existing enemies
    // 5. Check if any enemy is going of the screen
    this.enemies = this.enemies.filter(function(enemy) {
      enemy.updatePosition();
      return enemy.isInsideScreen();
    });
    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 3. UPDATE THE CANVAS
    // Draw the player
    this.ctx.drawImage(this.img, 0, 0, 750, 1025);
    this.player.draw();

    // Draw the enemies
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });

    // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function() {
  this.enemies.forEach(function(enemy) {
    if (this.player.didCollide(enemy)) {
      this.crashSFX.volume = 0.5;
      this.crashSFX.play();
      this.player.removeLife();
      // this.player.x = this.canvas.width / 2;
      // this.player.y = this.canvas.height - 100;
      enemy.y = 0 - enemy.height;
      if (this.player.lives === 0) {
        this.gameOver();
      }
    }
  }, this);
};

Game.prototype.updateGameStats = function() {};

Game.prototype.passGameOverCallback = function(callback) {};

Game.prototype.gameOver = function() {};

Game.prototype.removeGameScreen = function() {};
