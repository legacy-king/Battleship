import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';

// Game state
let humanPlayer;
let computerPlayer;
let gameStarted = false;
let currentTurn = 'human';

// DOM elements
const playerBoardEl = document.getElementById('player-board');
const computerBoardEl = document.getElementById('computer-board');
const gameStatusEl = document.getElementById('game-status');
const randomShipsBtn = document.getElementById('random-ships-btn');
const startGameBtn = document.getElementById('start-game-btn');
const resetBtn = document.getElementById('reset-btn');

// Ship sizes
const SHIP_SIZES = [5, 4, 3, 3, 2];

// Initialize game
function initGame() {
  humanPlayer = new Player('human');
  computerPlayer = new Player('computer');
  gameStarted = false;
  currentTurn = 'human';
  
  renderBoard(playerBoardEl, humanPlayer.gameboard, true);
  renderBoard(computerBoardEl, computerPlayer.gameboard, false);
  
  gameStatusEl.textContent = 'Place your ships to start!';
  startGameBtn.disabled = true;
}

// Render a gameboard
function renderBoard(boardElement, gameboard, showShips) {
  boardElement.innerHTML = '';
  
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      
      // Check if there's a ship
      if (showShips && gameboard.getShipAt([x, y])) {
        cell.classList.add('ship');
      }
      
      // Check if attacked
      const isAttacked = gameboard.allAttacks.some(
        attack => attack[0] === x && attack[1] === y
      );
      
      if (isAttacked) {
        cell.classList.add('attacked');
        if (gameboard.getShipAt([x, y])) {
          cell.classList.add('hit');
        } else {
          cell.classList.add('miss');
        }
      }
      
      // Add click handler for computer board
      if (!showShips && gameStarted) {
        cell.addEventListener('click', () => handleAttack(x, y));
      }
      
      boardElement.appendChild(cell);
    }
  }
}

// Place ships randomly
function placeShipsRandomly(gameboard) {
  for (let size of SHIP_SIZES) {
    let placed = false;
    
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      
      const ship = new Ship(size);
      placed = gameboard.placeShip(ship, [x, y], orientation);
    }
  }
}

// Handle attack
function handleAttack(x, y) {
  if (currentTurn !== 'human' || !gameStarted) return;
  
  const result = computerPlayer.gameboard.receiveAttack([x, y]);
  
  if (!result) {
    gameStatusEl.textContent = 'Already attacked there! Try again.';
    return;
  }
  
  renderBoard(computerBoardEl, computerPlayer.gameboard, false);
  
  // Check if human won
  if (computerPlayer.gameboard.allShipsSunk()) {
    gameStatusEl.textContent = '🎉 You won! All enemy ships destroyed!';
    gameStarted = false;
    return;
  }
  
  gameStatusEl.textContent = 'Computer is thinking...';
  currentTurn = 'computer';
  
  // Computer's turn
  setTimeout(computerTurn, 1000);
}

// Computer's turn
function computerTurn() {
  const attack = computerPlayer.makeRandomAttack();
  humanPlayer.gameboard.receiveAttack(attack);
  
  renderBoard(playerBoardEl, humanPlayer.gameboard, true);
  
  // Check if computer won
  if (humanPlayer.gameboard.allShipsSunk()) {
    gameStatusEl.textContent = '💀 Computer won! All your ships destroyed!';
    gameStarted = false;
    return;
  }
  
  gameStatusEl.textContent = 'Your turn! Click on enemy board to attack.';
  currentTurn = 'human';
}

// Event listeners
randomShipsBtn.addEventListener('click', () => {
  humanPlayer = new Player('human');
  placeShipsRandomly(humanPlayer.gameboard);
  renderBoard(playerBoardEl, humanPlayer.gameboard, true);
  startGameBtn.disabled = false;
  gameStatusEl.textContent = 'Ships placed! Click "Start Game" when ready.';
});

startGameBtn.addEventListener('click', () => {
  placeShipsRandomly(computerPlayer.gameboard);
  gameStarted = true;
  startGameBtn.disabled = true;
  randomShipsBtn.disabled = true;
  gameStatusEl.textContent = 'Game started! Click on enemy board to attack.';
  renderBoard(computerBoardEl, computerPlayer.gameboard, false);
});

resetBtn.addEventListener('click', () => {
  initGame();
  randomShipsBtn.disabled = false;
});

// Initialize on load
initGame();