winSound.play();
function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  const percentText = document.getElementById("percentText");

const interval = setInterval(() => {
  if (progress >= 100) {
    clearInterval(interval);
    document.getElementById('loaderScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
  } else {
    progress += Math.random() * 10;
    progress = Math.min(progress, 100);
    progressBar.style.width = progress + "%";
    percentText.textContent = Math.floor(progress) + "%";
  }
}, 100);

  makeMove(move, 'O');

  if (checkWin()) {
    gameActive = false;
    updateStatus('Player O (AI) Wins! 🤖🎉');
    scores.O++;
    updateScoreboard();
    highlightWinner();
    winSound.play();
    return;
  }

  if (board.every(cell => cell !== '')) {
    gameActive = false;
    updateStatus("It's a Draw! 🤝");
    return;
  }

  currentPlayer = 'X';
  updateStatus(`Player ${currentPlayer}'s Turn`);
}
function highlightMode() {
  btnPvP.classList.toggle('active', !vsAI);
  btnPvAI.classList.toggle('active', vsAI);
}

btnPvP.addEventListener('click', () => {
  handleModeChange(false);
  highlightMode();
});

btnPvAI.addEventListener('click', () => {
  handleModeChange(true);
  highlightMode();
});

function minimax(newBoard, depth, isMaximizing) {
  if (checkStaticWin(newBoard, 'O')) return 10 - depth;
  if (checkStaticWin(newBoard, 'X')) return depth - 10;
  if (newBoard.every(cell => cell !== '')) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === '') {
        newBoard[i] = 'O';
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        newBoard[i] = '';
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === '') {
        newBoard[i] = 'X';
        best = Math.min(best, minimax(newBoard, depth + 1, true));
        newBoard[i] = '';
      }
    }
    return best;
  }
}

function checkStaticWin(boardToCheck, player) {
  return winningCombos.some(combo => 
    combo.every(index => boardToCheck[index] === player)
  );
}
