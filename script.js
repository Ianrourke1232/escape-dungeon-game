// Game variables
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const scoreValue = document.getElementById('scoreValue');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartBtn = document.getElementById('restartBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const startBtn = document.getElementById('startBtn');
const jumpBtn = document.getElementById('jumpBtn');

let isJumping = false;
let score = 0;
let gameInterval;
const jumpHeight = 50;
const jumpDuration = 200;
const obstacleSpeed = 15;

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

function moveObstacle() {
    let obstacleLeft = parseFloat(window.getComputedStyle(obstacle).right);
    if (obstacleLeft >= window.innerWidth) {
        obstacle.style.right = '-60px';
        score++;
        scoreValue.textContent = score;
    } else {
        obstacle.style.right = `${obstacleLeft + obstacleSpeed}px`;
    }
    checkCollisions();
}

function checkCollisions() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
    ) {
        endGame();
    }
}

function startGame() {
    scoreDisplay.classList.remove('hidden');
    gameOverMessage.style.display = 'none';
    score = 0;
    scoreValue.textContent = score;
    obstacle.style.right = '-60px';
    gameInterval = setInterval(moveObstacle, 20);
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

