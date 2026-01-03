"use client";

import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginForm() {
  const { user, isPending: authPending, refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Redirect AFTER auth is resolved
  useEffect(() => {
    if (!authPending && user) {
      router.replace("/");
    }
  }, [authPending, user, router]);

  // 🚫 BLOCK rendering until auth status is known
  if (authPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-gray-900 rounded-full" />
      </div>
    )
  }

  // 🚫 BLOCK rendering if user is already logged in
  if (user) {
    return null;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    startTransition(async () => {
      try {
        const res = await apiClient.post("/auth/login", { email, password });
        refreshUser()
        router.replace("/");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "An unexpected error occurred"
          );
        } else {
          setError("An unexpected error occurred");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-900 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-900 text-black"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-gray-900 py-2 text-white font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
