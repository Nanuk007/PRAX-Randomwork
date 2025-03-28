// src/app/(private)/prispevok/_components/PostPreviewModal.tsx
"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Avatar,
  CardMedia,
  CardActions,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CommentSection from "./CommentSection";
import { useTheme } from "@mui/material/styles";

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

interface PostPreviewModalProps {
  post: Post;
  open: boolean;
  onClose: () => void;
  liked: boolean;
  saved: boolean;
  likesCount: number;
  savesCount: number;
  onLikeToggle: () => void;
  onSaveToggle: () => void;
  isLoading: boolean;
  isSaveLoading: boolean;
}

const PostPreviewModal: React.FC<PostPreviewModalProps> = ({
  post,
  open,
  onClose,
  liked,
  saved,
  likesCount,
  savesCount,
  onLikeToggle,
  onSaveToggle,
  isLoading,
  isSaveLoading,
}) => {
  const { data: session } = useSession();
  const [showComments, setShowComments] = React.useState(true); // Set to true by default

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
  
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: { xs: 0, sm: 2 },
          overflow: "hidden",
          maxHeight: { xs: "100vh", sm: "90vh" },
          margin: { xs: 0, sm: 2 },
          width: { xs: "100%" },
          maxWidth: { xs: "100%", sm: "md" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
        }}
      >
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, display: "flex", flexDirection: { xs: "column", md: "row" }, overflow: "hidden" }}>
        {/* Left side - Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: { xs: "auto", md: "100%" },
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt={post.caption || "obrazok"}
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: { xs: "50vh", md: "80vh" },
              objectFit: "contain",
            }}/>
        </Box>

        {/* Right side - Content */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            display: "flex",
            flexDirection: "column",
            height: { xs: "auto", md: "80vh" },
            maxHeight: { xs: "none", md: "80vh" },
            bgcolor: "background.paper",
          }}
        >
          {/* Header with user info */}
          <Box sx={{ display: "flex", alignItems: "center", p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Avatar
              alt={post.user.name || "Pouzivateľ"}
              src={post.user.image || ""}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography variant="subtitle1" fontWeight="bold">
              {post.user.name}
            </Typography>
            {session?.user?.id === post.userId && (
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ ml: 'auto' }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/profil/${post.id}`;
                }}
              >
                Upraviť
              </Button>
            )}
          </Box>

          {/* Caption */}
          <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Box component="span" fontWeight="bold" mr={1}>
                {post.user.name}
              </Box>
              {post.caption || "Bez popisu"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mt: 1 }}
            >
              {new Date(post.createdAt).toLocaleString("sk-SK")}
            </Typography>

            {/* Comments section */}
            {showComments && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ my: 1 }} />
                <CommentSection postId={post.id} />
              </Box>
            )}
          </Box>

          {/* Action buttons */}
          <Box sx={{ borderTop: 1, borderColor: "divider" }}>
            <CardActions disableSpacing>
              <IconButton 
                aria-label={liked ? "unlike" : "like"} 
                onClick={onLikeToggle}
                disabled={isLoading}
              >
                {liked ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {likesCount > 0 ? (
                  <>{likesCount} {likesCount === 1 ? "lajk" : "lajky"}</>
                ) : (
                  "Žiadne lajky"
                )}
              </Typography>
              
              <IconButton 
                aria-label="comments"
                onClick={handleToggleComments}
              >
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Button 
                onClick={handleToggleComments}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                {showComments ? "Skryť komentáre" : "Zobraziť komentáre"}
              </Button>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <IconButton
                aria-label={saved ? "unsave" : "save"}
                onClick={onSaveToggle}
                disabled={isSaveLoading}
              >
                {saved ? (
                  <BookmarkIcon color="primary" />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostPreviewModal;