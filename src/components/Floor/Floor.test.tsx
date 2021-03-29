import React from 'react';
import { render, screen } from '@testing-library/react';
import { Floor } from './Floor';

describe('Floor', () => {
  test('renders', () => {
    const mockGrid = [[true, false], [false, false]];
    render(<Floor grid={mockGrid} />);
  });
});

