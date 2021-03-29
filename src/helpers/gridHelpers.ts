import { ICoordinate } from '../interfaces';

enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

export const generateGrid = (gridSize: number): boolean[][] => {
  if (gridSize < 1) {
    throw new Error('Size cannot be less than 1');
  }

  const array2d: boolean[][] = [];

  for (let i = 0; i < gridSize; i++) {
    const x = Array(gridSize).fill(false);
    array2d.push(x);
  }

  return array2d;
};

export const checkIsGridComplete = (grid: boolean[][]): boolean => {
  return grid.every(row => row.every(column => column));
};

export const getNumberOfCleanedTiles = (grid: boolean[][]): number => {
  const cleanedTiles = grid.flatMap(row => row.filter(column => column)).length;
  return cleanedTiles;
};

export const getRandomPosition = (gridSize: number): ICoordinate => {
  if (gridSize < 1) {
    throw new Error('Size cannot be less than 1');
  }

  const randomX = Math.floor(Math.random() * gridSize);
  const randomY = Math.floor(Math.random() * gridSize);

  return {x: randomX, y: randomY};
};

export const getRandomAdjacentPosition = (currentPosition: ICoordinate, gridSize: number): ICoordinate => {
  if (gridSize < 1) {
    throw new Error('Grid size cannot be less than 1');
  }

  const isPositionOutsideGrid = (
    currentPosition.x < 0 ||
    currentPosition.y < 0 ||
    currentPosition.x >= gridSize ||
    currentPosition.y >= gridSize
  );
  if (isPositionOutsideGrid) {
    throw new Error('Position must be within grid size');
  }

  const direction = getRandomAllowedDirection(currentPosition, gridSize);
  const {x, y} = currentPosition;

  if (direction === Direction.WEST) {
    return {x: x-1, y};
  } else if (direction === Direction.EAST) {
    return {x: x+1, y};
  } else if (direction === Direction.NORTH) {
    return { x, y: y-1};
  } else if (direction === Direction.SOUTH) {
    return {x, y: y+1};
  }

  return {x, y};
};

const getRandomAllowedDirection = (currentPosition: ICoordinate, gridSize: number): Direction => {
  const allowedDirections = [];

  if (currentPosition.x > 0) {
    allowedDirections.push(Direction.WEST);
  }

  if (currentPosition.x < gridSize-1) {
    allowedDirections.push(Direction.EAST);
  }

  if (currentPosition.y > 0) {
    allowedDirections.push(Direction.NORTH);
  }

  if (currentPosition.y < gridSize-1) {
    allowedDirections.push(Direction.SOUTH);
  }

  const randomIndex = Math.floor(Math.random() * allowedDirections.length);

  return allowedDirections[randomIndex];
};