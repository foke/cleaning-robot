import React from 'react';
import styled from 'styled-components';
import { settings } from '../../settings';

interface IFloorProps {
  grid: boolean[][];
}

const Row = styled.div`
  display: flex;
`;

const Col = styled.div<{clean: boolean}>`
  width: ${settings.TILE_SIZE_IN_PX}px;
  height: ${settings.TILE_SIZE_IN_PX}px;
  background-color: ${({clean}) => clean ? '#a4d2a4' : '#d5c6bb'};
  border: 1px solid #fff;
  box-sizing: border-box;
  transition: background-color ${settings.ROBOT_SPEED_IN_MILLIS/1000}s;
`;

export const Floor: React.FC<IFloorProps> = ({grid}) => {
  return (
    <>
      {grid.map((row, index) => (
        <Row key={index}>
          {row.map((column, index) => (
            <Col clean={column} key={index} data-testid={column ? 'tile-clean' : 'tile-dirty'} />
          ))}
        </Row>
      ))}
    </>
  );
};