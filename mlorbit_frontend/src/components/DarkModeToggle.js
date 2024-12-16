import React, { useEffect, useState } from 'react';
// Example: Using Font Awesome for icons
// Make sure to include Font Awesome CDN link in your index.html or import icons in your build setup:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply saved or system preference on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('theme');
    if (savedPreference) {
      setIsDarkMode(savedPreference === 'dark');
    } else {
      // No saved preference, use system preference
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkScheme);
    }
  }, []);

  // Apply theme to body and save to localStorage when isDarkMode changes
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
