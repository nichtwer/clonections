/* eslint-disable react/require-default-props */
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Toast.css';

function Toast({ message, onClose, duration = 1200 }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Triggers the fade-out animation 200ms before the toast unmounts
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 200);

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  return (
    <div className="toast-wrapper">
      <div
        className={`toasty show ${fadeOut ? 'animate-toast-out' : 'animate-toast-in'}`}
      >
        {message}
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
