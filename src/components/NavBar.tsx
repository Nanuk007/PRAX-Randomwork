
"use client";

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Link from 'next/link';

export default function NavBar() {
    const [value, setValue] = React.useState('Domov');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        console.log(newValue);
    };

    return (
        <BottomNavigation
            sx={{
                width: 700,
                margin: '0 auto',
                justifyContent: 'center',
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
            <BottomNavigationAction
                label="Profily"
                value="Profily"
                icon={<PersonIcon />}
                component={Link}
                href="/profil"
            />
            <BottomNavigationAction
                label="Prispevky"
                value="Prispevky"
                icon={<PostAddIcon />}
                component={Link}
                href="/prispevky"
            />
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
        </BottomNavigation>
    );
}

