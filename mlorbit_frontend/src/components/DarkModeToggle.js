import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved
      ? (saved === 'dark')
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme class + persist
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Listen for system changes (optional)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = e => {
      const stored = localStorage.getItem('theme');
      if (!stored) setIsDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleClick = () => {
    setIsDark(d => !d);

    // optional icon spin
    const btn = document.getElementById('dark-toggle-btn');
    btn.classList.add('spin');
    setTimeout(() => btn.classList.remove('spin'), 600);
  };

  return (
    <button
      id="dark-toggle-btn"
      onClick={handleClick}
      className="dark-mode-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={`fas fa-${isDark ? 'moon' : 'sun'}`}></i>
    </button>
  );
}
