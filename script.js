const dino = document.getElementById("dino");
const gameContainer = document.querySelector(".game-container");
const gameOver = document.getElementById("game-over");

let isJumping = false;
let gravity = 0.9;
let dinoPosition = 0;
let gameStarted = false;
let cactusTimeout;
let speed = 10;
let speedIncreaseInterval;
let cactiCount = 0;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !gameStarted) {
    gameStarted = true;
    startGame();
  } else if (event.code === "Space" && !isJumping && gameStarted) {
    isJumping = true;
    jump();
  }
});

function startGame() {
  resetGame();
  createCactus();
  speedIncreaseInterval = setInterval(increaseSpeed, 60000); // Increase speed every 60 seconds
}

function jump() {
  let upInterval = setInterval(() => {
    if (dinoPosition >= 150) {
      clearInterval(upInterval);

      // Fall down
      let downInterval = setInterval(() => {
        if (dinoPosition <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        dinoPosition -= 5;
        dinoPosition = dinoPosition * gravity;
        dino.style.bottom = dinoPosition + "px";
      }, 20);
    } else {
      // Jump up
      dinoPosition += 30;
      dino.style.bottom = dinoPosition + "px";
    }
  }, 20);
}

function createCactus() {
  let cactusPosition = 800; // Position to start at the right edge of the game container
  let randomTime = Math.random() * 6000;
  let cactus = document.createElement("div");
  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";

  let cactusHeight = Math.random() * 30 + 20; // Random height between 20px and 50px
  cactus.style.height = cactusHeight + "px";
  gameContainer.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -20) {
      // Adjusted to match the width of the cactus
      clearInterval(leftInterval);
      gameContainer.removeChild(cactus);
      cactiCount++; // Increment the cactus count when it moves past the dino
    } else if (
      cactusPosition > 0 &&
      cactusPosition < 60 &&
      dinoPosition < cactusHeight
    ) {
      clearInterval(leftInterval);
      gameOver.innerHTML = `<div><h1 class="game-over">Game Over Bulla    score: ${cactiCount}</h1></div>`;
      gameStarted = false;
      clearInterval(speedIncreaseInterval);
      resetGame();
    } else {
      cactusPosition -= speed;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  cactusTimeout = setTimeout(createCactus, randomTime);
  gameOver.innerHTML = "";
}

function increaseSpeed() {
  speed += 2; // Increase the speed by 2 units every minute
}

function resetGame() {
  clearInterval(cactusTimeout);
  clearTimeout(cactusTimeout);
  clearInterval(speedIncreaseInterval);
  dinoPosition = 0;
  dino.style.bottom = dinoPosition + "px";
  const cacti = document.querySelectorAll(".cactus");
  cacti.forEach((cactus) => cactus.remove());
  speed = 10; // Reset the speed
  cactiCount = 0; // Reset the cactus count
}

function cactiNum() {
  return cactiCount;
}

//gameOver.innerHTML = `<div><h1 class="game-over">Game Over</h1></div>`;
