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

  test("hit() increases the ship's hits", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("multiple hits increase hit count", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("ship sinks when hits equal length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("ship does not sink if hits are less than length", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});