let currentPlayer = 'O';
let gameActive = true;
let board = Array(9).fill(null);

let winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let cells = document.querySelectorAll('.cell');
let winnerMsg = document.getElementById('winnerMsg');
let winnerText = document.getElementById('winnerText');
let newGameBtn = document.getElementById('newGameBtn');
let resetBtn = document.getElementById('resetBtn');

function checkWin() {
  for (let combo of winningCombos) {
    let [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightWinningCells(combo);
      displayWinner(`Congratulations, Winner is ${board[a]}`);
      return true;
    }
  }

  if (!board.includes(null)) {
    gameActive = false;
    displayWinner("Match Tied");
    return true;
  }

  return false;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

function displayWinner(message) {
  winnerText.textContent = message;
  winnerMsg.classList.remove('hidden');
}

function handleClick(e) {
  const index = parseInt(e.target.getAttribute('data-index'));
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (!checkWin()) {
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  }
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  currentPlayer = 'O';
  gameActive = true;
  winnerMsg.classList.add('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
