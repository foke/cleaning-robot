import React from 'react';
import { render, screen } from '@testing-library/react';
import { Robot } from './Robot';

describe('Robot', () => {
  test('renders', () => {
    const mockPosition = {x: 0, y: 0};

    render(<Robot position={mockPosition} animate={false} />);
  });
});

