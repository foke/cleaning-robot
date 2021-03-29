import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders a reset button', () => {
    render(<App />);
    const resetButtonElement = screen.getByText('Reset');
    expect(resetButtonElement).toBeInTheDocument();
  });

  test('renders info text', () => {
    render(<App />);
    const resetButtonElement = screen.getByText('Cleaning in progress...');
    expect(resetButtonElement).toBeInTheDocument();
  });
});

