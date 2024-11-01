const cells = document.querySelectorAll('.cell');
const messageEl = document.querySelector('.message');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click event
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(cell, cellIndex);
    checkResult();
}

// Update cell
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#f39c12' : '#3498db';
}

// Check for win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageEl.textContent = `${currentPlayer} Wins! 🎉`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        messageEl.textContent = "It's a Draw! 🤝";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Restart game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = 'X';
    messageEl.textContent = "";
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
