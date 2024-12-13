"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";

export default function NavBar() {
  const [value, setValue] = React.useState("Domov");
  const { data: session } = useSession();

  const { toggleTheme, isDarkMode } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(newValue);
  };

  const navItems = [
    { label: "Domov", value: "Domov", icon: <HomeIcon />, href: "/" },
    ...(session
      ? [
          {
            label: "Profil",
            value: "Profil",
            icon: <PersonIcon />,
            href: "/profil",
          },
          {
            label: "Hladat",
            value: "Hladat",
            icon: <SearchIcon />,
            href: "/hladat",
          },
          {
            label: "Odhlasenie",
            value: "Odhlasenie",
            icon: <LogoutIcon />,
            href: "/auth/odhlasenie",
          },
        ]
      : [
          {
            label: "O nas",
            value: "O nas",
            icon: <PersonIcon />,
            href: "/o-nas",
          },
          {
            label: "GDPR",
            value: "GDPR",
            icon: <PostAddIcon />,
            href: "/gdpr",
          },
          {
            label: "Prihlásenie",
            value: "Prihlasenie",
            icon: <LoginIcon />,
            href: "/auth/prihlasenie",
          },
          {
            label: "Registrácia",
            value: "Registracia",
            icon: <LoginIcon />,
            href: "/auth/prihlasenie",
          },
        ]),
  ];

  return (
    <BottomNavigation
      sx={{
        maxWidth: "100%",
        width: 800,
        margin: "0 auto",
        justifyContent: "center",
      }}
      value={value}
      onChange={handleChange}
      showLabels
    >
      {navItems.map((item) => (
        <BottomNavigationAction
          key={item.value}
          label={item.label}
          value={item.value}
          icon={item.icon}
          component={Link}
          href={item.href}
        />
      ))}
      <IconButton
        onClick={toggleTheme}
        sx={{ color: (theme) => theme.palette.text.primary, ml: 2 }}
      >
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </BottomNavigation>
  );
}
