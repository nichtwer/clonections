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

  // Splits the string into an array of words
  const words = word.split(' ');

  // Checks if any individual word is strictly greater than 8 characters
  const hasLongWord = words.some((w) => w.length > 8);

  // Checks if the total character count (including spaces) is greater than 15
  const isTooLong = word.length > 15;

  // Flag as long text if either condition is met
  const isLongText = hasLongWord || isTooLong;
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        tile
        ${isLongText ? 'long-text' : ''}
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
