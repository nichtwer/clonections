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
            {/* 1. How to play (Lightbulb) */}
            <svg width="21" height="21" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="How to play">
              <path fill="currentColor" d="M15.4538 15.0078C17.2881 13.8544 18.5 11.818 18.5 9.5C18.5 5.91015 15.5899 3 12 3C8.41015 3 5.5 5.91015 5.5 9.5C5.5 11.818 6.71194 13.8544 8.54624 15.0078C9.37338 15.5279 10 16.4687 10 17.6014V20H14V17.6014C14 16.4687 14.6266 15.5279 15.4538 15.0078ZM16.5184 16.7009C16.206 16.8974 16 17.2323 16 17.6014V20C16 21.1046 15.1046 22 14 22H10C8.89543 22 8 21.1046 8 20V17.6014C8 17.2323 7.79404 16.8974 7.48163 16.7009C5.08971 15.1969 3.5 12.5341 3.5 9.5C3.5 4.80558 7.30558 1 12 1C16.6944 1 20.5 4.80558 20.5 9.5C20.5 12.5341 18.9103 15.1969 16.5184 16.7009ZM8 17H16V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V17Z" />
            </svg>

            {/* 2. Statistics Icon */}
            <svg width="21" height="21" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Statistics">
              <path fill="currentColor" d="M21.3332 14.6667V4H10.6665V12H2.6665V28H29.3332V14.6667H21.3332ZM13.3332 6.66667H18.6665V25.3333H13.3332V6.66667ZM5.33317 14.6667H10.6665V25.3333H5.33317V14.6667ZM26.6665 25.3333H21.3332V17.3333H26.6665V25.3333Z" />
            </svg>

            {/* 3. FINAL HELP ICON (Was: <span>C</span>) */}
            <svg width="21" height="21" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Help">
              <path fill="currentColor" d="M15 24H17.6667V21.3333H15V24ZM16.3333 2.66666C8.97333 2.66666 3 8.63999 3 16C3 23.36 8.97333 29.3333 16.3333 29.3333C23.6933 29.3333 29.6667 23.36 29.6667 16C29.6667 8.63999 23.6933 2.66666 16.3333 2.66666ZM16.3333 26.6667C10.4533 26.6667 5.66667 21.88 5.66667 16C5.66667 10.12 10.4533 5.33332 16.3333 5.33332C22.2133 5.33332 27 10.12 27 16C27 21.88 22.2133 26.6667 16.3333 26.6667ZM16.3333 7.99999C13.3867 7.99999 11 10.3867 11 13.3333H13.6667C13.6667 11.8667 14.8667 10.6667 16.3333 10.6667C17.8 10.6667 19 11.8667 19 13.3333C19 16 15 15.6667 15 20H17.6667C17.6667 17 21.6667 16.6667 21.6667 13.3333C21.6667 10.3867 19.28 7.99999 16.3333 7.99999Z" />
            </svg>
          </div>
          <button type="button" className="subscribe-btn">75% off</button>
        </div>
      </header>
      <Game tilesData={tilesData} />
    </div>
  );
}

export default App;
