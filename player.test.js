import Player from './player.js';
import Gameboard from './gameboard.js';

describe('Player', () => {
  test('creates a player with a gameboard', () => {
    const player = new Player('human');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('player has a type', () => {
    const human = new Player('human');
    const computer = new Player('computer');
    expect(human.type).toBe('human');
    expect(computer.type).toBe('computer');
  });

  test('computer can make a random attack', () => {
    const computer = new Player('computer');
    const attack = computer.makeRandomAttack();
    expect(Array.isArray(attack)).toBe(true);
    expect(attack.length).toBe(2);
  });
});
