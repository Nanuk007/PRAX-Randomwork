import React from "react";
import { MenuItem, ListItemIcon, Typography, Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface ThemeSwitcherMenuItemProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeSwitcherMenuItem: React.FC<ThemeSwitcherMenuItemProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <MenuItem
      onClick={toggleTheme}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px", // Add padding here
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <ListItemIcon>
          {isDarkMode ? (
            <DarkModeIcon fontSize="small" />
          ) : (
            <LightModeIcon fontSize="small" />
          )}
        </ListItemIcon>
        <Typography>{isDarkMode ? "Tmavý režim" : "Svetlý režim"}</Typography>
      </div>
      <Switch checked={isDarkMode} onChange={toggleTheme} color="primary" />
    </MenuItem>
  );
};

export default ThemeSwitcherMenuItem;
