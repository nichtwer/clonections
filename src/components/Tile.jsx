/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './styles/Tile.css';

function Tile({
  word, selected, onSelect, disabled, animateGuess, animateWrongGuess, ariaLabel,
}) {
  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect();
    }
  };

  const handleClick = () => {
    if (!disabled) onSelect();
  };

  const guessAnimation = animateGuess ? 'transform -translate-y-2' : '';

  const wrongGuessAnimation = animateWrongGuess ? 'animate-horizontal-shake' : '';

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        tile
        ${disabled ? 'disabled' : ''}
        ${guessAnimation}
        ${wrongGuessAnimation}
        transition ease-in-out
        ${selected
        ? 'bg-[var(--tile-selected-bg)] text-[var(--tile-selected-color)]'
        : 'bg-[var(--tile-bg)] text-[var(--tile-color)]'}
      `}
      aria-disabled={disabled}
      aria-label={ariaLabel}
    >
      {word}
    </div>
  );
}

Tile.propTypes = {
  word: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  animateGuess: PropTypes.bool,
  animateWrongGuess: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default Tile;
