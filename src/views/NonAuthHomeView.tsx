"use client";

import { Box, Container, Typography, useMediaQuery, useTheme, Grid, Paper, Button } from "@mui/material";
import { PhotoCamera, People, Bookmark, Favorite } from "@mui/icons-material";
import Prihlasenie from "@/app/auth/prihlasenie/page";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const features = [
    {
      icon: <PhotoCamera sx={{ fontSize: 40 }} />,
      title: "Zdieľajte momenty",
      description: "Nahrávajte a zdieľajte svoje najlepšie fotografie s priateľmi a komunitou."
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: "Budujte komunitu",
      description: "Spojte sa s priateľmi a objavujte nových ľudí s podobnými záujmami."
    },
    {
      icon: <Bookmark sx={{ fontSize: 40 }} />,
      title: "Ukladajte inšpiráciu",
      description: "Uložte si príspevky, ktoré vás inšpirujú, pre neskoršie zobrazenie."
    },
    {
      icon: <Favorite sx={{ fontSize: 40 }} />,
      title: "Interagujte s obsahom",
      description: "Lajkujte a komentujte príspevky, ktoré vás zaujali."
    }
  ];

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            py: 8,
            gap: 4
          }}
        >
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: "linear-gradient(45deg, #E0E0E0 30%, #FFFFFF 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
              }}
            >
              Vitajte v Zoska
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Zdieľajte svoje najlepšie momenty, objavujte inšpiráciu a spojte sa s komunitou.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2 }}>
            <Prihlasenie />
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8, bgcolor: "background.paper" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Prečo Zoska?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    bgcolor: "transparent"
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            bgcolor: "background.default"
          }}
        >
          <Typography variant="h4" gutterBottom>
            Pripojte sa k našej komunite
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Začnite zdieľať svoje príbehy a spojte sa s ľuďmi s podobnými záujmami.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem"
            }}
          >
            Začať teraz
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
