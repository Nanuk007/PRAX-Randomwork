"use client"
import { Button } from "@mui/material"
import { signOut } from "next-auth/react"
export default function LogOut(){
    return(
        <>
        <Button onClick={() => signOut({callbackUrl: "/"})}>djfdsoijsiodgnjsd</Button>
        </>
    )
}