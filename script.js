// Game variables
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const scoreValue = document.getElementById('scoreValue');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartBtn = document.getElementById('restartBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const startBtn = document.getElementById('startBtn');
const jumpBtn = document.getElementById('jumpBtn');
let isJumping = false;
let score = 0;
let difficulty = 1;

const jumpHeight = 50; // Height of the jump (in vh units)
const baseObstacleSpeed = 15; // Base speed of the obstacle movement
let obstacleSpeed = baseObstacleSpeed; // Current speed of the obstacle
let gameInterval;

// Function to make the player jump
function jump() {
    if (isJumping) return;
    isJumping = true;

    // Animate the jump
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

// Function to move the obstacle and check for collisions
function moveObstacle() {
    let obstacleLeft = parseFloat(window.getComputedStyle(obstacle).right);

    // Reset obstacle position and increase score
    if (obstacleLeft >= window.innerWidth) {
        obstacle.style.right = '-60px'; // Reset obstacle position
        score++;
        scoreValue.textContent = score;
        updateDifficulty();
    } else {
        obstacle.style.right = `${obstacleLeft + obstacleSpeed}px`;
    }

    // Check for collision
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

// Function to update difficulty
function updateDifficulty() {
    if (score % 5 === 0) { // Increase difficulty every 5 points
        difficulty++;
        obstacleSpeed += 2; // Increase speed
        let newSize = Math.random() * (100 - 30) + 30; // Random size between 30px and 100px
        obstacle.style.width = `${newSize}px`;
        obstacle.style.height = `${newSize}px`;
    }
}

// Function to start the game
function startGame() {
    document.getElementById('instructions').style.display = 'none';
    scoreDisplay.classList.remove('hidden');
    gameOverMessage.style.display = 'none';
    score = 0;
    difficulty = 1; // Reset difficulty
    obstacleSpeed = baseObstacleSpeed; // Reset speed
    scoreValue.textContent = score;
    obstacle.style.right = '-60px'; // Reset obstacle position
    obstacle.style.width = '60px'; // Reset obstacle size
    obstacle.style.height = '60px'; // Reset obstacle size
    gameInterval = setInterval(() => {
        moveObstacle();
    }, 15); // Update game every 15ms for appropriate gameplay speed
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval); // Stop the game loop
    gameOverMessage.style.display = 'flex'; // Show game over message
    scoreDisplay.classList.add('hidden');
    document.getElementById('finalScore').textContent = score;
}

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
fullscreenBtn.addEventListener('click', toggleFullscreen);
jumpBtn.addEventListener('click', jump);

// Initial styles for the obstacle
obstacle.style.width = '60px';
obstacle.style.height = '60px';
