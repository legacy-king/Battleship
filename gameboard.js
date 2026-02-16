class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, coordinates, orientation) {
    const [x, y] = coordinates;
    const positions = [];
    
    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        positions.push([x, y + i]);
      } else {
        positions.push([x + i, y]);
      }
    }
    
    this.ships.push({ ship, positions });
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
    const ship = this.getShipAt(coordinates);
    
    if (ship) {
      ship.hit();
    } else {
      this.missedAttacks.push(coordinates);
    }
  }

  allShipsSunk() {
    return this.ships.every(shipData => shipData.ship.isSunk());
  }
}

export default Gameboard;