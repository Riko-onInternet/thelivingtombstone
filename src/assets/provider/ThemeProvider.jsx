import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  darkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

const isDark = localStorage.getItem("darkMode");

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(isDark === "true");

  useEffect(() => {
    // console.log(darkMode);
    const html = document.querySelector("html");
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
