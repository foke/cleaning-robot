import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { settings } from './settings';
import App from './App';

describe('App', () => {
  test('will start with one clean tile', () => {
    render(<App />);

    const tiles = screen.getAllByTestId('tile-clean');

    expect(tiles.length).toBe(1);
  });

  test('will clean another tile on the second move', () => {
    jest.useFakeTimers();

    render(<App />);

    act(() => {
      jest.advanceTimersByTime(settings.ROBOT_SPEED_IN_MILLIS)
    });

    const tiles = screen.getAllByTestId('tile-clean');

    expect(tiles.length).toBe(2);
  });

  test('will reset grid on button click', () => {
    jest.useFakeTimers();

    render(<App />);

    act(() => {
      jest.advanceTimersByTime(settings.ROBOT_SPEED_IN_MILLIS)
    });

    const resetButtonElement = screen.getByText('Reset');
    fireEvent.click(resetButtonElement);

    const tiles = screen.getAllByTestId('tile-clean');

    expect(tiles.length).toBe(1);
  });
});

