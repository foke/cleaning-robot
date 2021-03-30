import React from 'react';
import { render, screen } from '@testing-library/react';
import { Floor } from './Floor';

describe('Floor', () => {
  test('renders a grid', () => {
    const mockGrid = [[true, false], [false, false]];
    render(<Floor grid={mockGrid} />);

    const tiles = screen.getAllByTestId(/tile/);

    expect(tiles.length).toBe(4);
  });
});

