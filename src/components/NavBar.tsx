"use client"; // Client-side rendering

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signOut } from 'next-auth/react'; // Import NextAuth hooks
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
    const { data: session, status } = useSession(); // Get authentication status
    const [value, setValue] = React.useState('Domov');
    const router = useRouter(); // Initialize router

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/auth/odhlasenie' }); // Redirect after logout
    };

    return (
        <BottomNavigation
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#f8f9fa',
                zIndex: 1000,
            }}
            value={value}
            onChange={handleChange}
            showLabels
        >
            <BottomNavigationAction
                label="Domov"
                value="Domov"
                icon={<HomeIcon />}
                component={Link}
                href="/"
            />

            {/* Show this only if user is authenticated */}
            {status === 'authenticated' ? (
                <>
                    <BottomNavigationAction
                        label="Profil"
                        value="Profil"
                        icon={<PersonIcon />}
                        component={Link}
                        href="/profil"
                    />
                    <BottomNavigationAction
                        label="Prispevky"
                        value="Prispevky"
                        icon={<PostAddIcon />}
                        component={Link}
                        href="/prispevok"
                    />
                    <BottomNavigationAction
                        label="Odhlasenie"
                        value="Odhlasenie"
                        icon={<LogoutIcon />}
                        onClick={handleLogout} // Handle logout
                    />
                </>
            ) : (
                <>
                    {/* Show this only if user is NOT authenticated */}
                    <BottomNavigationAction
                        label="Prihlasenie"
                        value="Prihlasenie"
                        icon={<LoginIcon />}
                        component={Link}
                        href="/auth/prihlasenie"
                    />
                    <BottomNavigationAction
                        label="Registracia"
                        value="Registracia"
                        icon={<AppRegistrationIcon />}
                        component={Link}
                        href="/auth/registracia"
                    />
                </>
            )}
        </BottomNavigation>
    );
}
