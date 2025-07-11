// Snake Game
let snake = [{x: 240, y: 240}];
let food = {x: 0, y: 0};
let dx = 20, dy = 0;
let snakeRunning = false;
let snakeScore = 0;
let snakeLevel = 1;
let snakeSpeed = 200;

function initSnake() {
    snake = [{x: 240, y: 240}];
    dx = 20; dy = 0;
    snakeScore = 0;
    snakeLevel = 1;
    snakeSpeed = 200;
    generateFood();
    snakeRunning = true;
    updateSnakeDisplay();
    
    document.addEventListener('keydown', handleSnakeInput);
    snakeGameLoop();
}

function restartSnake() {
    snakeRunning = false;
    setTimeout(() => initSnake(), 100);
}

function updateSnakeDisplay() {
    document.getElementById('snakeScore').textContent = snakeScore;
    document.getElementById('snakeLevel').textContent = snakeLevel;
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * 24) * 20,
        y: Math.floor(Math.random() * 24) * 20
    };
}

function handleSnakeInput(e) {
    if (!snakeRunning) return;
    
    switch(e.key.toLowerCase()) {
        case 'arrowup':
        case 'w': if (dy === 0) { dx = 0; dy = -20; } break;
        case 'arrowdown':
        case 's': if (dy === 0) { dx = 0; dy = 20; } break;
        case 'arrowleft':
        case 'a': if (dx === 0) { dx = -20; dy = 0; } break;
        case 'arrowright':
        case 'd': if (dx === 0) { dx = 20; dy = 0; } break;
    }
}

function snakeGameLoop() {
    if (!snakeRunning) return;
    
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Move snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Check walls
    if (head.x < 0 || head.x >= 480 || head.y < 0 || head.y >= 480) {
        snakeRunning = false;
        alert(`Game Over! Final Score: ${snakeScore}`);
        return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        snakeRunning = false;
        alert(`Game Over! Final Score: ${snakeScore}`);
        return;
    }
    
    snake.unshift(head);
    
    // Check food
    if (head.x === food.x && head.y === food.y) {
        snakeScore += 10;
        if (snakeScore % 100 === 0) {
            snakeLevel++;
            snakeSpeed = Math.max(80, snakeSpeed - 20);
        }
        updateSnakeDisplay();
        generateFood();
    } else {
        snake.pop();
    }
    
    // Draw
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 480, 480);
    
    // Draw snake with realistic segments
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(segment.x + 1, segment.y + 1, 18, 18);
            // Eyes
            ctx.fillStyle = '#fff';
            ctx.fillRect(segment.x + 4, segment.y + 4, 3, 3);
            ctx.fillRect(segment.x + 13, segment.y + 4, 3, 3);
            ctx.fillStyle = '#000';
            ctx.fillRect(segment.x + 5, segment.y + 5, 1, 1);
            ctx.fillRect(segment.x + 14, segment.y + 5, 1, 1);
        } else {
            // Body segments with gradient
            const intensity = Math.max(0.3, 1 - (index * 0.05));
            ctx.fillStyle = `rgba(76, 175, 80, ${intensity})`;
            ctx.fillRect(segment.x + 2, segment.y + 2, 16, 16);
            // Body pattern
            ctx.fillStyle = `rgba(139, 195, 74, ${intensity * 0.5})`;
            ctx.fillRect(segment.x + 4, segment.y + 4, 12, 12);
        }
    });
    
    // Draw food as apple
    ctx.fillStyle = '#f44336';
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 8, 0, 2 * Math.PI);
    ctx.fill();
    // Apple stem
    ctx.fillStyle = '#8BC34A';
    ctx.fillRect(food.x + 9, food.y + 2, 2, 4);
    
    setTimeout(snakeGameLoop, snakeSpeed);
}

// Tetris Game
let tetrisBoard = Array(20).fill().map(() => Array(8).fill(0));
let currentPiece = null;
let tetrisRunning = false;
let tetrisScore = 0;
let tetrisLevel = 1;
let tetrisLines = 0;
let tetrisSpeed = 500;
let tetrisPaused = false;
let gameMode = 'classic';
let showGrid = true;

const tetrisPieces = [
    [[1,1,1,1]], // I
    [[1,1],[1,1]], // O
    [[0,1,0],[1,1,1]], // T
    [[0,1,1],[1,1,0]], // S
    [[1,1,0],[0,1,1]], // Z
    [[1,0,0],[1,1,1]], // J
    [[0,0,1],[1,1,1]]  // L
];

function startTetris(mode) {
    gameMode = mode;
    showGrid = document.getElementById('showGrid').checked;
    document.getElementById('tetrisStartScreen').style.display = 'none';
    document.getElementById('tetrisCanvas').style.display = 'block';
    initTetris();
}

function initTetris() {
    tetrisBoard = Array(20).fill().map(() => Array(8).fill(0));
    currentPiece = {
        shape: tetrisPieces[Math.floor(Math.random() * tetrisPieces.length)],
        x: 3,
        y: 0
    };
    tetrisScore = 0;
    tetrisLevel = 1;
    tetrisLines = 0;
    tetrisSpeed = 500;
    tetrisRunning = true;
    tetrisPaused = false;
    updateTetrisDisplay();
    
    document.addEventListener('keydown', handleTetrisInput);
    tetrisGameLoop();
}

function restartTetris() {
    tetrisRunning = false;
    tetrisPaused = false;
    document.getElementById('pauseBtn').textContent = 'Pause';
    document.getElementById('tetrisStartScreen').style.display = 'flex';
    document.getElementById('tetrisCanvas').style.display = 'none';
}

function updateTetrisDisplay() {
    document.getElementById('tetrisScore').textContent = tetrisScore;
    document.getElementById('tetrisLevel').textContent = tetrisLevel;
    document.getElementById('tetrisLines').textContent = tetrisLines;
}

function handleTetrisInput(e) {
    if (!tetrisRunning || !currentPiece) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            if (canMove(currentPiece, -1, 0)) currentPiece.x--;
            break;
        case 'ArrowRight':
            if (canMove(currentPiece, 1, 0)) currentPiece.x++;
            break;
        case 'ArrowDown':
            if (canMove(currentPiece, 0, 1)) currentPiece.y++;
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
    }
}

function canMove(piece, dx, dy) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = piece.x + x + dx;
                const newY = piece.y + y + dy;
                
                if (newX < 0 || newX >= 8 || newY >= 20) return false;
                if (newY >= 0 && tetrisBoard[newY][newX]) return false;
            }
        }
    }
    return true;
}

function rotatePiece() {
    const rotated = currentPiece.shape[0].map((_, i) => 
        currentPiece.shape.map(row => row[i]).reverse()
    );
    
    const oldShape = currentPiece.shape;
    currentPiece.shape = rotated;
    
    if (!canMove(currentPiece, 0, 0)) {
        currentPiece.shape = oldShape;
    }
}

function placePiece() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                tetrisBoard[currentPiece.y + y][currentPiece.x + x] = 1;
            }
        }
    }
    
    // Clear lines
    let linesCleared = 0;
    for (let y = 19; y >= 0; y--) {
        if (tetrisBoard[y].every(cell => cell === 1)) {
            tetrisBoard.splice(y, 1);
            tetrisBoard.unshift(Array(8).fill(0));
            linesCleared++;
            y++;
        }
    }
    
    if (linesCleared > 0) {
        tetrisLines += linesCleared;
        tetrisScore += linesCleared * 100 * tetrisLevel;
        if (tetrisLines >= tetrisLevel * 10) {
            tetrisLevel++;
            tetrisSpeed = Math.max(100, tetrisSpeed - 50);
        }
        updateTetrisDisplay();
    }
    
    // New piece
    currentPiece = {
        shape: tetrisPieces[Math.floor(Math.random() * tetrisPieces.length)],
        x: 3,
        y: 0
    };
    
    if (!canMove(currentPiece, 0, 0)) {
        tetrisRunning = false;
        alert(`Game Over! Final Score: ${tetrisScore}`);
    }
}

function tetrisGameLoop() {
    if (!tetrisRunning || tetrisPaused) {
        if (tetrisRunning && tetrisPaused) {
            setTimeout(tetrisGameLoop, 100);
        }
        return;
    }
    
    if (canMove(currentPiece, 0, 1)) {
        currentPiece.y++;
    } else {
        placePiece();
    }
    
    drawTetris();
    setTimeout(tetrisGameLoop, tetrisSpeed);
}

function drawTetris() {
    const canvas = document.getElementById('tetrisCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 300, 600);
    
    // Draw grid
    if (showGrid) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let x = 0; x <= 8; x++) {
            ctx.beginPath();
            ctx.moveTo(x * 37.5, 0);
            ctx.lineTo(x * 37.5, 600);
            ctx.stroke();
        }
        for (let y = 0; y <= 20; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * 30);
            ctx.lineTo(300, y * 30);
            ctx.stroke();
        }
    }
    
    // Draw board
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 8; x++) {
            if (tetrisBoard[y][x]) {
                drawBlock(ctx, x, y, tetrisBoard[y][x]);
            }
        }
    }
    
    // Draw current piece
    if (currentPiece) {
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    drawBlock(ctx, currentPiece.x + x, currentPiece.y + y, 2);
                }
            }
        }
    }
}

function drawBlock(ctx, x, y, type) {
    const blockX = x * 37.5;
    const blockY = y * 30;
    
    switch(gameMode) {
        case 'glass':
            ctx.fillStyle = type === 2 ? 'rgba(255,255,0,0.7)' : 'rgba(0,255,255,0.7)';
            ctx.fillRect(blockX, blockY, 35, 28);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(blockX, blockY, 35, 28);
            break;
        case 'colored':
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            ctx.fillStyle = colors[type % colors.length];
            ctx.fillRect(blockX, blockY, 35, 28);
            break;
        case 'textured':
            ctx.fillStyle = type === 2 ? '#ff0' : '#0ff';
            ctx.fillRect(blockX, blockY, 35, 28);
            // Add texture pattern
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            for (let i = 0; i < 35; i += 4) {
                ctx.fillRect(blockX + i, blockY, 2, 28);
            }
            break;
        default: // classic
            ctx.fillStyle = type === 2 ? '#ff0' : '#0ff';
            ctx.fillRect(blockX, blockY, 35, 28);
    }
}

function pauseTetris() {
    if (tetrisRunning) {
        tetrisPaused = !tetrisPaused;
        document.getElementById('pauseBtn').textContent = tetrisPaused ? 'Resume' : 'Pause';
    }
}