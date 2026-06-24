import React from 'react';
import Game from './components/Game';
import mockTilesData from './components/data/mockTileData';

function App() {
  const tilesData = mockTilesData.flatMap((theme) => theme.words.map((word) => ({
    word,
    theme: theme.theme,
    category: theme.category,
    colors: theme.colors,
  })));
  return (
    <div className="App">
      <header className="nyt-top-bar">
        <div className="nyt-top-bar-left">
          <button className="hamburger-btn" aria-label="Menu">&#9776;</button>
          <span className="nyt-logo">The New York Times</span>
        </div>
        <div className="nyt-top-bar-right">
          <button className="subscribe-btn">75% OFF</button>
        </div>
      </header>
      <Game tilesData={tilesData} />
    </div>
  );
}

export default App;
