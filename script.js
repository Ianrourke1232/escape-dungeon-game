// Initialize score
let score = 0;

// Function to update the score display
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// Function to increase the score
function increaseScore(amount) {
    score += amount;
    updateScoreDisplay();
}

// Function to handle player jump
function playerJump() {
    const player = document.getElementById('player');
    player.classList.add('jump');

    setTimeout(() => {
        player.classList.remove('jump');
    }, 500); // Adjust the duration as needed
}

// Function to handle touch input
function handleTouchStart(event) {
    event.preventDefault(); // Prevent default behavior (e.g., scrolling)
    playerJump();
}

// Optional: Handle touch movement if needed (e.g., dragging to move)
function handleTouchMove(event) {
    event.preventDefault(); // Prevent default behavior (e.g., scrolling)
    const touch = event.touches[0];
    const player = document.getElementById('player');

    // Example: Move player based on touch movement
    player.style.left = `${touch.clientX - player.clientWidth / 2}px`;
    player.style.top = `${touch.clientY - player.clientHeight / 2}px`;
}

// Optional: Handle touch end if needed
function handleTouchEnd(event) {
    // Example: Reset any touch-related states or actions
}

// Add event listeners for touch input
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// Example function that could be called when the player collects an item
function onItemCollected() {
    increaseScore(10); // Increase score by 10
}

// Example game logic
function setupGame() {
    // Example: simulate item collection every 5 seconds
    setInterval(onItemCollected, 5000);
}

// Game loop
function gameLoop() {
    // Your main game logic goes here

    // Example: Update game state, handle collisions, etc.

    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Start the game
function startGame() {
    setupGame();
    gameLoop();
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
