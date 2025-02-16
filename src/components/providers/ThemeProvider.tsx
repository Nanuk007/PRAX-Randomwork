"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import { useEffect, useState } from "react";

import { useContext, createContext } from "react";

import { lightTheme, darkTheme } from "@/app/styles/theme";

const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme: () => {
          setIsDarkMode((prevState) => !prevState);
        },
        isDarkMode,
      }}
    >
      <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}