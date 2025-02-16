'use client'

import { signIn } from 'next-auth/react'
import { Button, Card, CardContent, CardActions, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

export default function SignUpWithGoogle() {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: 4 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create a new account using Google
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          startIcon={<GoogleIcon />} 
          onClick={handleGoogleSignIn}
          fullWidth
        >
          Sign up with Google
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </CardContent>
    </Card>
  )
}

