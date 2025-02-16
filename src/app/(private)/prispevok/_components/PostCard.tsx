import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
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

interface PostProps {
  post: Post;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
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
      <CardMedia
        component="img"
        image={post.imageUrl}
        alt={post.caption || "obrazok"}
      />
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
      </CardContent>
    </Card>
  );
};

export default PostCard;