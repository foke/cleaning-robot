import { getNumberOfCleanedTiles } from '../helpers/gridHelpers';
import { settings } from '../settings';
import { getInitialState, gridReducer } from './gridReducer';

describe('grid reducer', () => {
  test('should handle RESET action',  () => {
    const nextState = gridReducer(getInitialState(), {type: 'RESET'});

    const numberOfCleanedTiles = getNumberOfCleanedTiles(nextState.grid);

    const {x, y} = nextState.currentPosition;

    expect(x).toBeGreaterThanOrEqual(0);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(settings.GRID_SIZE);
    expect(y).toBeLessThan(settings.GRID_SIZE);

    expect(numberOfCleanedTiles).toBe(1);
    expect(nextState.grid[y][x]).toBe(true);

  });

  test('should handle MOVE action',  () => {
    const initialState = getInitialState();
    const nextState = gridReducer(initialState, {type: 'MOVE'});

    const numberOfCleanedTiles = getNumberOfCleanedTiles(nextState.grid);
    const isSameXOrY = (
      initialState.currentPosition.x === nextState.currentPosition.x ||
      initialState.currentPosition.y === nextState.currentPosition.y
    );
    const hasMovedOneStep = (
      Math.abs(initialState.currentPosition.x - nextState.currentPosition.x) === 1 ||
      Math.abs(initialState.currentPosition.y - nextState.currentPosition.y) === 1
    );

    expect(numberOfCleanedTiles).toBe(2);
    expect(isSameXOrY).toBe(true);
    expect(hasMovedOneStep).toBe(true);
  });
});