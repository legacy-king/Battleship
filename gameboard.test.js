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
});