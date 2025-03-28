"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme as useNextTheme } from "@/components/providers/ThemeProvider";
import LogoutModal from "./LogoutModal";
import Fab from "@mui/material/Fab";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MobileNavDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const { toggleTheme, isDarkMode } = useNextTheme();

  const drawerRef = React.useRef<HTMLDivElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(!logoutModalOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Domov", value: "Domov", icon: <HomeIcon />, href: "/" },
    ...(session
      ? [
          {
            label: "Hladat",
            value: "Hladat",
            icon: <SearchIcon />,
            href: "/hladat",
          },
          {
            label: "Pridat",
            value: "Prispevok",
            icon: <PostAddIcon />,
            href: "/prispevok/novy",
          },
          {
            label: "Profil",
            value: "/profil",
            href: "/profil",
            icon: session?.user?.image ? (
              <Avatar
                alt={session?.user?.name || "User"}
                src={session?.user?.image || undefined}
              />
            ) : (
              <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
            ),
          },
          {
            label: "Odhlasenie",
            value: "Odhlasenie",
            icon: <LogoutIcon />,
            onClick: handleLogoutClick,
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
            label: "Registracia",
            value: "Registracia",
            icon: <LoginIcon />,
            href: "/auth/prihlasenie",
          },
        ]),
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box sx={{ display: "grid", position: "fixed", bottom: 12, left: 12 }}>
        <Fab color="primary" onClick={handleDrawerOpen}>
          <MenuIcon />
        </Fab>
      </Box>
      <Box ref={drawerRef}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.value} disablePadding>
                <ListItemButton
                  component={item.href ? Link : "button"}
                  href={item.href || undefined}
                  onClick={item.onClick}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
                </ListItemIcon>
                <ListItemText primary="Zmeniť tému" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <LogoutModal open={logoutModalOpen} onClose={handleLogoutClick} />
    </Box>
  );
}
