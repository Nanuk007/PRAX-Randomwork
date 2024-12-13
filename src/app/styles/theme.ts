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
    primary: { main: "#6200ea" }, // Purple (vibrant yet calming)
    secondary: { main: "#03a9f4" }, // Light Blue (fresh and vibrant)
    background: {
      default: "#f4f6f8", // Soft light gray (gentle on the eyes)
      paper: "#ffffff", // White (classic and clean)
    },
    text: {
      primary: "#212121", // Dark Gray (softer than pure black)
      secondary: "#616161", // Medium Gray (for secondary text)
    },
    action: {
      active: "#6200ea", // Keeping action colors consistent with the primary theme
      hover: "#03a9f4",
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
