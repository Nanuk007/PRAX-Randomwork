// src/app/profil/[id]/page.tsx

import { Avatar, Box, Container, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getProfileWithPosts } from "./action";

export const metadata = { title: "Detail profilu | ZoškaSnap" };

export default async function ProfileDetail({ params }: { params: { id: string } }) {
  const profile = await getProfileWithPosts(params.id);

  if (!profile) {
    return (
      <Container>
        <Typography>Profil nebol nájdený</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, mt: 2 }}>
        <Avatar
          alt={profile.user.name || "Používateľ"}
          src={profile.avatarUrl || undefined}
          sx={{ width: 120, height: 120, mr: 3 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {profile.user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {profile.bio}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Príspevky
      </Typography>

      <Grid container spacing={3}>
        {profile.posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.imageUrl}
                  alt={post.caption || "Post image"}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.caption || "No caption"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.caption}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}