import {
  checkIsGridComplete,
  generateGrid,
  getNumberOfCleanedTiles,
  getRandomAdjacentPosition,
  getRandomPosition
} from './gridHelpers';

describe('Grid helper function', () => {
  describe('generateGrid', () => {
    test('returns a grid with rows and columns equal to the specified grid size', () => {
      const gridSize = 10;
      const grid = generateGrid(gridSize);

      expect(grid.length).toBe(gridSize);
      expect(grid[0].length).toBe(gridSize);
    });

    test('throws an exception if grid size is less than 1', () => {
      expect(() => generateGrid(0)).toThrow();
      expect(() => generateGrid(-1)).toThrow();
    });
  });

  describe('checkIsGridComplete', () => {
    test('returns true if all tiles are true', () => {
      const grid = [
        [true, true],
        [true, true]
      ];

      expect(checkIsGridComplete(grid)).toBe(true);
    });

    test('returns false if any tile is false', () => {
      const grid = [
        [true, true],
        [true, false]
      ];

      expect(checkIsGridComplete(grid)).toBe(false);
    });
  });

  describe('getNumberOfCleanedTiles', () => {
    test('returns number of tiles set to true', () => {
      const grid = [
        [true, true],
        [true, false]
      ];

      expect(getNumberOfCleanedTiles(grid)).toBe(3);
    });
  });

  describe('getRandomPosition', () => {
    test('returns a coordinate within specified size', () => {
      const gridSize = 10;
      const coordinate = getRandomPosition(gridSize);

      expect(coordinate.x).toBeGreaterThanOrEqual(0);
      expect(coordinate.x).toBeLessThan(gridSize);
      expect(coordinate.y).toBeGreaterThanOrEqual(0);
      expect(coordinate.y).toBeLessThan(gridSize);
    });

    test('throws an exception if grid size is less than 1', () => {
      expect(() => generateGrid(0)).toThrow();
      expect(() => generateGrid(-1)).toThrow();
    });
  });

  describe('getRandomAdjacentPosition', () => {
    test('returns a coordinate adjacent to current position', () => {
      const gridSize = 10;
      const currentPosition = {x: 1, y: 1};
      const adjacentPosition = getRandomAdjacentPosition(currentPosition, gridSize);

      const isLeftOrRightToCurrent = (
        currentPosition.y === adjacentPosition.y &&
        (currentPosition.x === adjacentPosition.x-1 || currentPosition.x === adjacentPosition.x+1)
      );

      const isToporBottomOfCurrent = (
        currentPosition.x === adjacentPosition.x &&
        (currentPosition.y === adjacentPosition.y-1 || currentPosition.y === adjacentPosition.y+1)
      );

      const isAdjacentToCurrent = isLeftOrRightToCurrent || isToporBottomOfCurrent;

      expect(isAdjacentToCurrent).toBe(true);
    });

    test('throws an exception if coordinate is outside grid', () => {
      const gridSize = 2;
      const currentPosition = {x: 4, y: 7};

      expect(() => getRandomAdjacentPosition(currentPosition, gridSize)).toThrow();
    });

    test('throws an exception if grid size is less than 1', () => {
      expect(() => generateGrid(0)).toThrow();
      expect(() => generateGrid(-1)).toThrow();
    });
  });
});