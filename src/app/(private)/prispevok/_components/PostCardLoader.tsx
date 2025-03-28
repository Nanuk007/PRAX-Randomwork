import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Grid2,
} from "@mui/material";

const PostCardLoader: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="60%" />
      </Box>
      <Skeleton variant="rectangular" height={400} />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.75rem", mt: 1 }}
        >
          <Skeleton variant="text" width="30%" />
        </Typography>
      </CardContent>
    </Card>
  );
};

const LoadingPosts = () => {
  return (
    <Grid2 container spacing={3} direction="column">
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid2 key={index}>
          <PostCardLoader />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default LoadingPosts;
