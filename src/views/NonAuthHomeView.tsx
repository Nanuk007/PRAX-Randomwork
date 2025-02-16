"use client";

import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import Prihlasenie from "@/app/auth/prihlasenie/page";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg" disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            flex: isMobile ? "none" : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? undefined : "center",
            p: 2,
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom> Hello </Typography>
        </Box>
        <Box
          sx={{
            flex: isMobile ? "none" : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Prihlasenie />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;