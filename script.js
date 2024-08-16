// Initialize game variables
let score = 0;
let obstacles = [];
let gameInterval;
let obstacleSpeed = 3; // Speed at which obstacles move
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.querySelector('.game-container');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Function to start the game
function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    gameOverScreen.style.display = 'none';
    initializeGame(); // Initialize game elements
}

// Initialize the game
function initializeGame() {
    resetScore(); // Initialize score
    createObstacle(); // Create initial obstacle
    document.addEventListener('keydown', handleJump);
    document.addEventListener('touchstart', handleJump);
    gameInterval = setInterval(gameLoop, 20); // Start the game loop
}

// Function to increase the score
function increaseScore() {
    score += 10; // Increase score by 10 for each obstacle avoided
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to reset the score
function resetScore() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to create a new obstacle
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = `${Math.random() * (window.innerWidth - 60)}px`; // Random horizontal position
    obstacle.style.top = '-60px'; // Start off-screen
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Function to move obstacles and check if they go off screen
function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let top = parseFloat(obstacle.style.top);
        top += obstacleSpeed;
        obstacle.style.top = `${top}px`;

        if (top > window.innerHeight) {
            obstacle.remove();
            obstacles.splice(index, 1); // Remove from array
            createObstacle(); // Create a new obstacle
            increaseScore(); // Increase score for each obstacle avoided
        }
    });
}

// Function to check for collisions between player and obstacles
function checkCollisions() {
    const playerRect = player.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        if (!(playerRect.right < obstacleRect.left ||
              playerRect.left > obstacleRect.right ||
              playerRect.bottom < obstacleRect.top ||
              playerRect.top > obstacleRect.bottom)) {
            gameOver();
        }
    });
}

// Function to handle jumping
function handleJump(event) {
    if (event.code === 'Space' || event.type === 'touchstart') { // SPACE key or touch for jumping
        jump();
    }
}

// Function to handle player jump
function jump() {
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
        setTimeout(() => {
            player.classList.remove('jump');
        }, 500); // Duration of jump
    }
}

// Game loop
function gameLoop() {
    moveObstacles();
    checkCollisions();
}

// Function to handle game over
function gameOver() {
    clearInterval(gameInterval); // Stop the game loop
    gameContainer.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = score; // Show final score
}

// Restart the game
function restartGame() {
    obstacles.forEach(obstacle => obstacle.remove()); // Remove all obstacles
    obstacles = [];
    startGame();
}

// Event listeners
document.getElementById('start-screen').addEventListener('click', startGame); // Start game on click
restartButton.addEventListener('click', restartGame); // Restart game on button click

// Initialize start screen
window.addEventListener('load', () => {
    startScreen.style.display = 'block'; // Show start screen on page load
});

