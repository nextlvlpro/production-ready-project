"use client"

import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import LogoutButton from "../auth/LogoutButton"

export default function AuthActions() {
  const { user } = useAuth()


  return (
    <>
      {user ? (
        <LogoutButton />
      ) : (
        <>
          <Link
            href="/signup"
            className="rounded-md bg-gray-900 px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </>
      )}
    </>
  )
}