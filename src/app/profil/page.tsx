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
  return(
    <>
    <h1>
      Profil</h1></>
  );
}

