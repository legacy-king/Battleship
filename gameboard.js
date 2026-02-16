class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.allAttacks = [];  // Track ALL attacks
  }

 placeShip(ship, coordinates, orientation) {
    const [x, y] = coordinates;
    const positions = [];
    
    // Calculate positions
    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        positions.push([x, y + i]);
      } else {
        positions.push([x + i, y]);
      }
    }
    
    // Validate: Check bounds (10x10 board)
    for (let pos of positions) {
      if (pos[0] < 0 || pos[0] >= 10 || pos[1] < 0 || pos[1] >= 10) {
        return false;
      }
    }
    
    // Validate: Check for overlapping ships
    for (let pos of positions) {
      if (this.getShipAt(pos)) {
        return false;
      }
    }
    
    // If valid, place the ship
    this.ships.push({ ship, positions });
    return true;
  }
  getShipAt(coordinates) {
    const [x, y] = coordinates;
    
    for (let shipData of this.ships) {
      for (let pos of shipData.positions) {
        if (pos[0] === x && pos[1] === y) {
          return shipData.ship;
        }
      }
    }
    return null;
  }

  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    
    // Check if already attacked
    const alreadyAttacked = this.allAttacks.some(
      attack => attack[0] === x && attack[1] === y
    );
    
    if (alreadyAttacked) {
      return false;  // Attack rejected - already hit this spot
    }
    
    // Record this attack
    this.allAttacks.push(coordinates);
    
    // Check if it hit a ship
    const ship = this.getShipAt(coordinates);
    
    if (ship) {
      ship.hit();
      return true;  // Hit!
    } else {
      this.missedAttacks.push(coordinates);
      return true;  // Miss, but valid attack
    }
  }
  allShipsSunk() {
    return this.ships.every(shipData => shipData.ship.isSunk());
  }
}

export default Gameboard;