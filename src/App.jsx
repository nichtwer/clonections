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
      <div className="promo-banner">
        SUMMER OFFER ENDS SOON: 75% off &gt;
      </div>
      <header className="nyt-top-bar">
        <div className="nyt-top-bar-left">
          <button type="button" className="hamburger-btn" aria-label="Menu">&#9776;</button>
        </div>
        <div className="nyt-top-bar-right">
          <div className="icon-placeholders">
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>
          <button type="button" className="subscribe-btn">75% off</button>
        </div>
      </header>
      <Game tilesData={tilesData} />
    </div>
  );
}

export default App;
