import React from 'react';
import { render, screen } from '@testing-library/react';
import Tile from '../Tile';

test('Tile renders correctly (unselected)', () => {
  render(<Tile word="Test" selected={false} disabled={false} />);

  const tile = screen.getByText('Test');

  expect(tile).toBeInTheDocument();
  expect(tile).toHaveClass('bg-[var(--tile-bg)]');
  expect(tile).toHaveClass('text-[var(--tile-color)]');
});

test('Tile renders correctly when selected', () => {
  render(<Tile word="Test" selected disabled={false} />);

  const tile = screen.getByText('Test');

  expect(tile).toHaveClass('bg-[var(--tile-selected-bg)]');
  expect(tile).toHaveClass('text-[var(--tile-selected-color)]');
});
