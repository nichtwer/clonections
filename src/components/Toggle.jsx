/* eslint-disable jsx-a11y/label-has-associated-control */
// Inspiration: https://dev.to/abbeyperini/an-accessible-dark-mode-toggle-in-react-aop
import React, { useEffect, useState } from 'react';
import './styles/Toggle.css';

function Toggle() {
  const darkLabel = 'color mode toggle, dark mode';
  const lightLabel = 'color mode toggle, light mode';
  // false = dark mode
  const [active, setActive] = useState(false);
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true);
  const [ariaLabel, setAriaLabel] = useState(darkLabel);

  const syncThemeState = (isDarkMode) => {
    setActive(!isDarkMode);
    setAriaActive(isDarkMode);
    setAriaLabel(isDarkMode ? darkLabel : lightLabel);
  };

  const changeTheme = () => {
    const isDark = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    syncThemeState(isDark);
  };

  const handleOnClick = () => {
    changeTheme();
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      changeTheme();
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    syncThemeState(isDark);
  }, []);

  return (
    <div className="container--toggle" title="color mode toggle">
      <input
        role="switch"
        aria-checked={ariaActive}
        onKeyDown={handleKeypress}
        type="checkbox"
        id="toggle"
        className="toggle--checkbox"
        onChange={handleOnClick}
        checked={active}
      />
      <label htmlFor="toggle" className="toggle--label" aria-label={ariaLabel}>
        <span className="toggle--label-background" />
      </label>
    </div>
  );
}

export default Toggle;
