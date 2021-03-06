"use strict";

// Creates DOM elements from a string representation
function buildDom(htmlString) {
  var div = document.createElement("div");

  div.innerHTML = htmlString;
  return div.children[0];
}

// Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameOverScreen;
  var gameWinScreen;

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`  <div class="splash-main">
    <div class="splash-div">
      <h1>I HATE TRAFFIC</h1>
      <button type="button" class="start-button">LET'S RIDE</button>
      <div class="splash-square">
        <h3>HOW TO PLAY</h3>
        <p>1. Move Left and Right with Left and Right arrow</p>
        <p>2. Dodge the incoming cars, collect bonuses and increase your score</p>
        <p>3. You only have 3 lives</p>
      </div>
    </div>
  </div>
    `);

    document.body.appendChild(splashScreen);
    var startButton = splashScreen.querySelector("button");
    startButton.addEventListener("click", startGame);
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  // -- game screen
  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
      
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="canvas-container">
      <canvas></canvas>
      </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      
     
    </main>
  `);
    document.body.appendChild(gameScreen);
    return gameScreen;
  }

  function removeGameScreen() {
    game.removeGameScreen();
  }
  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
    <div class="game-over-main">
    <div class="game-over-div">
    <h1>GAME OVER</h1>
    <div class="game-over-square">
    <h3>YOU DIED</h3>
    <p>ALSO, YOU DID NOT MAKE IT TO WORK IN TIME</p>
    <p class="score">Your score: <span> ${score} </span></p>
    <button type="button" class="restart-button">START OVER</button>
    </div>
    </div>
    </div>
    `);
    var button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame);

    var span = gameOverScreen.querySelector("span");
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
  }
  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) {
      gameOverScreen.remove();
    }
  }

  //- game winning screen
  function createGameWinningScreen(score) {
    gameWinScreen = buildDom(`
    <div class="game-over-main">
    <div class="game-over-div">
    <h1>YOU WON</h1>
    <div class="game-over-square">
    <h3>YOU DID NOT DIE</h3>
    <p>ALSO, YOU MADE IT TO WORK IN TIME</p>
    <p class="score">Your score: <span> ${score} </span></p>
    <button type="button" class="restart-button">PLAY AGAIN</button>
    </div>
    </div>
    </div>
    `);
    var button = gameWinScreen.querySelector("button");
    button.addEventListener("click", startGame);

    var span = gameOverScreen.querySelector("span");
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
  }

  function removeGameWinningScreen() {
    if (gameWinScreen !== undefined) {
      gameWinScreen.remove();
    }
  }
  // -- Setting the game state
  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();
    // removeGameWinningScreen()
    game = new Game();
    game.gameScreen = createGameScreen();
    game.start();
    // game.passGameOverCallback(gameOver);
    game.passGameOverCallback(function() {
      console.log(`gamescore is ${game.score}`);
      gameOver(game.score);
    });
  }
  function gameOver(score) {
    removeGameScreen();
    // removeGameWinningScreen();
    createGameOverScreen(score);
  }
  // -- initialize Splash screen on initial start
  createSplashScreen();
}
// Runs the function `main` once all resources are loaded
window.addEventListener("load", main);
