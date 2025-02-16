'use client'
import { 
  Button, 
  Typography, 
  Box, 
  Container, 
  Paper
} from '@mui/material'

import { signOut } from 'next-auth/react'

export default function SignOutPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Sign Out
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Are you sure you want to sign out?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => signOut({callbackUrl: "/"})}
            sx={{ mt: 2 }}
          >
            Odhlasit sa
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}


