"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function Home() {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()
  const redirecting = useRef(false)

  useEffect(() => {
    if (!isLoaded || redirecting.current) return
    redirecting.current = true
    router.replace(userId ? "/editor" : "/sign-in")
  }, [isLoaded, userId, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-base">
      <div className="flex flex-col items-center gap-4">
        <span className="text-xl font-bold tracking-widest text-primary">GHOST AI</span>
        <div className="size-1.5 animate-pulse rounded-full bg-accent-primary" />
      </div>
    </div>
  )
}
