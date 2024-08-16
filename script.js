// Game variables
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.querySelector('.game-container');
let isJumping = false;
let score = 0;

// Game settings
const jumpHeight = 200; // Height of the jump in pixels
const jumpDuration = 200; // Duration of the jump in milliseconds
const obstacleSpeed = 3; // Speed of the obstacle movement

// Function to make the player jump
function jump() {
    if (isJumping) return;
    isJumping = true;

    // Animate the jump
    player.style.transition = `bottom ${jumpDuration / 2}ms ease-in`;
    player.style.bottom = `${jumpHeight}px`;

    setTimeout(() => {
        player.style.transition = `bottom ${jumpDuration / 2}ms ease-out`;
        player.style.bottom = '50px';
        setTimeout(() => {
            isJumping = false;
        }, jumpDuration / 2);
    }, jumpDuration / 2);
}

// Event listener for the spacebar to jump
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
        alert('Game Over! Your score: ' + score);
        score = 0;
        obstacle.style.right = '-60px'; // Reset obstacle position
    }
}

// Game loop
setInterval(() => {
    moveObstacle();
}, 20); // Update game every 20ms
