// Initialize score
let score = 0;

// Select DOM elements
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.querySelector('.game-container');

// Function to start the game
function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    initializeGame(); // Initialize game elements
}

// Initialize the game
function initializeGame() {
    resetScore(); // Initialize score
    gameLoop(); // Start the game loop
}

// Function to increase the score
function increaseScore() {
    score += 10; // Increase score by 10 for each event
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to reset the score
function resetScore() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Example game loop or event listener
function gameLoop() {
    // Example: Increase score every second
    increaseScore();

    // Example: Simulate a condition to stop the game (e.g., if player hits obstacle)
    // This is a placeholder for actual game logic
    if (score >= 100) { // For demonstration, stop after score reaches 100
        alert('You won!');
        return; // Exit game loop
    }

    // Call gameLoop again after a short delay
    setTimeout(gameLoop, 1000); // Call gameLoop every second
}

// Function to handle jump action
function jump() {
    // Simple example of jump effect
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
        setTimeout(() => {
            player.classList.remove('jump');
        }, 500); // Duration of jump
    }
}

// Event listeners
document.getElementById('start-screen').addEventListener('click', startGame); // Start game on click
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // Space key for jumping
        jump();
    }
});

// Start game on page load
window.addEventListener('load', () => {
    startScreen.style.display = 'block'; // Show start screen on page load
});
