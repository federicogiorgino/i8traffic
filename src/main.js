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

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class="splash-screen-main">
        <div class="splash-screen-div">
            <h1 class="splash-h1">IHATETRAFFIC</h1>
            <p>On your way to work, you find yourself in a pretty bad situation. </p>
            <p>You are late, and by mistake you are driving on the wrong side of the road</p>
            <button type="button" class="start-button">Let's Go</button>
        </div>
    </main>
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
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
  `);

    document.body.appendChild(gameScreen);
    return gameScreen;
  }

  function removeGameScreen() {
    game.removeGameScreen();
  }

  // -- game over screen
  function createGameOverScreen(score) {}
  function removeGameOverScreen() {}

  // -- Setting the game state
  function startGame() {
    removeSplashScreen();
    game = new Game();
    game.gameScreen = createGameScreen();
    game.start();
  }

  function gameOver() {}
  // -- initialize Splash screen on initial start
  createSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener("load", main);
