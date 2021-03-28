import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { settings } from './settings';
import { Floor, Robot } from './components';
import { getInitialState, gridReducer } from './gridReducer';
import { checkIsGridComplete } from './gridHelpers';

const App = () => {
  const [state, dispatch] = React.useReducer(gridReducer, getInitialState());
  const [totalTimeInMillis, setTotalTimeInMillis] = useState<number>(0);
  const movementInterval = React.useRef<number>(0);

  useEffect(() => {
    if (!checkIsGridComplete(state.grid)) {
      movementInterval.current = window.setInterval(() => {
        setTotalTimeInMillis(totalTimeInMillis => totalTimeInMillis + settings.ROBOT_SPEED_IN_MILLIS);
        dispatch({type: 'MOVE'});
      }, settings.ROBOT_SPEED_IN_MILLIS);

      return () => clearTimeout(movementInterval.current);
    }
  }, [state.grid]);

  const handleReset = () => {
    clearTimeout(movementInterval.current);
    setTotalTimeInMillis(0);
    dispatch({type: 'RESET'});
  };

  const secondsPassed = (totalTimeInMillis / 1000).toFixed(1);
  const hasStarted = totalTimeInMillis > 0;

  return (
    <AppContainer>
      <Room>
        <Robot position={state.currentPosition} animate={hasStarted} />
        <Floor grid={state.grid} />
      </Room>
      <Panel>
        <Status complete={checkIsGridComplete(state.grid)}>
          {checkIsGridComplete(state.grid)
            ? `Cleaning complete in ${secondsPassed} seconds`
            : 'Cleaning in progress'
          }
        </Status>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </Panel>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  width: ${settings.GRID_SIZE * settings.TILE_SIZE_IN_PX}px;
  margin: auto;
`;

const Room = styled.div`
  position: relative;
  border-radius: 5px;
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

export default App;
