// Game variables
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const scoreValue = document.getElementById('scoreValue');
let isJumping = false;
let score = 0;

const jumpHeight = 30; // Adjusted for mobile-friendly responsiveness
const jumpDuration = 200; // Duration of the jump in milliseconds
const obstacleSpeed = 10; // Speed of the obstacle movement

let gameInterval;

// Function to make the player jump
function jump() {
    if (isJumping) return;
    isJumping = true;

    // Animate the jump
    player.style.transition = `bottom ${jumpDuration / 2}ms ease-in`;
    player.style.bottom = `${jumpHeight}vh`;

    setTimeout(() => {
        player.style.transition = `bottom ${jumpDuration / 3}ms ease-out`;
        player.style.bottom = '5vh';
        setTimeout(() => {
            isJumping = false;
        }, jumpDuration / 3);
    }, jumpDuration / 3);
}

// Event listener for the spacebar and touch to jump
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

// Function to move the obstacle and check for collisions
function moveObstacle() {
    let obstacleLeft = parseFloat(window.getComputedStyle(obstacle).right);

    if (obstacleLeft >= window.innerWidth) {
        obstacle.style.right = '-60px'; // Reset obstacle position
        score++;
        scoreValue.textContent = score;
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

// Function to start the game
function startGame() {
    document.getElementById('instructions').style.display = 'none';
    scoreDisplay.classList.remove('hidden');
    score = 0;
    scoreValue.textContent = score;
    obstacle.style.right = '-60px'; // Reset obstacle position
    gameInterval = setInterval(() => {
        moveObstacle();
    }, 15); // Update game every 20ms
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval); // Stop the game loop
    alert('Game Over! Your score: ' + score);
    scoreDisplay.classList.add('hidden');
    document.getElementById('instructions').style.display = 'flex'; // Show instructions again
}
