// src/app/profil/page.tsx


"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Container,
  CircularProgress,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PostCard from "../prispevok/_components/PostCard";
import { useSession } from "next-auth/react";

interface Profile {
  id: string;
  avatarUrl: string | null;
  bio: string | null;
  user: {
    name: string | null;
    image: string | null;
    email: string | null;
  };
}

interface Post {
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
}

export default function Profile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<{
    name: string | null;
    bio: string | null;
  } | null>(null);

  useEffect(() => {
    fetchProfileAndPosts();
  }, []);

  const fetchProfileAndPosts = async () => {
    try {
      setLoading(true);
      const [profileResponse, postsResponse] = await Promise.all([
        fetch('/api/profile/my-profile'),
        fetch(`/api/posts/my-posts`),
      ]);

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = await profileResponse.json();
      const postsData = await postsResponse.json();

      setProfile(profileData);
      setPosts(postsData || []);
      setEditedProfile({
        name: profileData.user.name,
        bio: profileData.bio,
      });
    } catch (err) {
      setError("Error loading profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({
      name: profile?.user.name || null,
      bio: profile?.bio || null,
    });
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    try {
      const response = await fetch('/api/profile/my-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!session) {
    return (
      <Container>
        <Typography align="center">Prosím prihláste sa pre zobrazenie profilu.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error || "Profil sa nenašiel"}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Box
          display="flex"
          alignItems="center"
          gap={8}
          sx={{ mb: 4, px: { xs: 2, md: 8 } }}
        >
          <Avatar
            src={profile.avatarUrl || profile.user.image || undefined}
            alt={profile.user.name || "User"}
            sx={{
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              border: "3px solid #fff",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: "normal" }}>
                {profile.user.name}
              </Typography>
              <Button variant="outlined" size="small" onClick={handleEdit}>
                Upraviť profil
              </Button>
            </Box>
            <Box display="flex" gap={4} sx={{ mb: 2 }}>
              <Box textAlign="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  {posts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  príspevkov
                </Typography>
              </Box>
            </Box>
            {profile.bio && <Typography variant="body1">{profile.bio}</Typography>}
          </Box>
        </Box>
        <Divider />
      </Box>

      <Dialog open={isEditing} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Upraviť profil</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Meno"
              fullWidth
              value={editedProfile?.name || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile!, name: e.target.value })}
            />
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={4}
              value={editedProfile?.bio || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile!, bio: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Zrušiť</Button>
          <Button onClick={handleSave} variant="contained">
            Uložiť
          </Button>
        </DialogActions>
      </Dialog>

      {posts.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ py: 8 }}
        >
          <Typography variant="h6" color="text.secondary">
            Žiadne príspevky
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keď nahráte fotky, budete ich vidieť tu.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={1}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <PostCard post={post} isProfilePage={true} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
