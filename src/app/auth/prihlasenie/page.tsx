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
} from "@mui/material"
import PrihlasenieButton from "@/components/prihlasenie/PrihlasenieButton"

import MuiLink from "@mui/material/Link"
import Link from "next/link"

export default function Prihlasenie() {
  const [open, setOpen] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleAlertClose = () => setShowAlert(false)

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked)
  }

  const AuthButtons = ({
    text,
    checkTerms,
    termsAccepted,
  }: {
    text: string
    checkTerms?: boolean
    termsAccepted?: boolean
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (checkTerms && !termsAccepted) {
        e.preventDefault()
        setShowAlert(true)
        return false
      }
    }

    return (
      <>
        <Box sx={{ width: "100%" }}>
          <PrihlasenieButton text={text} onClick={handleClick}/>
        </Box>
      
      </>
    )
  }

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 56px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Registrácia
          </Typography>
          <AuthButtons text="Registrovať" checkTerms={true} termsAccepted={termsAccepted} />
          <br/>
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
            sx={{ mt: 1 }}
          />
          <Box sx={{ marginTop: 4, width: "100%" }}>
            <Button
              sx={{
                width: "100%",
                textDecoration: "underline",
                backgroundColor: "none",
                "&:hover": {
                  backgroundColor: "none",
                  textDecoration: "underline",
                },
              }}
              onClick={handleOpen}
            >
              Už mám účet
            </Button>
          </Box>
        </Paper>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
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
          <AuthButtons text="meow" />
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
