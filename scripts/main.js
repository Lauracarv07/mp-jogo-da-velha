// ESCREVA SUA LÓGICA AQUI

function main() {
  alert("Bem vindo ao jogo da velha!");
}

window.onload = () => {
  main();
};


// Seleciona as células e a sobreposição de mensagem
const cells = document.querySelectorAll('.celula');
const overlay = document.querySelector('.overlay');
let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;

// Combinações vencedoras
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

// Inicia o jogo e adiciona ouvintes de eventos às células
function startGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
}

// Manipula o clique na célula
function handleClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameActive && !board[cellIndex]) {
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      displayMessage(`Jogador ${currentPlayer} venceu!`);
      gameActive = false;
    } else if (board.every(cell => cell)) {
      displayMessage("Empate!");
      gameActive = false;
    } else {
      switchPlayer();
    }
  }
}

// Alterna entre jogadores X e O
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Verifica se há um vencedor
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Exibe a mensagem de vitória ou empate
function displayMessage(message) {
  overlay.classList.add('active');
  overlay.innerHTML = `<div class="overlay-message">${message}</div>`;
  setTimeout(resetGame, 2000);  // Reinicia após 2 segundos
}

// Reinicia o jogo
function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.removeEventListener('click', handleClick);
  });
  overlay.classList.remove('active');
  currentPlayer = "X";
  gameActive = true;
  startGame();
}

// Inicia o jogo ao carregar o script
startGame();

