// src/components/LogoutModal.tsx
"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useTheme } from "@mui/material/styles";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const theme = useTheme();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          [theme.breakpoints.up("sm")]: {
            borderRadius: 4,
            padding: theme.spacing(3),
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            maxWidth: 400,
            backgroundColor: theme.palette.background.default,
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
        Odhlásenie
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        <DialogContentText
          sx={{ fontSize: "1rem", color: theme.palette.text.secondary }}
        >
          Naozaj sa chcete odhlásiť?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(2, 3),
        }}
      >
        <Button
          onClick={onClose}
          sx={{ color: theme.palette.error.main, fontWeight: 500 }}
        >
          Zrušiť
        </Button>
        <Button onClick={handleLogout} color="primary" variant="contained">
          Odhlásiť sa
        </Button>
      </DialogActions>
    </Dialog>
  );
}