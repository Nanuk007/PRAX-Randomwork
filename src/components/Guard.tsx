"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface GuardProps {
  children: ReactNode
}

export function Guard({ children }: GuardProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  const loading = status === "loading"

  useEffect(() => {
    if (!loading && !isUser) {
      router.push("/auth/registracia")
    }
  }, [isUser, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isUser) {
    return null
  }

  return <>{children}</>
}

