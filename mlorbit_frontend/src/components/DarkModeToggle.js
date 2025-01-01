import React, { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('theme');
    if (savedPreference) {
      setIsDarkMode(savedPreference === 'dark');
    } else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkScheme);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      className="dark-mode-toggle"
      aria-pressed={isDarkMode}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
}

export default DarkModeToggle;
