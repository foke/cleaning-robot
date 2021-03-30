import React from 'react';
import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';

describe('Panel', () => {
  test('renders a reset button', () => {
    render(<Panel onReset={jest.fn()} isComplete={false} secondsPassed={0} />);
    const resetButtonElement = screen.getByText('Reset');
    expect(resetButtonElement).toBeInTheDocument();
  });

  test('renders in progress text when not complete', () => {
    render(<Panel onReset={jest.fn()} isComplete={false} secondsPassed={0} />);
    const textElement = screen.getByText('Cleaning in progress...');
    expect(textElement).toBeInTheDocument();
  });

  test('renders complete text with elapsed time when complete', () => {
    render(<Panel onReset={jest.fn()} isComplete={true} secondsPassed={10} />);
    const textElement = screen.getByText('Cleaning complete in 10 seconds');
    expect(textElement).toBeInTheDocument();
  });
});

