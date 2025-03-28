// src/app/(private)/profil/_components/EditPostModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";

type Post = {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
};

interface EditPostModalProps {
  post: Post;
  open: boolean;
  onClose: () => void;
  onSave: (postId: string, caption: string) => Promise<void>;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  open,
  onClose,
  onSave,
}) => {
  const [caption, setCaption] = useState(post.caption || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSave(post.id, caption);
      onClose();
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Nepodarilo sa aktualizovať príspevok");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upraviť príspevok</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Popis"
            fullWidth
            multiline
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={isSubmitting}
          />
          {error && (
            <Box color="error.main" sx={{ mt: 1 }}>
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Zrušiť
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Uložiť"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;