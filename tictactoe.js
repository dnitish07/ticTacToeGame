let currentTurn = "cross";
let isGameEnded = false;
let cellValues = new Array(9).fill("");

const TURN = {
  CROSS: "cross",
  CIRCLE: "circle",
};

const CELL_VALUE = {
  CROSS: "X",
  CIRCLE: "O",
};

const GAME_STATUS = {
  PLAYING: "PLAYING",
  ENDED: "END",
  X_WIN: "X",
  O_WIN: "O",
};

function getCellElementList() {
  return document.querySelectorAll(".cell");
}

function getCurrentTurnElement() {
  return document.getElementById("currentTurn");
}

function getCellElementAtIdx(index) {
  return document.querySelector(`.cell[data-idx="${index}"]`);
}

function getGameStatusElement() {
  return document.getElementById("gameStatus");
}

function getReplayButtonElement() {
  return document.getElementById("replayGame");
}

function checkWin(cellValues) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cellValues[a] &&
      cellValues[a] === cellValues[b] &&
      cellValues[b] === cellValues[c]
    ) {
      return {
        status: cellValues[a] === CELL_VALUE.CROSS ? GAME_STATUS.X_WIN : GAME_STATUS.O_WIN,
        winPositions: [a, b, c],
      };
    }
  }

  const isBoardFull = cellValues.every(value => value !== "");
  return {
    status: isBoardFull ? GAME_STATUS.ENDED : GAME_STATUS.PLAYING,
    winPositions: [],
  };
}

function toggleTurn() {
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;
  getCurrentTurnElement().className = currentTurn;
}

function updateGameStatus(status) {
  getGameStatusElement().textContent = status;
}

function showReplayButton() {
  getReplayButtonElement().classList.add("show");
}

function hideReplayButton() {
  getReplayButtonElement().classList.remove("show");
}

function highlightWinCells(winPositions) {
  winPositions.forEach(index => {
    getCellElementAtIdx(index).classList.add("win");
  });
}

function handleClick(cell, index) {
  if (cell.classList.contains("cross") || cell.classList.contains("circle") || isGameEnded) return;

  cell.classList.add(currentTurn);
  cellValues[index] = currentTurn === TURN.CROSS ? CELL_VALUE.CROSS : CELL_VALUE.CIRCLE;

  const { status, winPositions } = checkWin(cellValues);

  if (status === GAME_STATUS.PLAYING) {
    toggleTurn();
  } else {
    isGameEnded = true;
    updateGameStatus(status);
    showReplayButton();
    highlightWinCells(winPositions);
  }
}

function initCellElementList() {
  getCellElementList().forEach((cell, index) => {
    cell.dataset.idx = index;
    cell.addEventListener("click", () => handleClick(cell, index));
  });
}

function resetGame() {
  currentTurn = TURN.CROSS;
  isGameEnded = false;
  cellValues = new Array(9).fill("");

  getCellElementList().forEach(cell => (cell.className = "cell"));
  getCurrentTurnElement().className = TURN.CROSS;
  updateGameStatus(GAME_STATUS.PLAYING);
  hideReplayButton();
}

function initReplayButton() {
  getReplayButtonElement().addEventListener("click", resetGame);
}

(function init() {
  initCellElementList();
  initReplayButton();
  updateGameStatus(GAME_STATUS.PLAYING); // ✅ Important!
})();