import React from 'react'
import styled from 'styled-components';
import { settings } from './settings';
import { Floor, Robot } from './components';
import { getInitialState, gridReducer } from './reducers/gridReducer';
import { checkIsGridComplete, getNumberOfCleanedTiles } from './helpers/gridHelpers';


const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
  flex-direction: column;
  margin: 0 auto;
  width: ${settings.GRID_SIZE * settings.TILE_SIZE_IN_PX}px;
`;

const Room = styled.div`
  position: relative;
  border-radius: 5px;
  height: ${settings.GRID_SIZE * settings.TILE_SIZE_IN_PX}px;
  overflow: hidden;
`;

const Panel = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.4rem;
`;

const ResetButton = styled.button`
  background-color: #eee;
  color: #666;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  font-size: 1.4rem;

  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;

const Status = styled.p<{complete: boolean}>`
  color: ${({complete}) => complete ? '#a4d2a4' : '#666'};
  flex: 1;
`;

const App = () => {
  const [state, dispatch] = React.useReducer(gridReducer, getInitialState());
  const movementInterval = React.useRef<number>();
  const startTimeStamp = React.useRef<number>(new Date().getTime());

  React.useEffect(() => {
    movementInterval.current = window.setInterval(() => dispatch({type: 'MOVE'}), settings.ROBOT_SPEED_IN_MILLIS);
  }, []);

  React.useEffect(() => {
    if (checkIsGridComplete(state.grid)) {
      clearInterval(movementInterval.current);
    }
  }, [state.grid]);

  const handleReset = () => {
    clearInterval(movementInterval.current);
    dispatch({type: 'RESET'});

    startTimeStamp.current = new Date().getTime();
    movementInterval.current = window.setInterval(() => dispatch({type: 'MOVE'}), settings.ROBOT_SPEED_IN_MILLIS);
  };

  const hasStarted = getNumberOfCleanedTiles(state.grid) > 1;
  const isComplete = checkIsGridComplete(state.grid);
  const secondsPassed = Math.round((new Date().getTime() - startTimeStamp.current) / 1000);

  return (
    <AppContainer>
      <Room>
        <Robot position={state.currentPosition} animate={hasStarted} />
        <Floor grid={state.grid} />
      </Room>
      <Panel>
        <Status complete={isComplete}>
          {isComplete ? `Cleaning complete in ${secondsPassed} seconds` : 'Cleaning in progress...'}
        </Status>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </Panel>
    </AppContainer>
  );
}

export default App;
