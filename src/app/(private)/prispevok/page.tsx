"use client";

import { Typography, Container, Grid2 } from "@mui/material";
import PostCard from "./_components/PostCard";
import EmptyPosts from "./_components/EmptyPosts";
import { getPosts } from "./actions";
import { Suspense } from "react";
import LoadingPosts from "./_components/PostCardLoader";

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

async function PostsList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return <EmptyPosts />;
  }

  return (
    <Grid2 container spacing={3} direction="column">
      {posts.map((post: Post) => (
        <Grid2 key={post.id}>
          <PostCard post={post} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default function Prispevky() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Príspevky
      </Typography>
      <Suspense
        fallback={
          <Grid2 container spacing={3} direction="column">
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingPosts key={index} />
            ))}
          </Grid2>
        }
      >
        <PostsList />
      </Suspense>
    </Container>
  );
}