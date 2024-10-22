'use client'

import { useSession } from "next-auth/react"
import Button from '@mui/material/Button';
import { signOut } from "next-auth/react"

export default function AuthHomeView() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Ahoj, {session?.user?.name || 'User'}
      </h1>
      <p className="mb-4">You're signed in with Google.</p>
      <Button onClick={() => signOut({ callbackUrl: '/' })}>
        Odhlásiť sa
      </Button>
    </div>
  )
}