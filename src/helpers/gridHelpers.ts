import { ICoordinate } from '../interfaces';
import { settings } from '../settings';

enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

export const generateGrid = (): boolean[][] => {
  const array2d: boolean[][] = [];

  for (let i = 0; i < settings.GRID_SIZE; i++) {
    const x = Array(settings.GRID_SIZE).fill(false);
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

export const getRandomPosition = (): ICoordinate => {
  const randomX = Math.floor(Math.random() * settings.GRID_SIZE);
  const randomY = Math.floor(Math.random() * settings.GRID_SIZE);

  return {x: randomX, y: randomY};
};

export const getRandomAdjacentPosition = (currentPosition: ICoordinate): ICoordinate => {
  const direction = getRandomAllowedDirection(currentPosition);
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

const getRandomAllowedDirection = (currentPosition: ICoordinate): Direction => {
  const allowedDirections = [];

  if (currentPosition.x > 0) {
    allowedDirections.push(Direction.WEST);
  }

  if (currentPosition.x < settings.GRID_SIZE-1) {
    allowedDirections.push(Direction.EAST);
  }

  if (currentPosition.y > 0) {
    allowedDirections.push(Direction.NORTH);
  }

  if (currentPosition.y < settings.GRID_SIZE-1) {
    allowedDirections.push(Direction.SOUTH);
  }

  const randomIndex = Math.floor(Math.random() * allowedDirections.length);

  return allowedDirections[randomIndex];
};