// Game variables
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const scoreValue = document.getElementById('scoreValue');
const fullscreenBtn = document.getElementById('fullscreenBtn');
let isJumping = false;
let score = 0;

const jumpHeight = 50; // Height of the jump (in vh units)
const jumpDuration = 200; // Duration of the jump in milliseconds
const obstacleSpeed = 10; // Adjusted speed of the obstacle movement

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

// Event listener for the spacebar to jump
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent exiting fullscreen mode on spacebar
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
    }, 15); // Update game every 15ms for appropriate gameplay speed
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval); // Stop the game loop
    alert('Game Over! Your score: ' + score);
    scoreDisplay.classList.add('hidden');
    document.getElementById('instructions').style.display = 'flex'; // Show instructions again
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) { // Firefox
            gameContainer.mozRequestFullScreen();
        } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) { // IE/Edge
            gameContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

// Event listener for fullscreen button
fullscreenBtn.addEventListener('click', toggleFullscreen);

// Mobile-friendly tap to jump
gameContainer.addEventListener('touchstart', jump);

