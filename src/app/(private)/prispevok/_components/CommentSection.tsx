import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: commentText,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      
      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeleteCommentId(commentId);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteCommentId) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/comments?commentId=${deleteCommentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      
      // Remove the deleted comment from the state
      setComments(comments.filter(comment => comment.id !== deleteCommentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
    } finally {
      setIsDeleting(false);
      setConfirmDeleteOpen(false);
      setDeleteCommentId(null);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Komentáre
      </Typography>
      
      {/* Comment form */}
      <Box component="form" onSubmit={handleSubmitComment} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Pridaj komentár..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isSubmitting}
          sx={{ mb: 1 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!commentText.trim() || isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Pridať komentár'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
      
      {/* Comments list */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : comments.length > 0 ? (
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem 
                alignItems="flex-start"
                secondaryAction={
                  session?.user?.id === comment.userId && (
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={isDeleting && deleteCommentId === comment.id}
                    >
                      {isDeleting && deleteCommentId === comment.id ? 
                        <CircularProgress size={20} /> : 
                        <DeleteIcon />}
                    </IconButton>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar src={comment.user.image || undefined} alt={comment.user.name || 'User'} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="body1"
                      fontWeight="bold"
                    >
                      {comment.user.name || 'Anonym'}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block', mb: 0.5, mt: 0.5 }}
                      >
                        {comment.content}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(comment.createdAt).toLocaleString('sk-SK')}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < comments.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          Žiadne komentáre. Buď prvý!
        </Typography>
      )}
      
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
    </Box>
  );
};

export default CommentSection;