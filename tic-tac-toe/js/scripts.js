const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const clickSound = document.getElementById('checkSound');
const gameWin = document.getElementById('gameWin');
const gameDraw = document.getElementById('gameDraw');
clickSound.volume = 0.2; // Set volume to 20%
gameWin.volume = 0.25; // Set volume to 25%
gameDraw.volume = 0.25; // Set volume to 25%
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== "" || !isGameActive()) {
        return;
    }

    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Add class for X or O
    gameState[cellIndex] = currentPlayer;

    if (checkWin()) {
        // alert(`${currentPlayer} has won!`);
        updateScore(currentPlayer);
        disableBoard();
        gameWin.play(); // Play the ound effect
    } else if (isDraw()) {
        // alert("It's a draw!");
        updateScore('Draw');
        gameDraw.play(); // Play the sound effect
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        clickSound.play(); // Play the sound effect
    }
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return gameState.every(cell => cell !== "");
}

function isGameActive() {
    return !checkWin() && !isDraw();
}

function disableBoard() {
    cells.forEach(cell => cell.classList.add('disabled'));
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        document.getElementById('scoreXValue').innerText = scoreX;
        highlighter('#scoreX');
    } else if (winner === 'O') {
        scoreO++;
        document.getElementById('scoreOValue').innerText = scoreO;
        highlighter('#scoreO');
    } else {
        scoreDraw++;
        document.getElementById('scoreDrawValue').innerText = scoreDraw;
        highlighter('#scoreDraw');
    }
}

function highlighter(selector) {
    document.querySelector(selector).classList.add('highlight');
    setTimeout(() => {
        document.querySelector(selector).classList.remove('highlight');
    }, 2000);
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('disabled');
        cell.classList.remove('x'); // Remove X class
        cell.classList.remove('o'); // Remove O class
    });
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
