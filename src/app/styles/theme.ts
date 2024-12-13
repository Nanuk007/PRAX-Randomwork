// src/styles/theme.ts

import { createTheme } from "@mui/material/styles";

// Base theme shared across modes
const baseTheme = {
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
};

// Light theme
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: { main: "#dc004e" }, // Red
    secondary: { main: "#1976d2" }, // Blue
    background: {
      default: "#fafafa", // Light gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#000000", // Black text in light mode
      secondary: "#222", // Gray for secondary text
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: { main: "#f44336" }, // Darker
    secondary: { main: "#2196f3" }, // Lighter blue
    background: {
      default: "#000", // Dark background
      paper: "#0a0a0a", // Dark paper
    },
    text: {
      // primary: "#ffffff", // White text in dark mode
      // secondary: "#aaaaaa", // Light gray for secondary text
    },
  },
});

export { lightTheme, darkTheme };
