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
} from "@mui/material";
import { useParams } from "next/navigation";

interface Profile {
  id: string;
  avatarUrl: string | null;
  bio: string | null;
  user: {
    name: string | null;
    image: string | null;
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

export default function ProfileDetail() {
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const [profileResponse, postsResponse] = await Promise.all([
          fetch(`/api/profile/${params.id}`),
          fetch(`/api/posts/${params.id}`),
        ]);

        if (!profileResponse.ok || !postsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const profileData = await profileResponse.json();
        const postsData = await postsResponse.json();

        setProfile(profileData[0] || null);
        setPosts(postsData || []);
      } catch (err) {
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProfileAndPosts();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error || "Profile not found"}
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
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "normal" }}
              >
                {profile.user.name}
              </Typography>
            </Box>
            <Box display="flex" gap={4} sx={{ mb: 2 }}>
              <Box textAlign="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  {posts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  posts
                </Typography>
              </Box>
            </Box>
            {profile.bio && (
              <Typography variant="body1">{profile.bio}</Typography>
            )}
          </Box>
        </Box>
        <Divider />
      </Box>

      {posts.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ py: 8 }}
        >
          <Typography variant="h6" color="text.secondary">
            No Posts Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ked nahraju fotky budete ich vidiet tu.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={0.5}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "100%",
                  "&:hover": {
                    "& > .overlay": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
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
                    bgcolor: "rgba(0,0,0,0.3)",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="white">
                    {post.caption || "View post"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
