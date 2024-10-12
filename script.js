const gameArea = document.getElementById("gameArea");
const message = document.getElementById("message");
const jumpHeight = 150;
let isJumping = false;
let score = 0;
let obstacleSpeed = 3;
let obstacleFrequency = 1500; // Start generating obstacles every 1.5 seconds
let obstacleSize = 50; // Initial size of the obstacles

const player = document.createElement("div");
player.classList.add("jump");
gameArea.appendChild(player);

function jump() {
    if (isJumping) return;
    isJumping = true;
    player.style.transition = "transform 0.5s ease";
    player.style.transform = `translateY(-${jumpHeight}px)`;
    setTimeout(() => {
        player.style.transform = `translateY(0)`;
        isJumping = false;
    }, 500);
}

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("jump");
    obstacle.style.backgroundColor = "green"; // Color for obstacles
    obstacle.style.position = "absolute";
    obstacle.style.bottom = "0";
    obstacle.style.left = `${100}%`; // Start from the right side
    obstacle.style.width = `${obstacleSize}px`;
    obstacle.style.height = `${Math.random() * 100 + 30}px`; // Random height between 30px and 130px
    gameArea.appendChild(obstacle);
    
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    const obstacleInterval = setInterval(() => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        
        // Check for collision
        if (
            obstacleRect.right > playerRect.left &&
            obstacleRect.left < playerRect.right &&
            obstacleRect.bottom > playerRect.top
        ) {
            clearInterval(obstacleInterval);
            message.textContent = "Game Over! Your score: " + score;
            return;
        }
        
        // Move obstacle to the left
        obstacle.style.left = `${obstacleRect.left - obstacleSpeed}px`;
        
        // Remove obstacle when out of view
        if (obstacleRect.right < 0) {
            clearInterval(obstacleInterval);
            gameArea.removeChild(obstacle);
            score++;
            increaseDifficulty();
        }
    }, 20);
}

function increaseDifficulty() {
    if (score % 5 === 0) { // Every 5 points increase difficulty
        obstacleSpeed += 0.5; // Increase speed
        obstacleFrequency -= 100; // Decrease frequency
        obstacleSize += 10; // Increase size
        clearInterval(obstacleInterval);
        startObstacleGeneration();
    }
}

function startObstacleGeneration() {
    setInterval(createObstacle, obstacleFrequency);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

document.addEventListener("click", jump);

startObstacleGeneration();

