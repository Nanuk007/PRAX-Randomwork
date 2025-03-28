"use client"
import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Odhlasenie(){
    return(
        <>
        <Typography>Naozaj sa chcete odhlasit?</Typography>
        <Button onClick={() => signOut({ callbackUrl: '/' })}>
        Odhlásiť sa
      </Button>
      </>
    )
}