import Gameboard from './gameboard.js';

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.attackHistory = [];
  }

  makeRandomAttack() {
    let x, y;
    let isValid = false;

    while (!isValid) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      
      // Check if this coordinate was already attacked
      isValid = !this.attackHistory.some(
        attack => attack[0] === x && attack[1] === y
      );
    }

    this.attackHistory.push([x, y]);
    return [x, y];
  }

  attack(enemyGameboard, coordinates) {
    this.attackHistory.push(coordinates);
    enemyGameboard.receiveAttack(coordinates);
  }
}

export default Player;