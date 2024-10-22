'use client'; // We want this to be a client-side component for session management

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Zoznam profilov | ZoškaSnap',
};

export default function Profile() {
  const { data: session, status } = useSession(); // Get session status from next-auth
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/prihlasenie'); // Redirect if not logged in
    }
  }, [status, router]);

  // Show a loading spinner while checking session status
  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // If session is not available (shouldn't happen due to redirect)
  if (!session) {
    return <Typography>No session available. Please log in.</Typography>;
  }

  // Render profile page with session data
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Profil používateľa
      </Typography>
      <Typography variant="body1" gutterBottom>
        Meno: {session.user?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {session.user?.email}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => signOut({ callbackUrl: '/auth/odhlasenie' })}
        sx={{ marginTop: 2 }}
      >
        Odhlásiť sa
      </Button>
    </Box>
  );
}

