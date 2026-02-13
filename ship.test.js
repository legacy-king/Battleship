import Ship from './ship.js';

describe('Ship', () => {
  test('creates a ship with a length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  test('ship starts with 0 hits', () => {
    const ship = new Ship(4);
    expect(ship.hits).toBe(0);
  });

  test('ship is not sunk initially', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
  });
});