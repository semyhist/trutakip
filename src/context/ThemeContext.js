import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// tema hook'u
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  var [isDark, setIsDark] = useState(() => {
    var kayitli = localStorage.getItem('theme');
    return kayitli ? kayitli === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const temaDegistir = () => setIsDark(!isDark)

  // tema renkleri
  var theme = {
    isDark,
    bg: {
      primary: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      card: isDark ? 'rgba(30, 30, 50, 0.6)' : 'rgba(255, 255, 255, 0.9)',
      paper: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      appbar: isDark ? 'rgba(26, 26, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: isDark ? 'white' : '#1a1a1a',
      secondary: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      tertiary: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
    },
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: temaDegistir, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
