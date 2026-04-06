import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); 

  useEffect(() => {
    const body = document.body;
    body.style.transition = "background-color 0.3s, color 0.3s";
    if (darkMode) {
      body.style.backgroundColor = "var(--primary)";
      body.style.color = "var(--text-lightest)";
    } else {
      body.style.backgroundColor = "var(--secondary)";
      body.style.color = "var(--text-dark)";
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};