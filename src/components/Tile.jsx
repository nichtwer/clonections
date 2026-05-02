/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './styles/Tile.css';

function Tile({
  word, selected, onSelect, disabled, className,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`
        tile
        ${disabled ? 'disabled' : ''}
        ${className}
        transition-colors duration-300 ease-in-out
        ${selected
        ? 'bg-[var(--tile-selected-bg)] text-[var(--tile-selected-color)]'
        : 'bg-[var(--tile-bg)] text-[var(--tile-color)]'}
      `}
      aria-disabled={disabled}
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
  className: PropTypes.string,
};

export default Tile;
