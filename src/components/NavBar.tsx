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
import { useTheme } from "@/components/providers/ThemeProvider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutModal from "./LogoutModal";
import MobileNavDrawer from "./MobileNavBar";
import { useEffect } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function NavBar() {
  const [mounted, setMounted] = React.useState(false);
  const { data: session, status } = useSession();
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

  if (!mounted || status === "loading") return null;

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
            label: "Registracia",
            icon: <LoginIcon />,
            href: "/auth/prihlasenie",
          },
        ]),
  ];

  return (
    <>
      {isMobile ? (
        <MobileNavDrawer />
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
            backdropFilter: "blur(16px)",
            backgroundColor: isDarkMode ? "rgba(30, 30, 30, 0.75)" : "rgba(255, 255, 255, 0.85)",
            boxShadow: isDarkMode 
              ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)"
              : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(0, 0, 0, 0.05)",
            zIndex: 1000,
            transition: "all 0.3s ease-in-out",
            overflow: "hidden",
            '&:hover': {
              boxShadow: isDarkMode
                ? "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 0.5px rgba(255, 255, 255, 0.2)"
                : "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px rgba(0, 0, 0, 0.1)"
            }
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
                color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  transform: 'scale(1.05)',
                  color: isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
                },
                '& .MuiBottomNavigationAction-label': {
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease-in-out'
                },
                '&.Mui-selected': {
                  color: isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
                  '& .MuiBottomNavigationAction-label': {
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }
                },
                '& .MuiTouchRipple-root': {
                  borderRadius: '16px',
                }
              }}
            />
          ))}
        </BottomNavigation>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{
          mt: -2,
          '& .MuiPaper-root': {
            borderRadius: '8px',
            backdropFilter: 'blur(16px)',
            backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(0, 0, 0, 0.05)'
          },
          '& .MuiMenuItem-root': {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
            }
          }
        }}
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
        <MenuItem component={Link} href="/ulozene" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><BookmarkIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Uložené príspevky</ListItemText>
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
