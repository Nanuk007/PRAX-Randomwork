"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, CircularProgress } from "@mui/material";
import PostCard from "../prispevok/_components/PostCard";

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

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts/saved");
        
        if (!response.ok) {
          throw new Error("Failed to fetch saved posts");
        }
        
        const data = await response.json();
        setSavedPosts(data.posts);
      } catch (err) {
        console.error("Error fetching saved posts:", err);
        setError("Failed to load saved posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Uložené príspevky
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" my={4}>
          {error}
        </Typography>
      ) : savedPosts.length === 0 ? (
        <Typography my={4}>
          Nemáte žiadne uložené príspevky.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {savedPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SavedPostsPage;