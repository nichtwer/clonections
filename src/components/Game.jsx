/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toast from './Toast';
import Tile from './Tile';
import ActionButton from './ActionButton';
import SolvedCategory from './SolvedCategory';
import './styles/Game.css';

function Game({ tilesData }) {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [mistakes, setMistakes] = useState(4);
  const [removingMistake, setRemovingMistake] = useState(null);
  // possible statuses: playing, won, lost, wrong
  const [status, setStatus] = useState('playing');
  const [solvedCategories, setSolvedCategories] = useState([]);
  const [newSolvedTheme, setNewSolvedTheme] = useState('');
  const [submittedSelections, setSubmittedSelections] = useState([]);
  const [guessAnimation, setGuessAnimation] = useState({ show: false, index: -1 });
  const [shakingTiles, setShakingTiles] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  /*
  Note: for each submitted section, the actual game saves the following:
  - correct (bool)
  - cards (i.e. "1,2,3,4")
  - solved level (0-4)
  */

  // Fisher-Yates shuffle algorithm
  const shuffleTiles = (arr) => {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Shuffle tiles upon render
  const [shuffledTiles, setShuffledTiles] = useState(() => shuffleTiles([...tilesData]));

  const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

  // Animates selected tiles from top to bottom
  // and left to right in the grid
  const animateGuess = async (tiles) => {
    // Save tiles' indices in shuffledTiles for quick lookup
    const tileIndexMap = new Map(shuffledTiles.map((tile, index) => [tile, index]));

    // Map selected tiles to indices
    const sortedSelectedTiles = tiles
      .map((tile) => ({
        tile,
        index: tileIndexMap.get(tile),
      }))
      .sort((a, b) => a.index - b.index);

    // Animate the tiles in sorted order
    for (let i = 0; i < sortedSelectedTiles.length; i += 1) {
      setGuessAnimation({ show: true, index: sortedSelectedTiles[i].index });
      // Delay between tiles
      await delay(150);
    }

    setGuessAnimation({ show: false, index: -1 });
    // Delay before next animation
    await delay(500);
  };

  const animateWrongGuess = async () => {
    setShakingTiles(true);
    await delay(225);
    setShakingTiles(false);
  };

  /*
  Allow tile to be selected if not a matched tile
  and less than 4 tiles have been selected.
  Deselect tile if already selected.
  */
  const handleTileSelect = (tile) => {
    if (status === 'lost' || (selectedTiles.length >= 4 && !selectedTiles.includes(tile))) return;

    if (selectedTiles.includes(tile)) {
      setSelectedTiles(selectedTiles.filter((t) => t !== tile));
    } else if (selectedTiles.length < 4) {
      if (status === 'wrong') {
        setStatus('playing');
      }
      setSelectedTiles([...selectedTiles, tile]);
    }
  };

  // Checks if all 4 tiles match (have the same theme)
  const isCorrectMatch = (tiles) => {
    if (tiles.length !== 4) return false;

    const themeCounts = {};

    for (let i = 0; i < tiles.length; i += 1) {
      const { theme } = tiles[i];
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    }

    const counts = Object.values(themeCounts);

    if (counts.length === 1) {
      // only one theme = 4 tiles with matching theme
      return true;
    }
    if (counts.length === 2 && (counts[0] === 1 || counts[0] === 3) && mistakes > 1) {
      // 3 tiles share 1 theme; 1 tile has mismatched theme
      // only show 'One away' alert when at least 2 mistakes remain
      setToastMessage('One away...');
    }
    return false;
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    const extractWords = (arr) => arr.map((item) => item.word);

    const sortedWords1 = extractWords(arr1).sort();
    const sortedWords2 = extractWords(arr2).sort();

    return sortedWords1.every((word, index) => word === sortedWords2[index]);
  };

  const checkSelection = async () => {
    if (selectedTiles.length === 4) {
      // Check if the current selection has already been submitted
      if (
        submittedSelections.some((selection) => arraysEqual(selection, selectedTiles))
      ) {
        setToastMessage('Already guessed!');
        return;
      }

      await animateGuess(selectedTiles);

      if (isCorrectMatch(selectedTiles)) {
        const { theme } = selectedTiles[0];
        const { category } = selectedTiles[0];
        const words = selectedTiles.map((t) => t.word);

        // Check for duplicate categories
        setSolvedCategories((prev) => (prev.some((cat) => cat.theme === theme)
          ? prev
          : [...prev, {
            theme, title: theme, words, category,
          }]));

        // Animate pulse effect for the solved category
        setNewSolvedTheme(theme);

        setTimeout(() => {
          setNewSolvedTheme('');
        }, 300);

        const unmatchedTiles = shuffledTiles.filter(
          (tile) => !selectedTiles.includes(tile),
        );
        setShuffledTiles(unmatchedTiles);

        // Clear selection after a correct match
        setSelectedTiles([]);

        // If all tiles are matched, game is won
        if (unmatchedTiles.length === 0) {
          setToastMessage('Sí sí sí sí!');
          setStatus('won');
        }
      } else {
        // Wrong selection
        await animateWrongGuess(selectedTiles);

        const newMistakes = mistakes - 1;

        // Set the index of the mistake being removed
        setRemovingMistake(newMistakes);

        // Wait for animation to finish before decrementing mistakes
        // and updating status
        setTimeout(() => {
          setRemovingMistake(null);
          setMistakes(newMistakes);
        }, 300);

        if (newMistakes === 0) {
          showToast('Ay no\u0021', 5000);
          setStatus('lost');
        } else {
          setStatus('wrong');
        }
      }
      setSubmittedSelections([...submittedSelections, selectedTiles]);
    }
  };

  // Action button handling (Submit, Shuffle, Deselect all)
  const handleShuffle = () => {
    const shuffledUnmatched = shuffleTiles(shuffledTiles);
    setShuffledTiles(shuffledUnmatched);
  };

  const handleDeselectAll = () => {
    setSelectedTiles([]);
  };

  return (
    <main className="container">
      <div className="instruction-text">Create four groups of four!</div>
      {/* Grid of word tiles */}
      <div className="grid" role="grid">
        {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
        )}
        {solvedCategories.map((cat) => (
          <SolvedCategory
            key={cat.theme}
            tile={cat}
            className={`${newSolvedTheme === cat.theme ? 'animate-pulse' : ''}`}
            aria-label={`Solved category ${cat.theme} with words ${cat.words.join(', ')}`}
          />
        ))}
        {shuffledTiles.map((tile) => (
          <Tile
            key={tile.word}
            word={tile.word}
            selected={selectedTiles.includes(tile)}
            onSelect={() => handleTileSelect(tile)}
            disabled={(status === 'won' || status === 'lost') || (selectedTiles.length >= 4 && !selectedTiles.includes(tile))}
            animateGuess={guessAnimation.show
               && guessAnimation.index === shuffledTiles.indexOf(tile)}
            animateWrongGuess={shakingTiles && selectedTiles.includes(tile)}
            aria-label={`Tile ${tile.word}`}
            tabIndex={0}
            role="button"
          />
        ))}
      </div>

      <div className="mistakesWrapper">
        <div className="mistakesContent">
          Mistakes Remaining:&nbsp;
          <span className="mistakesRemaining">
            {Array.from({ length: mistakes }, (_, index) => (
              <span
                key={index}
                className={`circle ${removingMistake === index ? 'animate-fade-out' : ''}`}
                data-testid="mistake"
              />
            ))}
          </span>
        </div>
      </div>

      {/* Shuffle, Deselect all, and Submit */}
      <div className="actionButtonGrid">
        <ActionButton
          onClick={handleShuffle}
          disabled={status === 'won' || status === 'lost'}
          aria-label="Shuffle tiles"
        >
          Shuffle
        </ActionButton>
        <ActionButton
          onClick={handleDeselectAll}
          disabled={selectedTiles.length < 1 || status === 'won' || status === 'lost'}
          aria-label="Deselect all selected tiles"
        >
          Deselect All
        </ActionButton>
        <ActionButton
          onClick={checkSelection}
          disabled={selectedTiles.length !== 4 || status !== 'playing'}
          aria-label="Submit tile selection"
          type="submit"
        >
          Submit
        </ActionButton>
      </div>
    </main>
  );
}

Game.propTypes = {
  tilesData: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      category: PropTypes.number.isRequired,
      colors: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default Game;
