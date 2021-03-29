import { ICoordinate } from '../interfaces';
import { generateGrid, getRandomAdjacentPosition, getRandomPosition } from '../helpers/gridHelpers';

type State = { currentPosition: ICoordinate, grid: boolean[][] };
type Action = { type: 'RESET' | 'MOVE' };

// returns a random start position and a new grid (with start position marked as cleaned)
export const getInitialState = () => {
  const currentPosition = getRandomPosition();
  const grid = generateGrid();
  grid[currentPosition.y][currentPosition.x] = true;

  return { grid, currentPosition };
};

// returns a new position and the grid (with new position marked as cleaned)
const getNextMove = (state: State) => {
  const currentPosition = getRandomAdjacentPosition(state.currentPosition!);
  const grid = state.grid.map((row, y) => {
    return row.map((column, x) => {
      const isCurrentPosition = (x === currentPosition.x && y === currentPosition.y);
      return isCurrentPosition ? true : column;
    });
  });
  return { grid, currentPosition };
}

export const gridReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'RESET':
      return getInitialState();


    case 'MOVE':
      return getNextMove(state);

    default:
      throw new Error('Not a valid action: ' + action.type);
  }
};