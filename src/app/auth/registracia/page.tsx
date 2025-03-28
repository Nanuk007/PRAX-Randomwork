"use client"

import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material"
import PrihlasenieButton from "@/components/prihlasenie/PrihlasenieButton"
import MuiLink from "@mui/material/Link"
import Link from "next/link"
import { PhotoCamera, People, Bookmark, Favorite } from "@mui/icons-material"

export default function Registracia() {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const handleLoginModalOpen = () => setOpenLoginModal(true)
  const handleLoginModalClose = () => setOpenLoginModal(false)
  const handleAlertClose = () => setShowAlert(false)

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked)
  }

  const handleRegisterClick = (e: React.MouseEvent) => {
    if (!termsAccepted) {
      e.preventDefault()
      setShowAlert(true)
      return false
    }
  }

  const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box sx={{ mb: 2, color: 'primary.main' }}>
          {icon}
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 56px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side - App info */}
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography 
                component="h1" 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  background: 'linear-gradient(45deg, #1A1A1A 30%, #8C8C8C 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Vitajte v Zoska
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, color: 'text.secondary' }}>
                Zdieľajte svoje najlepšie momenty, objavujte inšpiráciu a spojte sa s komunitou.
              </Typography>
              
              <Box sx={{ mb: 6 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6}>
                    <FeatureCard 
                      icon={<PhotoCamera sx={{ fontSize: 40 }} />}
                      title="Zdieľajte momenty"
                      description="Nahrávajte a zdieľajte svoje najlepšie fotografie s priateľmi a komunitou."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FeatureCard 
                      icon={<People sx={{ fontSize: 40 }} />}
                      title="Budujte komunitu"
                      description="Spojte sa s priateľmi a objavujte nových ľudí s podobnými záujmami."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FeatureCard 
                      icon={<Bookmark sx={{ fontSize: 40 }} />}
                      title="Ukladajte inšpiráciu"
                      description="Uložte si príspevky, ktoré vás inšpirujú, pre neskoršie zobrazenie."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FeatureCard 
                      icon={<Favorite sx={{ fontSize: 40 }} />}
                      title="Interagujte s obsahom"
                      description="Lajkujte a komentujte príspevky, ktoré vás zaujali."
                    />
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  "Zoska je miesto, kde môžete zdieľať svoje najlepšie momenty a objavovať inšpiráciu od ostatných. Pripojte sa k našej rastúcej komunite dnes!"
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Right side - Registration form */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography component="h2" variant="h4" gutterBottom>
                Registrácia
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                Vytvorte si účet a začnite zdieľať svoje momenty s komunitou Zoska.
              </Typography>
              
              <Box sx={{ width: "100%" }}>
                <PrihlasenieButton text="Registrovať" onClick={handleRegisterClick} />
              </Box>
              
              <FormControlLabel
                control={<Checkbox checked={termsAccepted} onChange={handleTermsChange} />}
                label={
                  <Typography variant="body2">
                    Súhlasím s{" "}
                    <MuiLink component={Link} href="/podmienky" sx={{ color: "text.secondary" }}>
                      obchodnými podmienkami
                    </MuiLink>{" "}
                    a{" "}
                    <MuiLink component={Link} href="/gdpr" sx={{ color: "text.secondary" }}>
                      GDPR
                    </MuiLink>
                  </Typography>
                }
                sx={{ mt: 2 }}
              />
              
              <Divider sx={{ width: '100%', my: 3 }} />
              
              <Box sx={{ width: "100%", textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Už máte účet?
                </Typography>
                <Button
                  sx={{
                    textDecoration: "underline",
                    backgroundColor: "none",
                    "&:hover": {
                      backgroundColor: "none",
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleLoginModalOpen}
                >
                  Prihlásiť sa
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={openLoginModal}
        onClose={handleLoginModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ maxWidth: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 400,
            bgcolor: "background.default",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Prihlásenie
          </Typography>
          <Box sx={{ width: "100%" }}>
            <PrihlasenieButton text="Prihlásiť" />
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity="warning" variant="filled" sx={{ width: "100%" }}>
          Musíte súhlasiť s obchodnými podmienkami a GDPR
        </Alert>
      </Snackbar>
    </Box>
  )
}