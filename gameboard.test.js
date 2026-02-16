import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

describe("Gameboard", () => {
    test("creates empty gameboard", () => {
        const board = new Gameboard();
        expect(board).toBeDefined();
    });

    test("can place a ship at specific coordinates", () => {
        const board = new Gameboard();
        const ship = new Ship(3);
        board.placeShip(ship, [0, 0], "horizontal");
        expect(board.getShipAt([0, 0])).toBe(ship);
    });

    test("receiveAttack registers a hit on a ship", () => {
        const board = new Gameboard();
        const ship = new Ship(2);
        board.placeShip(ship, [3, 4], "horizontal");
        board.receiveAttack([3, 4]);
        expect(ship.hits).toBe(1);
    });

    test('receiveAttack records missed shots', () => {
    const board = new Gameboard();
    board.receiveAttack([5, 5]);
    expect(board.missedAttacks).toContainEqual([5, 5]);
  });

  test('tracks multiple missed attacks', () => {
    const board = new Gameboard();
    board.receiveAttack([1, 1]);
    board.receiveAttack([2, 2]);
    expect(board.missedAttacks.length).toBe(2);
  });

  test('allShipsSunk returns false when ships are afloat', () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0], 'horizontal');
    expect(board.allShipsSunk()).toBe(false);
  });

  test('allShipsSunk returns true when all ships are sunk', () => {
    const board = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(1);
    board.placeShip(ship1, [0, 0], 'horizontal');
    board.placeShip(ship2, [2, 2], 'horizontal');
    
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([2, 2]);
    
    expect(board.allShipsSunk()).toBe(true);
  });

  test('prevents placing ship out of bounds horizontally', () => {
    const board = new Gameboard();
    const ship = new Ship(5);
    const result = board.placeShip(ship, [0, 8], 'horizontal');
    expect(result).toBe(false);
  });

  test('prevents placing ship out of bounds vertically', () => {
    const board = new Gameboard();
    const ship = new Ship(4);
    const result = board.placeShip(ship, [8, 0], 'vertical');
    expect(result).toBe(false);
  });

  test('prevents overlapping ships', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    board.placeShip(ship1, [0, 0], 'horizontal');
    const result = board.placeShip(ship2, [0, 1], 'horizontal');
    expect(result).toBe(false);
  });

  test('allows valid ship placement', () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    const result = board.placeShip(ship, [2, 2], 'horizontal');
    expect(result).toBe(true);
  });

  test('prevents duplicate attacks', () => {
    const board = new Gameboard();
    board.receiveAttack([5, 5]);
    const result = board.receiveAttack([5, 5]);
    
    expect(result).toBe(false);
    expect(board.missedAttacks.length).toBe(1);
  });
});