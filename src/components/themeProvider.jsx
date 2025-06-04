// components/ThemeProvider.js
import React from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const themeClass = darkMode ? "dark" : "light";

  return <div className={themeClass}>{children}</div>;
};

export default ThemeProvider;
