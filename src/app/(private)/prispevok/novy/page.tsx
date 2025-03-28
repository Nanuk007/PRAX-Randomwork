"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@uploadthing/react";
import { useCreatePost } from "@/hooks/useCreatePost";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Divider,
  Fade,
  Backdrop,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTheme } from "@mui/material/styles";

export default function CreateNewPost() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const createPost = useCreatePost();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !imageUrl) return;

    try {
      await createPost.mutateAsync({
        userId: session.user.id,
        imageUrl,
        caption,
      });
      router.push("/prispevok");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard this post?")) {
      router.back();
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 0, sm: 2 },
        bgcolor: theme.palette.background.default,
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "1100px",
            height: isMobile ? "100vh" : "85vh",
            borderRadius: { xs: 0, sm: 2 },
            overflow: "hidden",
            boxShadow: theme.shadows[3],
            bgcolor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
              borderBottom: 1,
              borderColor: theme.palette.divider,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={handleCancel}
                sx={{ mr: 1.5 }}
                aria-label="Go back"
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Create New Post
              </Typography>
            </Box>

            {imageUrl && !createPost.isPending && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disableElevation
                disabled={createPost.isPending}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  borderRadius: 1.5,
                  fontWeight: 500,
                }}
              >
                {createPost.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Publish"
                )}
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Image Upload Area */}
            <Box
              sx={{
                flex: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(0,0,0,0.03)",
                position: "relative",
                overflow: "hidden",
                minHeight: { xs: "45vh", md: "initial" },
              }}
            >
              {!imageUrl ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UploadDropzone<OurFileRouter, "imageUploader">
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) {
                        setImageUrl(res[0].url);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.error("Upload error:", error);
                    }}
                    config={{
                      mode: "auto",
                    }}
                    appearance={{
                      container: {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      },
                      uploadIcon: {
                        width: 64,
                        height: 64,
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.3)",
                      },
                      label: {
                        color: theme.palette.text.secondary,
                        fontSize: "1.1rem",
                        fontWeight: 400,
                        marginTop: "1rem",
                      },
                      allowedContent: {
                        color: theme.palette.text.secondary,
                        fontSize: "0.875rem",
                        marginTop: "0.5rem",
                        opacity: 0.7,
                      },
                      button: {
                        display: "none",
                      },
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <Box
                    component="img"
                    src={imageUrl}
                    alt="Upload preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    aria-label="Remove image"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: "rgba(0,0,0,0.5)",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                      width: 42,
                      height: 42,
                    }}
                    onClick={() => setImageUrl("")}
                  >
                    <CloseIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              )}
            </Box>

            {/* Caption Area */}
            <Divider
              orientation={isMobile ? "horizontal" : "vertical"}
              flexItem
            />

            <Box
              sx={{
                width: { xs: "100%", md: "380px" },
                display: "flex",
                flexDirection: "column",
                p: 0,
              }}
            >
              {/* User info */}
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderBottom: 1,
                  borderColor: theme.palette.divider,
                }}
              >
                <Box
                  component="img"
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || "User"}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: 1,
                    borderColor: theme.palette.divider,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    {session?.user?.name}
                  </Typography>
                  {session?.user?.email && (
                    <Typography variant="body2" color="text.secondary">
                      {session.user.email}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Caption text area */}
              <Box
                sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1.5, fontWeight: 500 }}
                >
                  Caption
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  rows={6}
                  placeholder="Write a caption for your post..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                    },
                  }}
                  sx={{ mb: 3 }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: "auto", mb: 1 }}
                >
                  {imageUrl
                    ? "You're ready to share your creation with the world."
                    : "Select an image to create your post."}
                </Typography>
              </Box>

              {/* Loading state */}
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  position: "absolute",
                }}
                open={createPost.isPending}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}
