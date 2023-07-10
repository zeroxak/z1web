// snake.js
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const tileSize = 10;
const numTiles = canvas.width / tileSize;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let snakeMoveInterval = 8;
let food = spawnFood();
let snakeMoveCounter = 0;
let currentScore = 0;
let allTimeHigh = 0;

function gameLoop() {
    snakeMoveCounter++;
    if (snakeMoveCounter >= snakeMoveInterval) {
        moveSnake();
        snakeMoveCounter = 0;
    }

    checkFoodCollision();
    checkSnakeCollision();

    clearCanvas();
    drawSnake();
    drawFood();

    // Keep the same frame rate
    setTimeout(gameLoop, 25);
}

gameLoop();

function moveSnake() {
    const head = {...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Wrap the snake's position around the canvas
    if (head.x < 0) {
        head.x = numTiles - 1;
    } else if (head.x >= numTiles) {
        head.x = 0;
    }

    if (head.y < 0) {
        head.y = numTiles - 1;
    } else if (head.y >= numTiles) {
        head.y = 0;
    }

    snake.unshift(head);
    snake.pop();
}


function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({});
        food = spawnFood();
    }
}

function checkSnakeCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            snake = [{ x: 5, y: 5 }];
            break;
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * numTiles),
        y: Math.floor(Math.random() * numTiles),
    };
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
});

// Change numTiles to the new value

// Change the gameLoop setTimeout delay to make the snake move 1.5x faster
setTimeout(gameLoop, 100); // 150 * (2/3) = 100

// Add variables to keep track of scores

// Update the currentScore and allTimeHigh in the checkFoodCollision function
function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({});
        food = spawnFood();

        // Update the scores
        currentScore += 10;
        allTimeHigh = Math.max(allTimeHigh, currentScore);

        // Update the score display
        document.getElementById('current-score').innerText = currentScore;
        document.getElementById('all-time-high').innerText = allTimeHigh;
    }
}

// Reset the currentScore when the snake collides with itself
function checkSnakeCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            snake = [{ x: 5, y: 5 }];
            currentScore = 0;
            document.getElementById('current-score').innerText = currentScore;
            break;
        }
    }
}