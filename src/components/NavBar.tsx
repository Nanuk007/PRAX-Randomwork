"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  // useMediaQuery,
  // Theme,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SecurityIcon from "@mui/icons-material/Security";
import { useTheme } from "@/components/providers/ThemeProvider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutModal from "./LogoutModal";
import { useEffect } from "react";


export default function NavBar() {
  const [mounted, setMounted] = React.useState(false);
  const { data: session } = useSession();
  const { toggleTheme, isDarkMode } = useTheme();
  // const isMobile = useMediaQuery((theme: Theme) =>
  //   theme.breakpoints.down("sm")
  // );
  // temporary don't use mobile nav
  const isMobile = false;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    {
      label: "Domov",
      icon: <HomeIcon />,
      href: session ? "/prispevok" : "/",
    },
    ...(session
      ? [
          {
            label: "Hladat",
            icon: <SearchIcon />,
            href: "/hladat",
          },
          {
            label: "Pridat",
            icon: <PostAddIcon />,
            href: "/prispevok/novy",
          },
          {
            label: "Profil",
            icon: session.user?.image ? (
              <Avatar
                sx={{ height: 35, width: 35 }}
                alt={session.user.name || "User"}
                src={session.user.image}
              />
            ) : (
              <Avatar>{session.user?.name?.charAt(0) || "U"}</Avatar>
            ),
            onClick: (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
          },
        ]
      : [
          {
            label: "O nas",
            icon: <PersonIcon />,
            href: "/o-nas",
          },
          {
            label: "GDPR",
            icon: <SecurityIcon />,
            href: "/GDPR",
          },
          {
            label: "Registracia",
            icon: <LoginIcon />,
            href: "/auth/prihlasenie",
          },
        ]),
  ];

  return (
    <>
      {isMobile ? (
        null
      ) : (
        <BottomNavigation
          showLabels
          sx={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: 800,
            minWidth: "40%",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            backgroundColor: isDarkMode ? "rgba(30, 30, 30, 0.6)" : "rgba(255, 255, 255, 0.6)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              component={item.href ? Link : "button"}
              href={item.href}
              onClick={item.onClick}
              sx={{
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          ))}
        </BottomNavigation>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal:"center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        disableScrollLock={true}
      >
        <MenuItem component={Link} href="/profil" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Profil</ListItemText>
        </MenuItem>
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {isDarkMode ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
          </ListItemIcon>
          <Typography>{isDarkMode ? "Tmavý režim" : "Svetlý režim"}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          setAnchorEl(null);
          setLogoutModalOpen(true);
        }}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Odhlasenie</ListItemText>
        </MenuItem>
      </Menu>

      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </>
  );
}