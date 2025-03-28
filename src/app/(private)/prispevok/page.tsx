"use client";

import { Typography, Container, Grid2 } from "@mui/material";
import PostCard from "./_components/PostCard";
import EmptyPosts from "./_components/EmptyPosts";
import { useAPICall } from "@/hooks/useApiCall";
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

export default function Prispevky() {
  const {
    data: dataJson,
    isLoading,
    isError,
  } = useAPICall(["posts"], async () => {
    const response = await fetch(`/api/posts`);

    if (!response.ok) {
      throw new Error("Nastala chyba pri nacitavani dát");
    }
    return response.json();
  });

  if (isError) {
    return <Typography color="error">Nastala necakana chyba</Typography>;
  }

  const posts: Post[] = dataJson || [];

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
      {isLoading ? (
        <Grid2 container spacing={3} direction="column">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingPosts key={index} />
          ))}
        </Grid2>
      ) : posts.length > 0 ? (
        <Grid2 container spacing={3} direction="column">
          {posts.map((post: Post) => (
            <Grid2 key={post.id}>
              <PostCard post={post} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <EmptyPosts />
      )}
    </Container>
  );
}
