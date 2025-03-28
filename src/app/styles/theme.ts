// src/styles/theme.ts

import { createTheme } from "@mui/material/styles";

// Base theme shared across modes
const baseTheme = {
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    body1: {
      fontSize: "1rem",
      letterSpacing: "-0.01em",
    },
  },
};

// Light theme - Minimalistic Luxury
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: { main: "#1A1A1A" }, // Rich black for sophistication
    secondary: { main: "#8C8C8C" }, // Refined gray for subtle accents
    background: {
      default: "#FAFAFA", // Soft off-white for elegance
      paper: "#FFFFFF", // Pure white for contrast
    },
    text: {
      primary: "#1A1A1A", // Rich black for main text
      secondary: "#666666", // Sophisticated gray for secondary text
    },
    action: {
      active: "#1A1A1A",
      hover: "rgba(26, 26, 26, 0.08)", // Subtle hover effect
    },
  },
});

// Dark theme - Minimalistic Luxury
const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: { main: "#E0E0E0" }, // Sophisticated light gray
    secondary: { main: "#8C8C8C" }, // Refined gray for consistency
    background: {
      default: "#000", // Rich dark background
      paper: "#1A1A1A", // Slightly lighter for layering
    },
    text: {
      primary: "#FFFFFF", // Pure white for contrast
      secondary: "#B3B3B3", // Elegant gray for secondary text
    },
    action: {
      active: "#E0E0E0",
      hover: "rgba(224, 224, 224, 0.08)", // Subtle hover effect
    },
  },
});

export { lightTheme, darkTheme };
