# I Hate Traffic

## Description

I.H.A is a simple Traffic race game where the player controls a vehicle and tries to dodge 'enemy' cars trying to block his path.

## MVP (DOM - CANVAS)

- A car object. The main character. Our goal is to reach our 'undefined destination' on this 'never-ending' highway.
- The game finishes when the car get hit by an 'enemy' car or a wall.
- If you manage to keep dodging cars until you reach a set score , you win.

## Data structure

1. index.html
2. main.js
3. game.js
4. player.js
5. cars.js

### 1. index.html file

### 2. main.js

- buildDom
- createStartScreen
- removeStartScreen
- createGameScreen
- removeGameScreen
- createGameOverScreen
- removeGameOverScreen
- createWinScreen
- removeWinScreen
- startGame
- endGame

### 3. game.js

**Properties**

- canvas
- ctx
- player
- cars
- gameIsOver
- loopCount
- score
- pause

**Methods**

- start
- startLoop
- checkCollision
- checkOtherSide
- gameWon
- gameOver
- printLives
- printTime

### 4. player.js

**Properties**

- canvas
- ctx
- x
- y
- width
- height
- image
- direction

**Methods**

- draw
- move
- objectCollision
- screenCollision

### 5. cars.js

**Properties**

- canvas
- ctx
- x
- y
- width
- height
- speed
- direction
- image

**Methods**

- draw
- move
- destroy

### 6. Bonus Constructor

- will be added after a reasonable MVP is done

## States and States Transitions

- startScreen
  - Start the game
- gameScreen
  - Game running while lives > 0
- gameoverScreen
  - Game Over message Play Again
  - Goes back to Game Screen when Restart button is clicked
- winScreen
  - Shows Win message
  - Goes back to Game Screen when Restart button is clicked

## Tasks

- git & gitHub creation
- main.js, player.js, cars.js game.js,
- BuildDom -> main.js
- Screens (Game/GameOver/Splash) creation/deletion -> main.js
- constructor -> game.js
- gameLoop() -> game.js
- Player() -> player.js
- Cars() -> cars.js
- enemy cars draw and moving -> game.js
- player draw and moving -> game.js
- collisions -> game.js
- scoreboaard -> main.js
- Add audios, img and fonts

## Backlog

- bonus (double score// speed increase/decrease // )
- difficulties (speed/highscore)
- name and scoreboard
- sfx and vfx

## Links

### Trello

[Link url]

### Git

[Link Repo] -
[Link Deploy]

### Slides

[Link Slides.com]
