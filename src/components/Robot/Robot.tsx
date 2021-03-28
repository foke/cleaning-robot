import React from 'react';
import { settings } from '../../settings';
import robot from './robot-vacuum-cleaner.svg';
import styled from 'styled-components';
import { ICoordinate } from '../../interfaces';

interface IRobotProps {
  position: ICoordinate;
  animate: boolean;
};

export const Robot: React.FC<IRobotProps> = ({position, animate}) => {
  const [rotationAngle, setRotationAngle] = React.useState<number>(0);
  const previousPosititon = React.useRef<ICoordinate|null>(null);

  React.useEffect(() => {
    setRotationAngle(0);
    if (previousPosititon.current && animate) {
      if (position.x > previousPosititon.current.x) {
        setRotationAngle(90);
      } else if (position.x < previousPosititon.current.x) {
        setRotationAngle(270);
      } else if (position.y > previousPosititon.current.y) {
        setRotationAngle(180);
      } else {
        setRotationAngle(0);
      }
    }
    previousPosititon.current = position;
  }, [position, animate]);

  return (
    <RobotWrapper position={position} animate={animate}>
      <RobotImage rotation={rotationAngle} src={robot} alt="robot" />
    </RobotWrapper>
  );
};

const RobotWrapper = styled.div<{position: ICoordinate, animate: boolean}>`
  position: absolute;
  transform: translate(
    ${({position}) => position.x * settings.TILE_SIZE_IN_PX}px,
    ${({position}) => position.y * settings.TILE_SIZE_IN_PX}px
  );
  transition: ${({animate}) => animate ? `transform ${settings.ROBOT_SPEED_IN_MILLIS/1000}s linear` : ''};
`;

const RobotImage = styled.img<{rotation: number}>`
  transform: rotate(${({rotation}) => rotation}deg);
  width: ${settings.TILE_SIZE_IN_PX}px;
  height: ${settings.TILE_SIZE_IN_PX}px;
`;