import React from 'react';
import { render, screen } from '@testing-library/react';
import { Robot } from './Robot';

describe('Robot', () => {
  test('will render a cleaning robot SVG', () => {
    const mockPosition = {x: 0, y: 0};

    render(<Robot position={mockPosition} animate={false} />);

    const robot = screen.getByRole('img');
    expect(robot).toHaveAttribute('src', 'robot-vacuum-cleaner.svg');
    expect(robot).toHaveAttribute('alt', 'cleaning robot');
  });

  test('will rotate', () => {
    const initialPosition = {x: 0, y: 0};
    const nextPosition = {x: 1, y: 0};

    const {rerender} = render(<Robot position={initialPosition} animate={true} />);
    rerender(<Robot position={nextPosition} animate={true} />);

    const robot = screen.getByRole('img');

    expect(robot).toHaveStyle('transform: rotate(90deg)');
  });
});

