import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  CardActions,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentSection from "./CommentSection";
import PostPreviewModal from "./PostPreviewModal";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";


type Comment = {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

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

interface PostProps {
  post: Post;
  isProfilePage?: boolean;
}

const PostCard: React.FC<PostProps> = ({ post, isProfilePage }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [previewComments, setPreviewComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { data: session } = useSession();

  // Fetch likes information when component mounts
  useEffect(() => {
    const fetchLikeInfo = async () => {
      try {
        const response = await fetch(`/api/posts/like?postId=${post.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setLiked(data.hasLiked);
          setLikesCount(data.likesCount);
        }
      } catch (error) {
        console.error("Error fetching like info:", error);
      }
    };

    fetchLikeInfo();
  }, [post.id]);

  useEffect(() => {
    const fetchSaveInfo = async () => {
      try {
        const response = await fetch(`/api/posts/save?postId=${post.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setSaved(data.hasSaved);
          setSavesCount(data.savesCount);
        }
      } catch (error) {
        console.error("Error fetching save info:", error);
      }
    };

    fetchSaveInfo();
  }, [post.id]);

  // Fetch comment preview when component mounts
  useEffect(() => {
    const fetchCommentPreview = async () => {
      setIsLoadingComments(true);
      try {
        const response = await fetch(`/api/comments?postId=${post.id}`);
        
        if (response.ok) {
          const data = await response.json();
          // Only show the first 2 comments in the preview
          setPreviewComments(data.slice(0, 2));
          setCommentsCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching comment preview:", error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchCommentPreview();
  }, [post.id]);

  const handleLikeToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(data.action === "liked");
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToggle = async () => {
    if (isSaveLoading) return;
    
    setIsSaveLoading(true);
    try {
      const response = await fetch("/api/posts/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setSaved(data.action === "saved");
        setSavesCount(data.savesCount);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setIsSaveLoading(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeleteCommentId(commentId);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteCommentId) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/comments?commentId=${deleteCommentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      
      // Remove the deleted comment from the preview state
      setPreviewComments(previewComments.filter(comment => comment.id !== deleteCommentId));
      
      // Update the comments count
      setCommentsCount(prevCount => prevCount - 1);
    } catch (err) {
      console.error('Error deleting comment:', err);
    } finally {
      setIsDeleting(false);
      setConfirmDeleteOpen(false);
      setDeleteCommentId(null);
    }
  };

  return isProfilePage ? (
    // Instagram-like grid view for profile page
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "&:hover": {
          "& > .overlay": {
            opacity: 1,
          },
        },
      }}
      onClick={() => setPreviewOpen(true)}
    >
      <CardMedia
        component="img"
        image={post.imageUrl}
        alt={post.caption || "obrazok"}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          opacity: 0,
          transition: "opacity 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
          <VisibilityIcon sx={{ mr: 1 }} />
          <Typography variant="body1" fontWeight="medium">
            Zobraziť príspevok
          </Typography>
        </Box>
      </Box>
      
      {/* Post Preview Modal */}
      <PostPreviewModal
        post={post}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        liked={liked}
        saved={saved}
        likesCount={likesCount}
        savesCount={savesCount}
        onLikeToggle={handleLikeToggle}
        onSaveToggle={handleSaveToggle}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </Box>
  ) : (
    // Regular post card for feed
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Avatar
          alt={post.user.name || "Pouzivateľ"}
          src={post.user.image || ""}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Typography variant="subtitle1" fontWeight="bold">
          {post.user.name}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          "&:hover": {
            "& > .overlay": {
              opacity: 1,
            },
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setPreviewOpen(true)}
      >
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt={post.caption || "obrazok"}
        />
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            opacity: 0,
            transition: "opacity 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
            <VisibilityIcon sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight="medium">
              Zobraziť príspevok
            </Typography>
          </Box>
        </Box>
      </Box>
      <CardActions disableSpacing>
        <IconButton 
          aria-label={liked ? "unlike" : "like"} 
          onClick={handleLikeToggle}
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
          onClick={handleExpandClick}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Button 
          onClick={handleExpandClick}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          {expanded ? "Skryť komentáre" : "Zobraziť komentáre"}
        </Button>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton
          aria-label={saved ? "unsave" : "save"}
          onClick={handleSaveToggle}
          disabled={isSaveLoading}
        >
          {saved ? (
            <BookmarkIcon color="primary" />
          ) : (
            <BookmarkBorderIcon />
          )}
        </IconButton>
      </CardActions>
      <CardContent>
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

        {/* Comment Preview Section */}
        {previewComments.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ my: 1 }} />
            <List dense disablePadding>
              {previewComments.map((comment) => (
                <ListItem 
                  key={comment.id} 
                  alignItems="flex-start" 
                  sx={{ px: 0, py: 0.5 }}
                  secondaryAction={
                    session?.user?.id === comment.userId && (
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isDeleting && deleteCommentId === comment.id}
                        size="small"
                      >
                        {isDeleting && deleteCommentId === comment.id ? 
                          <CircularProgress size={16} /> : 
                          <DeleteIcon fontSize="small" />}
                      </IconButton>
                    )
                  }
                >
                  <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar 
                      src={comment.user.image || undefined} 
                      alt={comment.user.name || 'User'} 
                      sx={{ width: 24, height: 24 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" component="span">
                        <Box component="span" fontWeight="bold" mr={0.5}>
                          {comment.user.name || 'Anonym'}
                        </Box>
                        {comment.content}
                      </Typography>
                    }
                    sx={{ my: 0 }}
                  />
                </ListItem>
              ))}
            </List>
            {commentsCount > 2 && (
              <Button 
                onClick={handleExpandClick} 
                size="small" 
                sx={{ textTransform: 'none', pl: 0, mt: 0.5 }}
              >
                Zobraziť všetkých {commentsCount} komentárov
              </Button>
            )}
          </Box>
        )}
      </CardContent>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <CommentSection postId={post.id} />
        </CardContent>
      </Collapse>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Vymazať komentár</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Naozaj chcete vymazať tento komentár? Táto akcia sa nedá vrátiť späť.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} disabled={isDeleting}>
            Zrušiť
          </Button>
          <Button onClick={confirmDelete} color="error" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} /> : 'Vymazať'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Post Preview Modal */}
      <PostPreviewModal
        post={post}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        liked={liked}
        saved={saved}
        likesCount={likesCount}
        savesCount={savesCount}
        onLikeToggle={handleLikeToggle}
        onSaveToggle={handleSaveToggle}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </Card>
  );
};

export default PostCard;
