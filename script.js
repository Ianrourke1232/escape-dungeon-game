// Game variables
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const flyingObstacle = document.getElementById('flyingObstacle');
const powerUp = document.getElementById('powerUp');
const scoreDisplay = document.getElementById('score');
const scoreValue = document.getElementById('scoreValue');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartBtn = document.getElementById('restartBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const startBtn = document.getElementById('startBtn');
const jumpBtn = document.getElementById('jumpBtn');
let isJumping = false;
let score = 0;
let speedBoost = false;

const jumpHeight = 50;
const jumpDuration = 200;
const obstacleSpeed = 15;
let gameInterval;

function jump() {
    if (isJumping) return;
    isJumping = true;

    player.style.transition = `bottom ${jumpDuration / 2}ms ease-in`;
    player.style.bottom = `${jumpHeight}vh`;

    setTimeout(() => {
        player.style.transition = `bottom ${jumpDuration / 2}ms ease-out`;
        player.style.bottom = '5vh';
        setTimeout(() => {
            isJumping = false;
        }, jumpDuration / 2);
    }, jumpDuration / 2);
}

function moveElements() {
    let obstacleLeft = parseFloat(window.getComputedStyle(obstacle).right);
    let flyingObstacleLeft = parseFloat(window.getComputedStyle(flyingObstacle).right);
    let powerUpLeft = parseFloat(window.getComputedStyle(powerUp).right);
    
    if (obstacleLeft >= window.innerWidth) {
        obstacle.style.right = '-60px';
        score++;
        scoreValue.textContent = score;
    } else {
        obstacle.style.right = `${obstacleLeft + obstacleSpeed}px`;
    }

    if (flyingObstacleLeft >= window.innerWidth) {
        flyingObstacle.style.right = '-60px';
        flyingObstacle.style.top = `${Math.random() * 50 + 20}vh`;
    } else {
        flyingObstacle.style.right = `${flyingObstacleLeft + (obstacleSpeed * 0.8)}px`;
    }

    if (powerUpLeft >= window.innerWidth) {
        powerUp.style.right = '-60px';
    } else {
        powerUp.style.right = `${powerUpLeft + (obstacleSpeed * 0.5)}px`;
    }

    checkCollisions();
}

function checkCollisions() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const flyingObstacleRect = flyingObstacle.getBoundingClientRect();
    const powerUpRect = powerUp.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
    ) {
        endGame();
    }

    if (
        playerRect.left < flyingObstacleRect.right &&
        playerRect.right > flyingObstacleRect.left &&
        playerRect.bottom > flyingObstacleRect.top &&
        playerRect.top < flyingObstacleRect.bottom
    ) {
        endGame();
    }

    if (
        playerRect.left < powerUpRect.right &&
        playerRect.right > powerUpRect.left &&
        playerRect.bottom > powerUpRect.top &&
        playerRect.top < powerUpRect.bottom
    ) {
        activatePowerUp();
        powerUp.style.right = '-60px';
    }
}

function activatePowerUp() {
    if (!speedBoost) {
        speedBoost = true;
        obstacle.style.backgroundColor = '#FF0000';
        setTimeout(() => {
            speedBoost = false;
            obstacle.style.backgroundColor = '#FF4500';
        }, 5000);
    }
}

function startGame() {
    document.getElementById('instructions').style.display = 'none';
    scoreDisplay.classList.remove('hidden');
    gameOverMessage.style.display = 'none';
    score = 0;
    scoreValue.textContent = score;
    obstacle.style.right = '-60px';
    flyingObstacle.style.right = '-60px';
    powerUp.style.right = '-60px';
    gameInterval = setInterval(moveElements, 15);
}

function endGame() {
    clearInterval(gameInterval);
    gameOverMessage.style.display = 'flex';
    scoreDisplay.classList.add('hidden');
    document.getElementById('finalScore').textContent = score;
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
fullscreenBtn.addEventListener('click', () => document.body.requestFullscreen());
jumpBtn.addEventListener('click', jump);
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        jump();
    }
});

