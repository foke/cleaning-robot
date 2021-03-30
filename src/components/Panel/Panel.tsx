import React from 'react';
import styled from 'styled-components';

interface IPanelProps {
  isComplete: boolean;
  secondsPassed: number;
  onReset: () => void;
}

const PanelWrapper = styled.div`
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

export const Panel: React.FC<IPanelProps> = ({isComplete, secondsPassed, onReset}) => {
  return (
    <PanelWrapper>
      <Status complete={isComplete}>
        {isComplete ? `Cleaning complete in ${secondsPassed} seconds` : 'Cleaning in progress...'}
      </Status>
      <ResetButton onClick={onReset}>Reset</ResetButton>
    </PanelWrapper>
  );
};